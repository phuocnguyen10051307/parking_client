import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRouter } from './auth-router';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<>Parking web</>} />
      {AuthRouter()}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
