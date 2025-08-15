import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export function useRole() {
  const role = useSelector((state: RootState) => state.auth.currentUser?.role);

  return role;
}
