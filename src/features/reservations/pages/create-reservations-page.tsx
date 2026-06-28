import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { reservationApi } from '../api/reservation-api';
import { vehiclesApi } from '@/features/vehicles/api/vehicles-api';
import { slotsApi } from '@/features/slots/api/slots-api';

type Vehicle = {
  id: string;
  licensePlate: string;
};

type Slot = {
  id: string;
  slotCode: string;
};

export default function CreateReservationPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);

  const [vehicleId, setVehicleId] = useState('');
  const [slotId, setSlotId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Load vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehiclesApi.getMyVehicles();

        setVehicles(data);
      } catch {
        toast.error('Failed to load vehicles');
      }
    };

    fetchVehicles();
  }, []);

  // Load available slots
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const data = await slotsApi.getAvailableSlots();

        setSlots(data);
      } catch {
        toast.error('Failed to load slots');
      }
    };

    fetchSlots();
  }, []);

  // Submit reservation
  const handleSubmit = async () => {
    if (!vehicleId || !slotId || !startTime || !endTime) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await reservationApi.create({
        vehicleId,
        slotId,
        startTime,
        endTime,
      });

      toast.success('Reservation created successfully');

      // chuyển về trang my reservations
      navigate('/user/my-reservations');
    } catch {
      toast.error('Failed to create reservation');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Create Reservation</h1>
        <p className="mt-2 text-slate-500">Reserve your parking slot in advance</p>
      </div>

      {/* Form */}
      <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        {/* Vehicle */}
        <select
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="w-full rounded-xl border p-3"
        >
          <option value="">Select vehicle</option>

          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.licensePlate}
            </option>
          ))}
        </select>

        {/* Slot */}
        <select
          value={slotId}
          onChange={(e) => setSlotId(e.target.value)}
          className="w-full rounded-xl border p-3"
        >
          <option value="">Select slot</option>

          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.slotCode}
            </option>
          ))}
        </select>

        {/* Start time */}
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        {/* End time */}
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full rounded-xl border p-3"
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="rounded-xl bg-blue-900 px-5 py-3 font-medium text-white"
        >
          Create Reservation
        </button>
      </div>
    </div>
  );
}
