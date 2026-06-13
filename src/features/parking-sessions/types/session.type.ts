export type SessionStatus = 'OVERDUE' | 'PARKED' | 'EXITED' | 'RESERVED';

export type Session = {
  plate: string;
  vehicle: string;
  duration: string;
  fee: string;
  status: SessionStatus;
};
