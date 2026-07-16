import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

import { ProfileAvatarUpload } from '../components/profile-avatar-upload';
import { ProfileForm } from '../components/profile-form';
import { ChangePasswordForm } from '../components/change-password-form';
import { profileApi } from '../api/profile-api';
import type { UserProfile } from '../types/profile';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();

  // State lưu profile
  const [profile, setProfile] = useState<UserProfile>({
    fullName: '',
    email: '',
    phone: '',
    avatarUrl: '',
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  // Load profile khi vào trang
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        const user = await profileApi.getProfile();

        setProfile({
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          avatarUrl: user.avatarUrl || '',
        });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'Failed to load profile');
        } else {
          toast.error('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Update field
  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save profile
  const handleSave = async () => {
    try {
      await profileApi.updateProfile({
        fullName: profile.fullName,
        phone: profile.phone,
        avatarUrl: profile.avatarUrl,
      });

      toast.success('Profile updated successfully');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to update profile');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  if (loading) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">My Profile</h1>

          <p className="mt-2 text-slate-500">Manage your account information and security.</p>
        </div>

        {/* Nút quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Card profile */}
        <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Header card */}
          <div className="mb-8 border-b pb-5">
            <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your personal details and profile photo.
            </p>
          </div>

          {/* Avatar */}
          <div className="mb-8 flex justify-center border-b pb-8">
            <ProfileAvatarUpload
              avatarUrl={profile.avatarUrl}
              onUpload={(url) => handleChange('avatarUrl', url)}
            />
          </div>

          {/* Form */}
          <ProfileForm profile={profile} onChange={handleChange} />

          {/* Button save */}
          <button
            onClick={handleSave}
            className="mt-8 w-full rounded-xl bg-blue-900 py-3 font-medium text-white"
          >
            Save Changes
          </button>
        </div>

        {/* Card đổi mật khẩu */}
        <ChangePasswordForm />
      </div>
    </div>
  );
}
