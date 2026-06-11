export function ParkingAiCard() {
  return (
    <div className="rounded-3xl bg-blue-950 p-8 text-white">
      <div className="text-3xl font-bold">Automated Plate Recognition</div>

      <p className="mt-4 max-w-md text-slate-200">
        The AI-driven entry system is currently operating at 99.8% accuracy.
      </p>

      <button className="mt-6 rounded-xl bg-white px-6 py-3 text-blue-950">Configure System</button>
    </div>
  );
}
