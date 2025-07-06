import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem('admin_token');
  const required = import.meta.env.VITE_ADMIN_TOKEN;
  if (required && token !== required) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
