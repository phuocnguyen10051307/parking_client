type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function PublicPricingFilter({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-slate-700">Vehicle Type</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border bg-white px-4 py-3"
      >
        <option value="">Select vehicle type</option>

        <option value="CAR">Car</option>

        <option value="MOTORBIKE">Motorbike</option>

        <option value="BICYCLE">Bicycle</option>

        <option value="ELECTRIC_BIKE">Electric Bike</option>
      </select>
    </div>
  );
}
