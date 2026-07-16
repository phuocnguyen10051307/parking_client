import { Map, PencilLine, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { floorsApi } from '@/features/floors/api/floors-api';
import type { Floor } from '@/features/floors/types/floor';
import { confirmToast } from '@/lib/confirm-toast';

import { zonesApi } from '../api/zones-api';
import type { Zone, ZoneFormValues } from '../types/zone';

const defaultForm: ZoneFormValues = {
  floorId: '',
  name: '',
};

type ManagedFloor = Floor & {
  building: NonNullable<Floor['building']>;
  floorNumber: number;
  vehicleType: string;
};

type ManagedZone = Zone & {
  floor: Exclude<Zone['floor'], string>;
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
  typeof floor.floorNumber === 'number' &&
  typeof floor.vehicleType === 'string' &&
  typeof floor.building === 'object' &&
  floor.building !== null;
const isManagedZone = (zone: Zone): zone is ManagedZone =>
  typeof zone.floor === 'object' && zone.floor !== null;

export default function ZonesPage() {
  const [floors, setFloors] = useState<Floor[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [form, setForm] = useState<ZoneFormValues>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const managedFloors = useMemo(() => floors.filter(isManagedFloor), [floors]);
  const managedZones = useMemo(() => zones.filter(isManagedZone), [zones]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [floorsData, zonesData] = await Promise.all([
        floorsApi.getFloors(),
        zonesApi.getZones(),
      ]);
      setFloors(floorsData);
      setZones(zonesData);
      setForm((current) => ({
        ...current,
        floorId: current.floorId || floorsData.find(isManagedFloor)?.id || '',
      }));
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load zones'));
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
      floorId: managedFloors[0]?.id || '',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.floorId || !form.name.trim()) {
      toast.error('Please select a floor and enter a zone name');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        floorId: form.floorId,
        name: form.name.trim(),
      };

      if (editingId) {
        await zonesApi.updateZone(editingId, payload);
        toast.success('Zone updated');
      } else {
        await zonesApi.createZone(payload);
        toast.success('Zone created');
      }

      resetForm();
      await loadData();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to save zone'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (zone: ManagedZone) => {
    setEditingId(zone.id);
    setForm({
      floorId: zone.floorId,
      name: zone.name,
    });
  };

  const handleDelete = (zone: ManagedZone) => {
    confirmToast({
      title: `Delete zone "${zone.name}"?`,
      description: 'This action cannot be undone.',
      actionLabel: 'Delete',
      onConfirm: async () => {
        try {
          await zonesApi.deleteZone(zone.id);
          toast.success('Zone deleted');
          if (editingId === zone.id) {
            resetForm();
          }
          await loadData();
        } catch (error) {
          toast.error(getErrorMessage(error, 'Failed to delete zone'));
        } finally {
          setSubmitting(false);
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
                Zone CRUD
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Manage zones</h1>
              <p className="mt-2 text-sm text-slate-500">
                Each zone belongs to a floor. Delete is blocked when parking slots already exist.
              </p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
              <Map size={24} />
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Floor</FieldLabel>
              <FieldContent>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  disabled={managedFloors.length === 0}
                  value={form.floorId}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, floorId: event.target.value }))
                  }
                >
                  <option value="">Select floor</option>
                  {managedFloors.map((floor) => (
                    <option key={floor.id} value={floor.id}>
                      {floor.building.name} - {formatFloorLabel(floor.floorNumber)} -{' '}
                      {formatVehicleType(floor.vehicleType)}
                    </option>
                  ))}
                </select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Zone name</FieldLabel>
              <FieldContent>
                <Input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Zone A"
                />
              </FieldContent>
            </Field>

            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1"
                disabled={submitting || managedFloors.length === 0}
                type="submit"
              >
                {editingId ? <PencilLine /> : <Plus />}
                {editingId ? 'Update zone' : 'Create zone'}
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
              <h2 className="text-xl font-semibold text-slate-900">Zone list</h2>
              <p className="mt-1 text-sm text-slate-500">
                A zone name must be unique inside its floor.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              {managedZones.length} zones
            </div>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              Loading zones...
            </div>
          ) : managedZones.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              No zones found.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Zone</th>
                    <th className="pb-3 pr-4 font-medium">Building</th>
                    <th className="pb-3 pr-4 font-medium">Floor</th>
                    <th className="pb-3 pr-4 font-medium">Slots</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {managedZones.map((zone) => (
                    <tr key={zone.id} className="border-b border-slate-100 align-top">
                      <td className="py-4 pr-4 font-medium text-slate-900">{zone.name}</td>
                      <td className="py-4 pr-4">
                        <div className="font-medium text-slate-900">{zone.floor.building.name}</div>
                        <div className="text-slate-500">{zone.floor.building.address}</div>
                      </td>
                      <td className="py-4 pr-4 text-slate-600">
                        {formatFloorLabel(zone.floor.floorNumber)}
                        <div className="text-slate-500">
                          {formatVehicleType(zone.floor.vehicleType)}
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-slate-600">{zone._count?.slots ?? 0}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEdit(zone)}
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            <PencilLine />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(zone)}
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
