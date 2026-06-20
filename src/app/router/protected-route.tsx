import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  // Lấy access token từ localStorage
  const token = localStorage.getItem('accessToken');

  // Nếu chưa đăng nhập -> đá về login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có token -> render page
  return children;
}
