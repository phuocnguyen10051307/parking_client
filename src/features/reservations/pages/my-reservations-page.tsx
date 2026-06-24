import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

import { slotsApi } from '@/features/slots/api/slots-api';

type Slot = {
  id: string;
  slotCode: string;
  vehicleType: string;
  status: string;
};

export default function MyReservationsPage() {
  // State lưu slot available
  const [slots, setSlots] = useState<Slot[]>([]);

  // Fetch slot available
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const data = await slotsApi.getAvailableSlots();

        setSlots(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'Failed to fetch slots');
        }
      }
    };

    fetchSlots();
  }, []);

  // Fake reserve tạm thời
  const handleReserve = (slotCode: string) => {
    toast.success(`Slot ${slotCode} selected. Reservation API coming soon.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Reserve Parking Slot</h1>

        <p className="mt-2 text-slate-500">Choose an available parking slot.</p>
      </div>

      {/* Slot list */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {slots.map((slot) => (
          <div key={slot.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-lg font-semibold">{slot.slotCode}</p>

            <p className="mt-2 text-sm text-slate-500">Vehicle Type: {slot.vehicleType}</p>

            <p className="mt-1 text-sm text-green-600">Status: {slot.status}</p>

            <button
              onClick={() => handleReserve(slot.slotCode)}
              className="mt-4 rounded-xl bg-blue-900 px-4 py-2 text-white transition hover:bg-blue-800"
            >
              Reserve
            </button>
          </div>
        ))}
      </div>

      {/* Empty */}
      {slots.length === 0 && (
        <div className="rounded-2xl border bg-white p-6 text-center text-slate-500">
          No available slots at the moment.
        </div>
      )}
    </div>
  );
}
