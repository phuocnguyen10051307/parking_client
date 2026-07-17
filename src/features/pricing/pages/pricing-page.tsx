import axios from 'axios';
import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { pricingApi } from '../api/pricing-api';
import { PricingCard } from '../components/pricing-card';
import { PricingTable } from '../components/pricing-table';
import { FeeCalculator } from '../components/fee-calculator';
import type { PricingPolicy, PricingPolicyPayload } from '../types/pricing';

const DEFAULT_FORM: PricingPolicyPayload = {
  name: 'Apartment Car Pricing',
  vehicleType: 'CAR',
  monthlyFee: 1250000,
  daytimeBlockFee: 15000,
  eveningBlockFee: 20000,
  overnightFlatFee: 100000,
  blockDurationMinutes: 120,
  gracePeriodMinutes: 15,
  daytimeStartMinutes: 360,
  daytimeEndMinutes: 1049,
  eveningStartMinutes: 1080,
  eveningEndMinutes: 1439,
  isActive: true,
};

const getErrorMessage = (error: unknown, fallback: string) =>
  axios.isAxiosError(error) ? error.response?.data?.message || fallback : fallback;

const toFormPayload = (policy: PricingPolicy): PricingPolicyPayload => ({
  name: policy.name,
  vehicleType: policy.vehicleType,
  monthlyFee: policy.monthlyFee,
  daytimeBlockFee: policy.daytimeBlockFee,
  eveningBlockFee: policy.eveningBlockFee,
  overnightFlatFee: policy.overnightFlatFee,
  blockDurationMinutes: policy.blockDurationMinutes,
  gracePeriodMinutes: policy.gracePeriodMinutes,
  daytimeStartMinutes: policy.daytimeStartMinutes,
  daytimeEndMinutes: policy.daytimeEndMinutes,
  eveningStartMinutes: policy.eveningStartMinutes,
  eveningEndMinutes: policy.eveningEndMinutes,
  isActive: policy.isActive,
});

export default function PricingPage() {
  const [policies, setPolicies] = useState<PricingPolicy[]>([]);
  const [form, setForm] = useState<PricingPolicyPayload>(DEFAULT_FORM);
  const [editingPolicyId, setEditingPolicyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadPolicies = async () => {
    try {
      setIsLoading(true);
      const data = await pricingApi.getPolicies();
      setPolicies(data);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load pricing policies'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  const activeCarPolicy = policies.find((policy) => policy.vehicleType === 'CAR' && policy.isActive) ?? policies[0] ?? null;

  const setNumberField = (field: keyof PricingPolicyPayload, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: Number(value),
    }));
  };

  const handleEdit = (policy: PricingPolicy) => {
    setEditingPolicyId(policy.id);
    setForm(toFormPayload(policy));
  };

  const resetForm = () => {
    setEditingPolicyId(null);
    setForm(DEFAULT_FORM);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSaving(true);

      if (editingPolicyId) {
        await pricingApi.updatePolicy(editingPolicyId, form);
        toast.success('Pricing policy updated');
      } else {
        await pricingApi.createPolicy(form);
        toast.success('Pricing policy created');
      }

      await loadPolicies();
      resetForm();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to save pricing policy'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-3xl font-semibold text-blue-900">Pricing Management</div>
            <p className="mt-2 text-slate-500">Manage monthly and per-visit car pricing from backend policies.</p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border px-5 py-3 text-slate-700"
            >
              New Policy
            </button>
            <button
              type="button"
              onClick={loadPolicies}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-white"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            {isLoading ? (
              <div className="rounded-3xl border bg-white p-6 text-slate-500 shadow-sm">Loading pricing policies...</div>
            ) : (
              policies.map((item) => <PricingCard key={item.id} pricing={item} onEdit={handleEdit} />)
            )}
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {editingPolicyId ? 'Edit Pricing Policy' : 'Create Pricing Policy'}
                </h3>
                <p className="mt-1 text-sm text-slate-500">Use minutes from midnight for the time windows.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
                <span>Policy name</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Vehicle type</span>
                <select
                  value={form.vehicleType}
                  onChange={(event) => setForm((current) => ({ ...current, vehicleType: event.target.value }))}
                  className="w-full rounded-xl border px-3 py-2"
                >
                  <option value="CAR">CAR</option>
                  <option value="MOTORBIKE">MOTORBIKE</option>
                  <option value="BICYCLE">BICYCLE</option>
                  <option value="ELECTRIC_BIKE">ELECTRIC_BIKE</option>
                </select>
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Status</span>
                <select
                  value={String(form.isActive)}
                  onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.value === 'true' }))}
                  className="w-full rounded-xl border px-3 py-2"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Monthly fee</span>
                <input
                  type="number"
                  value={form.monthlyFee}
                  onChange={(event) => setNumberField('monthlyFee', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Daytime fee</span>
                <input
                  type="number"
                  value={form.daytimeBlockFee}
                  onChange={(event) => setNumberField('daytimeBlockFee', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Evening fee</span>
                <input
                  type="number"
                  value={form.eveningBlockFee}
                  onChange={(event) => setNumberField('eveningBlockFee', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Overnight flat fee</span>
                <input
                  type="number"
                  value={form.overnightFlatFee}
                  onChange={(event) => setNumberField('overnightFlatFee', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Block duration (minutes)</span>
                <input
                  type="number"
                  value={form.blockDurationMinutes}
                  onChange={(event) => setNumberField('blockDurationMinutes', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Grace period (minutes)</span>
                <input
                  type="number"
                  value={form.gracePeriodMinutes}
                  onChange={(event) => setNumberField('gracePeriodMinutes', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Daytime start</span>
                <input
                  type="number"
                  value={form.daytimeStartMinutes}
                  onChange={(event) => setNumberField('daytimeStartMinutes', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Daytime end</span>
                <input
                  type="number"
                  value={form.daytimeEndMinutes}
                  onChange={(event) => setNumberField('daytimeEndMinutes', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Evening start</span>
                <input
                  type="number"
                  value={form.eveningStartMinutes}
                  onChange={(event) => setNumberField('eveningStartMinutes', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Evening end</span>
                <input
                  type="number"
                  value={form.eveningEndMinutes}
                  onChange={(event) => setNumberField('eveningEndMinutes', event.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-blue-900 px-5 py-3 text-white disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSaving ? 'Saving...' : editingPolicyId ? 'Update Policy' : 'Create Policy'}
              </button>
              <button type="button" onClick={resetForm} className="rounded-xl border px-5 py-3 text-slate-700">
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PricingTable data={policies} onEdit={handleEdit} />
          </div>

          <FeeCalculator policy={activeCarPolicy} />
        </div>

      </div>
    </DashboardLayout>
  );
}
