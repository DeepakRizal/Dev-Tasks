export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  teamId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
