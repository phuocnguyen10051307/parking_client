import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { slotsApi } from '@/features/slots/api/slots-api';

import { SlotCard } from '../components/slot-card';
import { SlotDetailPanel } from '../components/slot-detail-panel';
import { SlotFilterBar } from '../components/slot-filter-bar';
import type { BackendSlot, FloorOption } from '../types/backend-slot.type';
import type { Slot } from '../types/slot.type';
import { mapSlot, extractFloors } from '../utils/slot-transform';
import { VEHICLE_MAP } from '../constants/slot-mapper';

export default function SlotsPage() {
  // Lấy floorId từ URL
  const { floorId } = useParams();
  const navigate = useNavigate();
  // State dữ liệu raw từ backend
  const [rawSlots, setRawSlots] = useState<BackendSlot[]>([]);
  // State floor dropdown
  const [floors, setFloors] = useState<FloorOption[]>([]);
  const [loading, setLoading] = useState(true);
  // Slot đang được chọn
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  // State filter status
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  // State filter loại xe
  const [vehicleFilter, setVehicleFilter] = useState<string | null>(null);

  // Tìm floor hiện tại theo URL
  const currentFloor = useMemo(
    () => floors.find((floor) => floor.id === floorId) ?? floors[0],
    [floors, floorId]
  );

  // Fetch dữ liệu slot từ backend
  const fetchSlots = useCallback(async () => {
    try {
      setLoading(true);

      const data: BackendSlot[] = await slotsApi.getSlots();

      // Lưu raw data
      setRawSlots(data);

      // Tách floor ra để làm dropdown
      const extractedFloors = extractFloors(data);
      setFloors(extractedFloors);

      // Nếu floor URL không tồn tại -> redirect về floor đầu
      if (
        extractedFloors.length > 0 &&
        floorId &&
        !extractedFloors.some((floor) => floor.id === floorId)
      ) {
        navigate(`/slots/${extractedFloors[0].id}`, { replace: true });
      }
    } catch {
      toast.error('Failed to load slots');
    } finally {
      setLoading(false);
    }
  }, [floorId, navigate]);

  // Load data khi vào page
  useEffect(() => {
    (async () => {
      await fetchSlots();
    })();
  }, [fetchSlots]);

  // Filter slot theo floor + status + vehicle type
  const filteredSlots = useMemo(() => {
    let result = currentFloor
      ? rawSlots.filter((slot) => slot.zone?.floor?.id === currentFloor.id)
      : rawSlots;

    // Filter status
    if (statusFilter) {
      result = result.filter((slot) => slot.status === statusFilter.toUpperCase());
    }

    // Filter vehicle
    if (vehicleFilter) {
      result = result.filter((slot) => {
        const mappedVehicle = VEHICLE_MAP[slot.vehicleType];
        return mappedVehicle === vehicleFilter;
      });
    }

    // Convert sang UI format
    return result.map(mapSlot);
  }, [rawSlots, currentFloor, statusFilter, vehicleFilter]);

  // Loading UI
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-slate-500">Loading slots...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-blue-900">
            {currentFloor?.name ?? 'Floor'} Management
          </h1>

          <p className="mt-2 text-slate-500">Visual grid of active parking slots</p>
        </div>

        {/* Dropdown chọn floor */}
        <select
          value={currentFloor?.id ?? ''}
          onChange={(e) => navigate(`/slots/${e.target.value}`)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm"
        >
          {floors.map((floor) => (
            <option key={floor.id} value={floor.id}>
              {floor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bộ lọc */}
      <SlotFilterBar
        statusFilter={statusFilter}
        vehicleFilter={vehicleFilter}
        onStatusChange={setStatusFilter}
        onVehicleChange={setVehicleFilter}
      />

      {/* Grid slot */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        {filteredSlots.map((slot) => (
          <SlotCard key={slot.id} slot={slot} onClick={() => setSelectedSlot(slot)} />
        ))}
      </div>

      {/* Panel chi tiết */}
      <SlotDetailPanel slot={selectedSlot} />
    </DashboardLayout>
  );
}
