import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { pricingApi } from '@/features/pricing/api/pricing-api';
import { vehiclesApi } from '@/features/vehicles/api/vehicles-api';
import { getErrorMessage } from '@/lib/error';
import { formatVnd } from '@/lib/pricing';

import { monthlySubscriptionApi } from '../api/monthly-subscription-api';

type Vehicle = {
  id: string;
  licensePlate: string;
  vehicleType: string;
  brand?: string;
  color?: string;
};

const toDateInputValue = (date: Date) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const addOneMonth = (value: string) => {
  const date = new Date(value);
  date.setMonth(date.getMonth() + 1);
  return date;
};

export default function CreateMonthlySubscriptionPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleId, setVehicleId] = useState('');
  const [startDate, setStartDate] = useState(toDateInputValue(new Date()));
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(false);

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === vehicleId) ?? null,
    [vehicleId, vehicles]
  );

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await vehiclesApi.getMyVehicles();
        setVehicles(data);
        setVehicleId(data[0]?.id ?? '');
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to load vehicles'));
      } finally {
        setLoading(false);
      }
    };

    void loadVehicles();
  }, []);

  useEffect(() => {
    const loadPrice = async () => {
      if (!selectedVehicle?.vehicleType) {
        setPrice(null);
        return;
      }

      setLoadingPrice(true);

      try {
        const policy = await pricingApi.getActivePolicy(selectedVehicle.vehicleType);
        setPrice(Number(policy.monthlyFee));
      } catch {
        setPrice(null);
      } finally {
        setLoadingPrice(false);
      }
    };

    void loadPrice();
  }, [selectedVehicle?.vehicleType]);

  const handleSubmit = async () => {
    if (!vehicleId || !startDate) {
      toast.error('Please select a vehicle and start date');
      return;
    }

    setSubmitting(true);

    try {
      await monthlySubscriptionApi.create({
        vehicleId,
        startDate: new Date(startDate).toISOString(),
        durationMonths: 1,
      });

      toast.success('Monthly subscription created successfully');
      navigate('/user/my-monthly-subscriptions');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to create monthly subscription'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading vehicles...</p>;
  }

  if (vehicles.length === 0) {
    return (
      <div className="space-y-6 py-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Create Monthly Subscription</h1>
          <p className="mt-2 text-slate-500">Choose one of your registered vehicles to buy a 1-month pass.</p>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">No vehicles found</h2>
          <p className="mt-2 text-slate-500">Add a vehicle first before creating a monthly subscription.</p>
          <Link
            to="/user/my-vehicles"
            className="mt-5 inline-flex rounded-xl bg-blue-900 px-5 py-3 font-medium text-white"
          >
            Go to My Vehicles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Create Monthly Subscription</h1>
        <p className="mt-2 text-slate-500">Simple demo flow for a single 1-month parking plan.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,0.9fr]">
        <div className="space-y-5 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Vehicle</label>
            <select
              value={vehicleId}
              onChange={(event) => setVehicleId(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            >
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.licensePlate} - {vehicle.vehicleType}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Start date</label>
            <input
              type="date"
              value={startDate}
              min={toDateInputValue(new Date())}
              onChange={(event) => setStartDate(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Plan summary</p>
            <p className="mt-2">Plan: 1 month</p>
            <p className="mt-1">Duration: 1 month</p>
            <p className="mt-1">End date: {addOneMonth(startDate).toLocaleDateString()}</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-xl bg-blue-900 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Creating...' : 'Create Monthly Subscription'}
          </button>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Demo package</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">1-month vehicle pass</h2>
          <p className="mt-2 text-slate-500">One default package only, no payment integration, no auto-renew.</p>

          <div className="mt-6 rounded-2xl bg-blue-950 p-5 text-white">
            <p className="text-sm text-blue-100">Price</p>
            <p className="mt-2 text-3xl font-bold">
              {loadingPrice ? 'Loading...' : price !== null ? formatVnd(price) : 'Unavailable'}
            </p>
            <p className="mt-2 text-sm text-blue-100">
              Vehicle: {selectedVehicle?.licensePlate ?? '--'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
