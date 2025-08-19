import { setUser } from "../store/features/auth/authSlice";
import { store } from "../store/store";
import type { User } from "../types/auth";
import { getItemFromStorage } from "./localstorage";

export function initializeAuth() {
  const user = getItemFromStorage<User>("user");

  if (user) {
    store.dispatch(setUser(user));
  }
}
