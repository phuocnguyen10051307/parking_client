import { useEffect, useState } from 'react';
import { CarFront, CalendarCheck, Clock3, ParkingCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { vehiclesApi } from '@/features/vehicles/api/vehicles-api';
import { slotsApi } from '@/features/slots/api/slots-api';

export default function UserDashboardPage() {
  const navigate = useNavigate();

  // State lưu số liệu dashboard
  const [vehiclesCount, setVehiclesCount] = useState(0);
  const [availableSlotsCount, setAvailableSlotsCount] = useState(0);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Fetch dashboard data khi vào trang
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        // Fetch song song để tối ưu tốc độ
        const [vehicles, slots] = await Promise.all([
          vehiclesApi.getMyVehicles(),
          slotsApi.getAvailableSlots(),
        ]);

        // Set dữ liệu thống kê
        setVehiclesCount(vehicles.length);
        setAvailableSlotsCount(slots.length);
      } catch (error) {
        console.error('Load dashboard failed:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // UI loading
  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Welcome back 👋</h1>

        <p className="mt-2 text-slate-500">
          Manage your vehicles, reservations and parking activities.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Vehicles */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <CarFront className="text-blue-900" />

            <p className="text-sm text-slate-500">My Vehicles</p>
          </div>

          <h3 className="mt-4 text-3xl font-bold">{vehiclesCount}</h3>
        </div>

        {/* Reservations (chưa có API) */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <CalendarCheck className="text-blue-900" />

            <p className="text-sm text-slate-500">Reservations</p>
          </div>

          <h3 className="mt-4 text-3xl font-bold">0</h3>
        </div>

        {/* Sessions (chưa có API) */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Clock3 className="text-blue-900" />

            <p className="text-sm text-slate-500">Parking Sessions</p>
          </div>

          <h3 className="mt-4 text-3xl font-bold">0</h3>
        </div>

        {/* Available slots */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ParkingCircle className="text-blue-900" />

            <p className="text-sm text-slate-500">Available Slots</p>
          </div>

          <h3 className="mt-4 text-3xl font-bold">{availableSlotsCount}</h3>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          {/* Đi tới trang vehicles */}
          <button
            onClick={() => navigate('/my-vehicles')}
            className="rounded-xl bg-blue-900 px-5 py-3 text-white transition hover:bg-blue-800"
          >
            Add Vehicle
          </button>

          {/* Đi tới trang reservations */}
          <button
            onClick={() => navigate('/my-reservations')}
            className="rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800"
          >
            Reserve Slot
          </button>

          {/* Đi tới history */}
          <button
            onClick={() => navigate('/my-history')}
            className="rounded-xl border border-slate-300 px-5 py-3 transition hover:bg-slate-100"
          >
            View History
          </button>
        </div>
      </div>

      {/* Upcoming reservation */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Upcoming Reservation</h2>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="font-medium">No active reservation yet.</p>

          <p className="mt-1 text-sm text-slate-500">
            Your upcoming parking reservations will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
