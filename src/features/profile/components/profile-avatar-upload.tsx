import { Camera } from 'lucide-react';

type Props = {
  avatarUrl?: string;
  onUpload: (url: string) => void;
};

export function ProfileAvatarUpload({ avatarUrl, onUpload }: Props) {
  // Upload ảnh lên Cloudinary
  const handleUpload = async (file: File) => {
    const formData = new FormData();

    // File ảnh user chọn
    formData.append('file', file);

    // Upload preset từ Cloudinary
    formData.append('upload_preset', 'parking_profile');

    // Gọi API upload Cloudinary
    const res = await fetch('https://api.cloudinary.com/v1_1/dws4ev3w4/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    // Trả về URL ảnh sau upload
    onUpload(data.secure_url);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Khung avatar */}
      <div className="relative h-32 w-32">
        {/* Nếu có avatar thì hiện ảnh */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="h-full w-full rounded-full object-cover border"
          />
        ) : (
          // Avatar mặc định
          <div className="flex h-full w-full items-center justify-center rounded-full border bg-slate-200 text-4xl font-bold text-slate-500">
            U
          </div>
        )}

        {/* Nút upload */}
        <label className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-blue-900 p-2 text-white shadow-md">
          <Camera size={16} />

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleUpload(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}
