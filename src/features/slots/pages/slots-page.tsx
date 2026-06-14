import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { SlotCard } from '../components/slot-card';
import { SlotDetailPanel } from '../components/slot-detail-panel';
import { SlotFilterBar } from '../components/slot-filter-bar';
import { slotMockData } from '../data/slot-data';
import type { Slot } from '../types/slot.type';

// Danh sách tầng dùng cho dropdown
const floors = [
  {
    id: 'basement-1',
    name: 'Basement 1',
  },
  {
    id: 'floor-1',
    name: 'Floor 1',
  },
  {
    id: 'floor-2',
    name: 'Floor 2',
  },
  {
    id: 'floor-3',
    name: 'Floor 3',
  },
];

export default function SlotsPage() {
  // Lấy floorId từ URL
  const { floorId } = useParams();

  // Hook điều hướng
  const navigate = useNavigate();

  // Slot đang chọn để xem chi tiết
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // Tìm floor hiện tại theo id
  const currentFloor = floors.find((floor) => floor.id === floorId);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          {/* Hiển thị tên tầng đúng theo dropdown */}
          <div className="text-3xl font-semibold text-blue-900">
            {currentFloor?.name || 'Floor'} Management
          </div>

          <p className="mt-2 text-slate-500">Visual grid of active parking slots</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Dropdown chọn tầng */}
          <select
            value={floorId}
            onChange={(e) => navigate(`/slots/${e.target.value}`)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm"
          >
            {floors.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.name}
              </option>
            ))}
          </select>

          {/* Nút thêm slot */}
          <button className="rounded-xl bg-blue-900 px-4 py-2 font-medium text-white transition hover:opacity-90">
            Add Slot
          </button>
        </div>
      </div>

      {/* Bộ lọc */}
      <SlotFilterBar />

      {/* Grid hiển thị slot */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        {slotMockData.map((slot) => (
          <SlotCard key={slot.id} slot={slot} onClick={() => setSelectedSlot(slot)} />
        ))}
      </div>

      {/* Panel chi tiết slot */}
      <SlotDetailPanel slot={selectedSlot} />
    </DashboardLayout>
  );
}
