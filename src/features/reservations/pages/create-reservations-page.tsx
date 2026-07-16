import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { slotsApi } from '@/features/slots/api/slots-api';
import { vehiclesApi } from '@/features/vehicles/api/vehicles-api';
import { getErrorMessage } from '@/lib/error';

import { reservationApi } from '../api/reservation-api';

type Vehicle = {
  id: string;
  licensePlate: string;
};

type Slot = {
  id: string;
  slotCode: string;
};

const RESERVATION_WINDOW_DAYS = 5;
const RESERVATION_DURATION_MINUTES = 60;

const toDateTimeLocalValue = (date: Date) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
};

const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
const addMinutes = (date: Date, minutes: number) => new Date(date.getTime() + minutes * 60 * 1000);

export default function CreateReservationPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [vehicleId, setVehicleId] = useState('');
  const [slotId, setSlotId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const now = useMemo(() => new Date(), []);
  const minDateTime = useMemo(() => toDateTimeLocalValue(now), [now]);
  const maxDateTime = useMemo(() => toDateTimeLocalValue(addDays(now, RESERVATION_WINDOW_DAYS)), [now]);

  const formattedEndTime = useMemo(() => {
    if (!endTime) {
      return 'Automatically set to 1 hour after your selected arrival time.';
    }

    return new Date(endTime).toLocaleString();
  }, [endTime]);

  useEffect(() => {
    if (!startTime) {
      setEndTime('');
      return;
    }

    const parsedStart = new Date(startTime);
    if (Number.isNaN(parsedStart.getTime())) {
      setEndTime('');
      return;
    }

    setEndTime(toDateTimeLocalValue(addMinutes(parsedStart, RESERVATION_DURATION_MINUTES)));
  }, [startTime]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehiclesApi.getMyVehicles();
        setVehicles(data);
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to load vehicles'));
      }
    };

    void fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoadingSlots(true);

      try {
        const hasCompleteWindow = Boolean(startTime && endTime);
        const data = hasCompleteWindow ? await slotsApi.getAvailableSlots({ startTime, endTime }) : [];
        setSlots(data);
        setSlotId((current) => (data.some((slot: Slot) => slot.id === current) ? current : ''));
      } catch (error) {
        setSlots([]);
        setSlotId('');
        toast.error(getErrorMessage(error, 'Failed to load empty slots'));
      } finally {
        setLoadingSlots(false);
      }
    };

    void fetchSlots();
  }, [startTime, endTime]);

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
      navigate('/user/my-reservations');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to create reservation'));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Create Reservation</h1>
        <p className="mt-2 text-slate-500">Reserve an empty parking slot within the next 5 days.</p>
      </div>

      <div className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Arrival time</label>
          <input
            type="datetime-local"
            value={startTime}
            min={minDateTime}
            max={maxDateTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Reservation hold window</p>
          <p className="mt-1">Your reservation will automatically end 1 hour after the selected arrival time.</p>
          <p className="mt-1">Expected end time: {formattedEndTime}</p>
          <p className="mt-2 text-amber-800">If you arrive more than 1 hour late, your reservation may be lost.</p>
        </div>

        <select
          value={slotId}
          onChange={(e) => setSlotId(e.target.value)}
          className="w-full rounded-xl border p-3"
          disabled={loadingSlots || slots.length === 0}
        >
          <option value="">
            {loadingSlots
              ? 'Loading empty slots...'
              : !startTime || !endTime
                ? 'Select reservation time first'
                : slots.length === 0
                  ? 'No empty slots available'
                  : 'Select empty slot'}
          </option>
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.slotCode}
            </option>
          ))}
        </select>

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
