import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { currentUser, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Show loading while authentication is in progress
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Redirect to login if no user
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
