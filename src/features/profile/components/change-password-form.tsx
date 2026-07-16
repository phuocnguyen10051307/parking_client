import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

import { profileApi } from '../api/profile-api';

export function ChangePasswordForm() {
  // State dữ liệu form
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State loading
  const [loading, setLoading] = useState(false);

  // State lỗi
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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

  // Validate form
  const validateForm = () => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    // Check current password
    if (!form.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    // Check new password
    if (!form.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(form.newPassword)) {
      newErrors.newPassword = 'Password must include at least 1 letter, 1 number and 8 characters';
    }

    // Check confirm password
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  // Submit đổi mật khẩu
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Gọi API đổi mật khẩu
      await profileApi.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success('Password changed successfully');

      // Reset form
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to change password');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-6 border-b pb-5">
        <h3 className="text-xl font-semibold text-slate-900">Change Password</h3>
      </div>

      <div className="space-y-5">
        {/* Current password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Current Password</label>

          <input
            type="password"
            placeholder="Enter current password"
            value={form.currentPassword}
            onChange={(e) => handleChange('currentPassword', e.target.value)}
            className="w-full rounded-xl border bg-slate-50 p-3"
          />

          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>
          )}
        </div>

        {/* New password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={form.newPassword}
            onChange={(e) => handleChange('newPassword', e.target.value)}
            className="w-full rounded-xl border bg-slate-50 p-3"
          />

          {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
        </div>

        {/* Confirm password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Confirm New Password
          </label>

          <input
            type="password"
            placeholder="Re-enter new password"
            value={form.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            className="w-full rounded-xl border bg-slate-50 p-3"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-xl bg-blue-900 py-3 font-medium text-white transition hover:bg-blue-800"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );
}
