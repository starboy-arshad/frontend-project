import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}
