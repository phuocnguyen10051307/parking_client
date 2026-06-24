import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { authApi } from '@/features/auth/api/auth-api';
import { persistAuthSession } from '@/features/auth/utils/auth-session';

import { getDefaultRouteByRole } from '@/app/router/rbac-config';

type FormErrors = {
  email?: string;
  password?: string;
};

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await authApi.signin(form);
      const { accessToken, user } = res.data;

      console.log('[LoginForm] Signin success', { role: user.role, email: user.email });
      persistAuthSession(accessToken, user);
      toast.success('Login successfully');
      const targetRoute = getDefaultRouteByRole(user.role);
      console.log('[LoginForm] Navigating to', { targetRoute });
      navigate(targetRoute);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

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
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Login to your account</p>
              </div>

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

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/register">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>

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
