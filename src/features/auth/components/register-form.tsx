import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { cn } from '@/lib/utils';
import { authApi } from '@/features/auth/api/auth-api';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();

  // State dữ liệu form
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // State lưu lỗi từng field
  const [errors, setErrors] = useState<FormErrors>({});

  // Loading submit
  const [loading, setLoading] = useState(false);

  // Update input
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear lỗi khi user nhập lại
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  // Validate frontend
  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Full name
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    // Password
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(form.password)) {
      newErrors.password = 'Password must include at least 1 letter, 1 number and 8 characters';
    }

    // Confirm password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Nếu validate fail thì dừng
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Gọi API signup
      await authApi.signup({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      toast.success('Register successfully');

      // Redirect login
      navigate('/login');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        // Nếu lỗi password thì gắn vào field
        if (message?.includes('Password')) {
          setErrors((prev) => ({
            ...prev,
            password: message,
          }));
        } else {
          // Hiện toast lỗi chung
          toast.error(message || 'Register failed');
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
                <h1 className="text-2xl font-bold">Create your account</h1>

                <p className="text-sm text-muted-foreground">Enter your information below</p>
              </div>

              {/* Full name */}
              <Field>
                <FieldLabel>Full Name</FieldLabel>

                <Input
                  value={form.fullName}
                  placeholder="Enter full name"
                  onChange={(e) => handleChange('fullName', e.target.value)}
                />

                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
              </Field>

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

              {/* Phone */}
              <Field>
                <FieldLabel>Phone</FieldLabel>

                <Input
                  value={form.phone}
                  placeholder="Enter phone"
                  onChange={(e) => handleChange('phone', e.target.value)}
                />

                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
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

              {/* Confirm password */}
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>

                <Input
                  type="password"
                  placeholder="Enter confirm password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />

                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </Field>

              {/* Submit */}
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account'}
                </Button>
              </Field>

              {/* Link login */}
              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Ảnh bên phải */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/auth-bg.png"
              alt="Signup"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
