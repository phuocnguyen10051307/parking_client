import { Grid2X2, List, Search } from 'lucide-react';

import type { ZoneFloorFilter } from '../types/zone';

type Props = {
  floors: ZoneFloorFilter[];
  selectedFloorId: string;
  selectedVehicleType: string;
  vehicleTypes: string[];
  onFloorChange: (floorId: string) => void;
  onVehicleTypeChange: (vehicleType: string) => void;
};

const formatVehicleType = (vehicleType: string) => vehicleType.replaceAll('_', ' ');

export function ZoneFilterBar({
  floors,
  selectedFloorId,
  selectedVehicleType,
  vehicleTypes,
  onFloorChange,
  onVehicleTypeChange,
}: Props) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2">
        <Search className="h-4 w-4 text-slate-500" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>

      <select
        value={selectedFloorId}
        onChange={(event) => onFloorChange(event.target.value)}
        className="rounded-lg border px-4 py-2 text-sm"
      >
        <option value="all">All Floors</option>
        {floors.map((floor) => (
          <option key={floor.id} value={floor.id}>
            {floor.name}
          </option>
        ))}
      </select>

      <select
        value={selectedVehicleType}
        onChange={(event) => onVehicleTypeChange(event.target.value)}
        className="rounded-lg border px-4 py-2 text-sm"
      >
        <option value="all">All Vehicle Types</option>
        {vehicleTypes.map((vehicleType) => (
          <option key={vehicleType} value={vehicleType}>
            {formatVehicleType(vehicleType)}
          </option>
        ))}
      </select>

      <div className="ml-auto flex gap-2">
        <button className="rounded-lg bg-blue-50 p-2 text-blue-700" aria-label="Grid view">
          <Grid2X2 size={16} />
        </button>

        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="List view">
          <List size={16} />
        </button>
      </div>
    </div>
  );
}