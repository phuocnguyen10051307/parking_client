import { Building2, PencilLine, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { buildingsApi } from '@/features/buildings/api/buildings-api';
import type { Building } from '@/features/buildings/types/building';
import { confirmToast } from '@/lib/confirm-toast';

import { floorsApi } from '../api/floors-api';
import type { Floor, FloorFormValues } from '../types/floor';

const VEHICLE_TYPES = ['MOTORBIKE', 'CAR', 'BICYCLE', 'ELECTRIC_BIKE'];

type ManagedFloor = Floor & {
  building: NonNullable<Floor['building']>;
  buildingId: string;
  floorNumber: number;
  vehicleType: string;
};

const defaultForm: FloorFormValues = {
  buildingId: '',
  floorNumber: '',
  vehicleType: 'CAR',
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response &&
    typeof error.response.data === 'object' &&
    error.response.data !== null &&
    'message' in error.response.data &&
    typeof error.response.data.message === 'string'
  ) {
    return error.response.data.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const formatVehicleType = (vehicleType: string) => vehicleType.replaceAll('_', ' ');
const formatFloorLabel = (floorNumber: number) =>
  floorNumber < 0 ? `Basement ${Math.abs(floorNumber)}` : `Level ${floorNumber}`;
const isManagedFloor = (floor: Floor): floor is ManagedFloor =>
  typeof floor.buildingId === 'string' &&
  typeof floor.floorNumber === 'number' &&
  typeof floor.vehicleType === 'string' &&
  typeof floor.building === 'object' &&
  floor.building !== null;

export default function FloorsPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [form, setForm] = useState<FloorFormValues>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const managedFloors = useMemo(() => floors.filter(isManagedFloor), [floors]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [buildingsData, floorsData] = await Promise.all([
        buildingsApi.getBuildings(),
        floorsApi.getFloors(),
      ]);
      setBuildings(buildingsData);
      setFloors(floorsData);
      setForm((current) => ({
        ...current,
        buildingId: current.buildingId || buildingsData[0]?.id || '',
      }));
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load floors'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      ...defaultForm,
      buildingId: buildings[0]?.id || '',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const floorNumber = Number(form.floorNumber);

    if (!form.buildingId || !Number.isInteger(floorNumber) || !form.vehicleType) {
      toast.error('Please select a building and enter a valid floor number');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        buildingId: form.buildingId,
        floorNumber,
        vehicleType: form.vehicleType,
      };

      if (editingId) {
        await floorsApi.updateFloor(editingId, payload);
        toast.success('Floor updated');
      } else {
        await floorsApi.createFloor(payload);
        toast.success('Floor created');
      }

      resetForm();
      await loadData();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to save floor'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (floor: ManagedFloor) => {
    setEditingId(floor.id);
    setForm({
      buildingId: floor.buildingId,
      floorNumber: String(floor.floorNumber),
      vehicleType: floor.vehicleType,
    });
  };

  const handleDelete = (floor: ManagedFloor) => {
    confirmToast({
      title: `Delete ${formatFloorLabel(floor.floorNumber)} from ${floor.building.name}?`,
      description: 'This action cannot be undone.',
      actionLabel: 'Delete',
      onConfirm: async () => {
        try {
          await floorsApi.deleteFloor(floor.id);
          toast.success('Floor deleted');
          if (editingId === floor.id) {
            resetForm();
          }
          await loadData();
        } catch (error) {
          toast.error(getErrorMessage(error, 'Failed to delete floor'));
        }
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Floor CRUD
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Manage floors</h1>
              <p className="mt-2 text-sm text-slate-500">
                Each floor belongs to one building and one vehicle type assignment.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
              <Building2 size={24} />
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Building</FieldLabel>
              <FieldContent>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  disabled={buildings.length === 0}
                  value={form.buildingId}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, buildingId: event.target.value }))
                  }
                >
                  <option value="">Select building</option>
                  {buildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Floor number</FieldLabel>
              <FieldContent>
                <Input
                  type="number"
                  value={form.floorNumber}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, floorNumber: event.target.value }))
                  }
                  placeholder="1 or -1"
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Vehicle type</FieldLabel>
              <FieldContent>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  value={form.vehicleType}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, vehicleType: event.target.value }))
                  }
                >
                  {VEHICLE_TYPES.map((vehicleType) => (
                    <option key={vehicleType} value={vehicleType}>
                      {formatVehicleType(vehicleType)}
                    </option>
                  ))}
                </select>
              </FieldContent>
            </Field>

            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1"
                disabled={submitting || buildings.length === 0}
                type="submit"
              >
                {editingId ? <PencilLine /> : <Plus />}
                {editingId ? 'Update floor' : 'Create floor'}
              </Button>
              {editingId ? (
                <Button onClick={resetForm} type="button" variant="outline">
                  <X />
                  Cancel
                </Button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Floor list</h2>
              <p className="mt-1 text-sm text-slate-500">
                Delete is blocked when a floor still has zones.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              {managedFloors.length} floors
            </div>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              Loading floors...
            </div>
          ) : managedFloors.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              No floors found.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Building</th>
                    <th className="pb-3 pr-4 font-medium">Floor</th>
                    <th className="pb-3 pr-4 font-medium">Vehicle type</th>
                    <th className="pb-3 pr-4 font-medium">Zones</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {managedFloors.map((floor) => (
                    <tr key={floor.id} className="border-b border-slate-100 align-top">
                      <td className="py-4 pr-4">
                        <div className="font-medium text-slate-900">{floor.building.name}</div>
                        <div className="text-slate-500">{floor.building.address}</div>
                      </td>
                      <td className="py-4 pr-4 text-slate-600">
                        {formatFloorLabel(floor.floorNumber)}
                      </td>
                      <td className="py-4 pr-4 text-slate-600">
                        {formatVehicleType(floor.vehicleType)}
                      </td>
                      <td className="py-4 pr-4 text-slate-600">{floor._count?.zones ?? 0}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEdit(floor)}
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            <PencilLine />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(floor)}
                            size="sm"
                            type="button"
                            variant="destructive"
                          >
                            <Trash2 />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
