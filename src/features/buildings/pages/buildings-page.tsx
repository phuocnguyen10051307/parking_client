import { Building2, PencilLine, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { buildingsApi } from '@/features/buildings/api/buildings-api';
import { confirmToast } from '@/lib/confirm-toast';

import type { Building, BuildingFormValues } from '../types/building';

const defaultForm: BuildingFormValues = {
  name: '',
  address: '',
  totalFloors: '',
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

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [form, setForm] = useState<BuildingFormValues>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadBuildings = async () => {
    try {
      setLoading(true);
      const data = await buildingsApi.getBuildings();
      setBuildings(data);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load buildings'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadBuildings();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const totalFloors = Number(form.totalFloors);

    if (
      !form.name.trim() ||
      !form.address.trim() ||
      !Number.isInteger(totalFloors) ||
      totalFloors <= 0
    ) {
      toast.error('Please enter a valid name, address and total floors');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        name: form.name.trim(),
        address: form.address.trim(),
        totalFloors,
      };

      if (editingId) {
        await buildingsApi.updateBuilding(editingId, payload);
        toast.success('Building updated');
      } else {
        await buildingsApi.createBuilding(payload);
        toast.success('Building created');
      }

      resetForm();
      await loadBuildings();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to save building'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (building: Building) => {
    setEditingId(building.id);
    setForm({
      name: building.name,
      address: building.address,
      totalFloors: String(building.totalFloors),
    });
  };

  const handleDelete = (building: Building) => {
    confirmToast({
      title: `Delete building "${building.name}"?`,
      description: 'This action cannot be undone.',
      actionLabel: 'Delete',
      onConfirm: async () => {
        try {
          await buildingsApi.deleteBuilding(building.id);
          toast.success('Building deleted');
          if (editingId === building.id) {
            resetForm();
          }
          await loadBuildings();
        } catch (error) {
          toast.error(getErrorMessage(error, 'Failed to delete building'));
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
                Building CRUD
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Manage buildings</h1>
              <p className="mt-2 text-sm text-slate-500">
                Create, update and delete parking buildings before assigning floors and zones.
              </p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
              <Building2 size={24} />
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Building name</FieldLabel>
              <FieldContent>
                <Input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Main parking building"
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Address</FieldLabel>
              <FieldContent>
                <Input
                  value={form.address}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, address: event.target.value }))
                  }
                  placeholder="123 Nguyen Hue, District 1"
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Total floors</FieldLabel>
              <FieldContent>
                <Input
                  type="number"
                  min="1"
                  value={form.totalFloors}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, totalFloors: event.target.value }))
                  }
                  placeholder="5"
                />
              </FieldContent>
            </Field>

            <div className="flex gap-3 pt-2">
              <Button className="flex-1" disabled={submitting} type="submit">
                {editingId ? <PencilLine /> : <Plus />}
                {editingId ? 'Update building' : 'Create building'}
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
              <h2 className="text-xl font-semibold text-slate-900">Building list</h2>
              <p className="mt-1 text-sm text-slate-500">
                Delete is blocked when a building still has floors.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              {buildings.length} buildings
            </div>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              Loading buildings...
            </div>
          ) : buildings.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              No buildings found.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Name</th>
                    <th className="pb-3 pr-4 font-medium">Address</th>
                    <th className="pb-3 pr-4 font-medium">Total floors</th>
                    <th className="pb-3 pr-4 font-medium">Created floors</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buildings.map((building) => (
                    <tr key={building.id} className="border-b border-slate-100 align-top">
                      <td className="py-4 pr-4 font-medium text-slate-900">{building.name}</td>
                      <td className="py-4 pr-4 text-slate-600">{building.address}</td>
                      <td className="py-4 pr-4 text-slate-600">{building.totalFloors}</td>
                      <td className="py-4 pr-4 text-slate-600">{building._count?.floors ?? 0}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEdit(building)}
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            <PencilLine />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(building)}
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
