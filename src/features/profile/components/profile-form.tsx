import type { UserProfile } from '../types/profile';

type Props = {
  profile: UserProfile;
  onChange: (field: keyof UserProfile, value: string) => void;
};

export function ProfileForm({ profile, onChange }: Props) {
  return (
    <div className="space-y-5">
      {/* Full name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>

        <input
          value={profile.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="Enter your full name"
          className="w-full rounded-xl border bg-slate-50 p-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Email (readonly) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>

        <input
          value={profile.email}
          disabled
          className="w-full rounded-xl border bg-slate-100 p-3 text-slate-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>

        <input
          value={profile.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="Enter your phone number"
          className="w-full rounded-xl border bg-slate-50 p-3 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}
