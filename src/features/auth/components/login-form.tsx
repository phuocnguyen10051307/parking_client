import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { authApi } from '@/features/auth/api/auth-api';

type FormErrors = {
  email?: string;
  password?: string;
};

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();

  // State lưu dữ liệu form
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // State lỗi từng field
  const [errors, setErrors] = useState<FormErrors>({});

  // State loading
  const [loading, setLoading] = useState(false);

  // Update input
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear lỗi khi nhập lại
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  // Validate frontend
  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Check email
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Check password
    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Nếu validate fail thì dừng
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Gọi API signin
      const res = await authApi.signin(form);

      // Lấy data từ backend
      const { accessToken, user } = res.data;

      // Lưu access token
      localStorage.setItem('accessToken', accessToken);

      // Lưu user info
      localStorage.setItem('user', JSON.stringify(user));

      // Toast thành công
      toast.success('Login successfully');

      // Điều hướng theo role
      if (user.role === 'USER') {
        navigate('/my-profile');
      } else {
        navigate('/');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        // Nếu sai credentials thì báo password
        if (message?.includes('Invalid email') || message?.includes('Invalid email or password')) {
          setErrors({
            password: 'Invalid email or password',
          });
        } else {
          toast.error(message || 'Login failed');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              {/* Header */}
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>

                <p className="text-muted-foreground">Login to your account</p>
              </div>

              {/* Email */}
              <Field>
                <FieldLabel>Email</FieldLabel>

                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />

                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel>Password</FieldLabel>

                <Input
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />

                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </Field>

              {/* Submit */}
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Field>

              {/* Link register */}
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/register">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Ảnh bên phải */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/auth-bg.png"
              alt="Login"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
