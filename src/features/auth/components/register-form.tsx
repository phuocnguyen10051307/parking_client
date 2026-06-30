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

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallback;
  }

  return fallback;
};

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  otpCode?: string;
};

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otpCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

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

  const validateAccountForm = () => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(form.password)) {
      newErrors.password = 'Password must include at least 1 letter, 1 number and 8 characters';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateOtpForm = () => {
    if (!/^\d{6}$/.test(form.otpCode.trim())) {
      setErrors((prev) => ({
        ...prev,
        otpCode: 'OTP code must be 6 digits',
      }));
      return false;
    }

    return true;
  };

  const requestOtp = async () => {
    await authApi.requestSignupOtp({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    });
  };

  const handleRequestOtp = async () => {
    if (!validateAccountForm()) return;

    try {
      setLoading(true);
      await requestOtp();
      setOtpSent(true);
      toast.success('OTP has been sent to your email');
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed to send OTP'));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!validateAccountForm()) return;

    try {
      setResending(true);
      await requestOtp();
      setForm((prev) => ({ ...prev, otpCode: '' }));
      toast.success('A new OTP has been sent');
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed to resend OTP'));
    } finally {
      setResending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!validateOtpForm()) return;

    try {
      setLoading(true);
      await authApi.signup({
        email: form.email.trim(),
        otpCode: form.otpCode.trim(),
      });

      toast.success('Register successfully');
      navigate('/login');
    } catch (error: unknown) {
      const message = getApiErrorMessage(error, 'Register failed');

      if (message.toLowerCase().includes('otp')) {
        setErrors((prev) => ({
          ...prev,
          otpCode: message,
        }));
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otpSent) {
      await handleVerifyOtp();
      return;
    }

    await handleRequestOtp();
  };

  const handleEditInfo = () => {
    setOtpSent(false);
    setForm((prev) => ({ ...prev, otpCode: '' }));
    setErrors({});
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-muted-foreground">
                  {otpSent ? `Enter the OTP sent to ${form.email}` : 'Enter your information below'}
                </p>
              </div>

              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input
                  value={form.fullName}
                  placeholder="Enter full name"
                  disabled={otpSent}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  disabled={otpSent}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </Field>

              <Field>
                <FieldLabel>Phone</FieldLabel>
                <Input
                  value={form.phone}
                  placeholder="Enter phone"
                  disabled={otpSent}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  disabled={otpSent}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </Field>

              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Enter confirm password"
                  value={form.confirmPassword}
                  disabled={otpSent}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </Field>

              {otpSent && (
                <Field>
                  <FieldLabel>OTP Code</FieldLabel>
                  <Input
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={form.otpCode}
                    onChange={(e) => handleChange('otpCode', e.target.value.replace(/\D/g, ''))}
                  />
                  {errors.otpCode && <p className="text-sm text-red-500">{errors.otpCode}</p>}
                </Field>
              )}

              <Field>
                <Button type="submit" disabled={loading || resending}>
                  {loading ? (otpSent ? 'Verifying...' : 'Sending...') : otpSent ? 'Verify OTP' : 'Send OTP'}
                </Button>
              </Field>

              {otpSent && (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Button type="button" variant="link" disabled={loading || resending} onClick={handleResendOtp}>
                    {resending ? 'Sending...' : 'Resend OTP'}
                  </Button>
                  <Button type="button" variant="link" disabled={loading || resending} onClick={handleEditInfo}>
                    Edit information
                  </Button>
                </div>
              )}

              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>

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