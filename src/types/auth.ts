export type Role = "Admin" | "Maintainer" | "Member" | "Viewer";

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  teamId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}
