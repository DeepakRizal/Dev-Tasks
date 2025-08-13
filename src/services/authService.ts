import type { LoginCredentials, User } from "../types/auth";
import { api } from "./api";

const authService = {
  async login(credentials: LoginCredentials) {
    const res = await api.get(`/users?email=${credentials.email}`);

    const user = res.data[0] as User;

    if (!user || user.password !== credentials.password) {
      throw new Error("Invalid credentials!");
    }
    user.password = "";
    console.log(user);

    return user;
  },
};

export default authService;
