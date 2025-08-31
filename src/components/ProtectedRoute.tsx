import { Navigate, Outlet } from "react-router";
import { useUsers } from "../redux/slices/auth.slice";

const ProtectedRoute: React.FC = () => {
  const { user } = useUsers();
  return user && user.id ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
