import type { Slot } from '../types/slot.type';

type Props = {
  slot: Slot | null;
};

export function SlotDetailPanel({ slot }: Props) {
  if (!slot) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-\[380px\] border-l bg-white p-8 shadow-xl">
      {/* Header */}
      <h2 className="mb-6 text-2xl font-bold text-blue-900">Slot Details</h2>

      {/* Thông tin slot */}
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">Slot ID</p>

          <p className="font-bold">{slot.id}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Status</p>

          <p className="font-bold capitalize">{slot.status}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Plate</p>

          <p>{slot.plate ?? '-'}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Duration</p>

          <p>{slot.duration ?? '-'}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 grid gap-3">
        <button className="rounded-xl border py-3 font-medium">Edit Info</button>

        <button className="rounded-xl bg-blue-900 py-3 font-medium text-white">End Session</button>

        <button className="rounded-xl bg-red-100 py-3 font-medium text-red-600">
          Emergency Lock
        </button>
      </div>
    </div>
  );
}
