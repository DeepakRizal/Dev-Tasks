import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);

  if (!user) return <Navigate to={"/login"} />;

  return <Outlet />;
};

export default ProtectedRoute;
