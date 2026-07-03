import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Trash2, Plus, Pencil, Save } from 'lucide-react';

import { formatLicensePlate } from '@/lib/license-plate';

import { vehiclesApi } from '../api/vehicles-api';

type Vehicle = {
  id: string;
  licensePlate: string;
  vehicleType: string;
  brand?: string;
  color?: string;
};

export default function MyVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    licensePlate: '',
    vehicleType: 'CAR',
    brand: '',
    color: '',
  });

  const loadVehicles = async () => {
    try {
      setLoading(true);

      const data = await vehiclesApi.getMyVehicles();

      setVehicles(data);
    } catch (error: unknown) {
      console.error('Fetch vehicles failed:', error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to load vehicles');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadVehicles();
    };

    fetchData();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === 'licensePlate' ? formatLicensePlate(value) : value,
    }));
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);

    setForm({
      licensePlate: formatLicensePlate(vehicle.licensePlate),
      vehicleType: vehicle.vehicleType,
      brand: vehicle.brand || '',
      color: vehicle.color || '',
    });
  };

  const resetForm = () => {
    setForm({
      licensePlate: '',
      vehicleType: 'CAR',
      brand: '',
      color: '',
    });

    setEditingId(null);
  };

  const handleSaveVehicle = async () => {
    try {
      if (editingId) {
        await vehiclesApi.updateVehicle(editingId, form);
        toast.success('Vehicle updated successfully');
      } else {
        await vehiclesApi.createVehicle(form);
        toast.success('Vehicle added successfully');
      }

      resetForm();
      await loadVehicles();
    } catch (error: unknown) {
      console.error('Save vehicle failed:', error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to save vehicle');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const handleDeleteVehicle = (id: string) => {
    toast('Delete this vehicle?', {
      description: 'This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: async () => {
          try {
            await vehiclesApi.deleteVehicle(id);

            toast.success('Vehicle deleted successfully');

            await loadVehicles();
          } catch (error: unknown) {
            console.error('Delete vehicle failed:', error);

            if (axios.isAxiosError(error)) {
              toast.error(error.response?.data?.message || 'Failed to delete vehicle');
            } else {
              toast.error('Something went wrong');
            }
          }
        },
      },
    });
  };

  if (loading) {
    return <p className="p-6">Loading vehicles...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">My Vehicles</h1>

        <p className="mt-2 text-slate-500">Manage your registered vehicles.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">
          {editingId ? 'Update Vehicle' : 'Add New Vehicle'}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.licensePlate}
            onChange={(e) => handleChange('licensePlate', e.target.value)}
            placeholder="51A-234.44"
            className="rounded-xl border p-3"
          />

          <select
            value={form.vehicleType}
            onChange={(e) => handleChange('vehicleType', e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="CAR">Car</option>
            <option value="MOTORBIKE">Motorbike</option>
            <option value="BICYCLE">Bicycle</option>
            <option value="ELECTRIC_BIKE">Electric Bike</option>
          </select>

          <input
            value={form.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="Brand"
            className="rounded-xl border p-3"
          />

          <input
            value={form.color}
            onChange={(e) => handleChange('color', e.target.value)}
            placeholder="Color"
            className="rounded-xl border p-3"
          />
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={handleSaveVehicle}
            className="flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-white transition hover:bg-blue-800"
          >
            {editingId ? <Save size={18} /> : <Plus size={18} />}
            {editingId ? 'Update Vehicle' : 'Add Vehicle'}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-xl border px-5 py-3 transition hover:bg-slate-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">Registered Vehicles</h2>

        {vehicles.length === 0 ? (
          <p className="text-slate-500">No vehicles found.</p>
        ) : (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <p className="font-semibold">{formatLicensePlate(vehicle.licensePlate)}</p>

                  <p className="text-sm text-slate-500">
                    {vehicle.vehicleType} • {vehicle.brand || 'N/A'} • {vehicle.color || 'N/A'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
