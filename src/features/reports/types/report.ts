export type ReportStat = {
  title: string;
  value: string;
  note: string;
};

export type Transaction = {
  id: number;
  plate: string;
  vehicleType: string;
  amount: number;
  status: 'Paid' | 'Pending';
  time: string;
};
