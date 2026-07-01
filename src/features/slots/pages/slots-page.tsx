import { ParkingCircle, PencilLine, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zonesApi } from '@/features/zones/api/zones-api';
import type { Zone } from '@/features/zones/types/zone';
import { confirmToast } from '@/lib/confirm-toast';

import { slotsApi } from '../api/slots-api';
import type { BackendSlot, SlotFormValues } from '../types/backend-slot.type';

const SLOT_STATUSES = ['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE', 'BLOCKED'];

const defaultForm: SlotFormValues = {
  zoneId: '',
  slotCode: '',
  status: 'AVAILABLE',
  isActive: true,
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
const isManagedZone = (zone: Zone): zone is ManagedZone =>
  typeof zone.floor === 'object' && zone.floor !== null;

export default function SlotsPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [slots, setSlots] = useState<BackendSlot[]>([]);
  const [form, setForm] = useState<SlotFormValues>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const managedZones = useMemo(() => zones.filter(isManagedZone), [zones]);
  const selectedZone = useMemo(
    () => managedZones.find((zone) => zone.id === form.zoneId) ?? null,
    [form.zoneId, managedZones]
  );

  const loadData = async () => {
    try {
      setLoading(true);
      const [zonesData, slotsData] = await Promise.all([
        zonesApi.getZones(),
        slotsApi.getAdminSlots(),
      ]);
      setZones(zonesData);
      setSlots(slotsData);
      setForm((current) => ({
        ...current,
        zoneId: current.zoneId || zonesData.filter(isManagedZone)[0]?.id || '',
      }));
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load slots'));
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
      zoneId: managedZones[0]?.id || '',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.zoneId || !form.slotCode.trim() || !form.status) {
      toast.error('Please select a zone, enter a slot code and choose a status');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        zoneId: form.zoneId,
        slotCode: form.slotCode.trim(),
        status: form.status,
        isActive: form.isActive,
      };

      if (editingId) {
        await slotsApi.updateSlot(editingId, payload);
        toast.success('Slot updated');
      } else {
        await slotsApi.createSlot(payload);
        toast.success('Slot created');
      }

      resetForm();
      await loadData();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to save slot'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (slot: BackendSlot) => {
    setEditingId(slot.id);
    setForm({
      zoneId: slot.zoneId,
      slotCode: slot.slotCode,
      status: slot.status,
      isActive: slot.isActive,
    });
  };

  const handleDelete = (slot: BackendSlot) => {
    confirmToast({
      title: `Delete slot "${slot.slotCode}"?`,
      description: 'This action cannot be undone.',
      actionLabel: 'Delete',
      onConfirm: async () => {
        try {
          await slotsApi.deleteSlot(slot.id);
          toast.success('Slot deleted');
          if (editingId === slot.id) {
            resetForm();
          }
          await loadData();
        } catch (error) {
          toast.error(getErrorMessage(error, 'Failed to delete slot'));
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
                Slot CRUD
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Manage slots</h1>
              <p className="mt-2 text-sm text-slate-500">
                Slot vehicle type follows the selected zone&apos;s floor assignment.
              </p>
            </div>
            <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
              <ParkingCircle size={24} />
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Zone</FieldLabel>
              <FieldContent>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  disabled={managedZones.length === 0}
                  value={form.zoneId}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, zoneId: event.target.value }))
                  }
                >
                  <option value="">Select zone</option>
                  {managedZones.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.floor.building.name} - {formatFloorLabel(zone.floor.floorNumber)} - {zone.name}
                    </option>
                  ))}
                </select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Slot code</FieldLabel>
              <FieldContent>
                <Input
                  value={form.slotCode}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, slotCode: event.target.value }))
                  }
                  placeholder="M-A1-001"
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
              <FieldContent>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, status: event.target.value }))
                  }
                >
                  {SLOT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll('_', ' ')}
                    </option>
                  ))}
                </select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Vehicle type</FieldLabel>
              <FieldContent>
                <Input disabled value={selectedZone ? formatVehicleType(selectedZone.floor.vehicleType) : ''} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Active</FieldLabel>
              <FieldContent>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  value={String(form.isActive)}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      isActive: event.target.value === 'true',
                    }))
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </FieldContent>
            </Field>

            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1"
                disabled={submitting || managedZones.length === 0}
                type="submit"
              >
                {editingId ? <PencilLine /> : <Plus />}
                {editingId ? 'Update slot' : 'Create slot'}
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
              <h2 className="text-xl font-semibold text-slate-900">Slot list</h2>
              <p className="mt-1 text-sm text-slate-500">
                Delete is blocked when a slot already has parking sessions or reservations.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              {slots.length} slots
            </div>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              Loading slots...
            </div>
          ) : slots.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              No slots found.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Slot</th>
                    <th className="pb-3 pr-4 font-medium">Building</th>
                    <th className="pb-3 pr-4 font-medium">Floor / Zone</th>
                    <th className="pb-3 pr-4 font-medium">Vehicle type</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Active</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slots.map((slot) => (
                    <tr key={slot.id} className="border-b border-slate-100 align-top">
                      <td className="py-4 pr-4 font-medium text-slate-900">{slot.slotCode}</td>
                      <td className="py-4 pr-4">
                        <div className="font-medium text-slate-900">
                          {slot.zone.floor.building?.name ?? '-'}
                        </div>
                        <div className="text-slate-500">{slot.zone.floor.building?.address ?? '-'}</div>
                      </td>
                      <td className="py-4 pr-4 text-slate-600">
                        {formatFloorLabel(slot.zone.floor.floorNumber)}
                        <div className="text-slate-500">{slot.zone.name}</div>
                      </td>
                      <td className="py-4 pr-4 text-slate-600">
                        {formatVehicleType(slot.vehicleType)}
                      </td>
                      <td className="py-4 pr-4 text-slate-600">{slot.status.replaceAll('_', ' ')}</td>
                      <td className="py-4 pr-4 text-slate-600">
                        {slot.isActive ? 'Active' : 'Inactive'}
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEdit(slot)}
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            <PencilLine />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(slot)}
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
