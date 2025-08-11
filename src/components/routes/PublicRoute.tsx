import type React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  if (currentUser) return <Navigate to={"/dashboard"} replace />;

  return children;
};

export default PublicRoute;
