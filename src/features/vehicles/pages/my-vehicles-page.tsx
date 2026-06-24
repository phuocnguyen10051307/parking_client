import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Trash2, Plus, Pencil, Save } from 'lucide-react';

import { vehiclesApi } from '../api/vehicles-api';

type Vehicle = {
  id: string;
  licensePlate: string;
  vehicleType: string;
  brand?: string;
  color?: string;
};

export default function MyVehiclesPage() {
  // State danh sách xe
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // State loading
  const [loading, setLoading] = useState(false);

  // State edit mode
  const [editingId, setEditingId] = useState<string | null>(null);

  // State form
  const [form, setForm] = useState({
    licensePlate: '',
    vehicleType: 'CAR',
    brand: '',
    color: '',
  });

  // Load danh sách xe
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

  // Load page lần đầu
  useEffect(() => {
    const fetchData = async () => {
      await loadVehicles();
    };

    fetchData();
  }, []);

  // Update input form
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Edit vehicle → đổ dữ liệu lên form
  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);

    setForm({
      licensePlate: vehicle.licensePlate,
      vehicleType: vehicle.vehicleType,
      brand: vehicle.brand || '',
      color: vehicle.color || '',
    });
  };

  // Reset form
  const resetForm = () => {
    setForm({
      licensePlate: '',
      vehicleType: 'CAR',
      brand: '',
      color: '',
    });

    setEditingId(null);
  };

  // Create / Update vehicle
  const handleSaveVehicle = async () => {
    try {
      if (editingId) {
        // Update
        await vehiclesApi.updateVehicle(editingId, form);

        toast.success('Vehicle updated successfully');
      } else {
        // Create
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

  // Delete vehicle với confirm bằng sonner
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

  // Loading UI
  if (loading) {
    return <p className="p-6">Loading vehicles...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">My Vehicles</h1>

        <p className="mt-2 text-slate-500">Manage your registered vehicles.</p>
      </div>

      {/* Form add/update */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">
          {editingId ? 'Update Vehicle' : 'Add New Vehicle'}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {/* License plate */}
          <input
            value={form.licensePlate}
            onChange={(e) => handleChange('licensePlate', e.target.value)}
            placeholder="License Plate"
            className="rounded-xl border p-3"
          />

          {/* Vehicle type */}
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

          {/* Brand */}
          <input
            value={form.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="Brand"
            className="rounded-xl border p-3"
          />

          {/* Color */}
          <input
            value={form.color}
            onChange={(e) => handleChange('color', e.target.value)}
            placeholder="Color"
            className="rounded-xl border p-3"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          {/* Save */}
          <button
            onClick={handleSaveVehicle}
            className="flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-white transition hover:bg-blue-800"
          >
            {editingId ? <Save size={18} /> : <Plus size={18} />}
            {editingId ? 'Update Vehicle' : 'Add Vehicle'}
          </button>

          {/* Cancel edit */}
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

      {/* Danh sách xe */}
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
                {/* Info */}
                <div>
                  <p className="font-semibold">{vehicle.licensePlate}</p>

                  <p className="text-sm text-slate-500">
                    {vehicle.vehicleType} • {vehicle.brand || 'N/A'} • {vehicle.color || 'N/A'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* Edit */}
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete */}
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
