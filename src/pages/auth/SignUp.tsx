import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [form, setForm] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateErrors(data: SignUpFormData) {
    const newErrors: Record<string, string> = {};

    if (!data.name.trim()) newErrors.name = "Name is required!";
    if (!data.email.trim()) newErrors.email = "Email is required!";
    if (!data.password.trim()) newErrors.password = "Password is required!";
    if (!data.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required!";

    return newErrors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateErrors(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  }

  return (
    <div className=" flex items-center h-[100%]  justify-center">
      <form onSubmit={handleSubmit} className="w-[350px]">
        <h2 className="auth-heading-styles">Sign Up</h2>

        <div className="flex flex-col gap-5 items-center justify-center mb-4">
          <div className="w-full">
            <input
              className="auth-input-styles"
              placeholder="Name"
              type="text"
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              value={form.name}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="w-full">
            <input
              className="auth-input-styles"
              placeholder="E-mail"
              type="text"
              name="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              value={form.email}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="w-full">
            <input
              type="password"
              className="auth-input-styles"
              placeholder="Password"
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              value={form.password}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="password"
              className="auth-input-styles"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              value={form.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            className="py-2 font-bold text-white rounded-md w-full cursor-pointer hover:shadow-pink-500/50 transition-shadow duration-300"
            style={{
              background:
                "linear-gradient(to right, #db2777 0%, #db2777 80%, #f472b6 100%)",
            }}
          >
            Sign Up
          </button>
        </div>

        <p className="text-white">
          already have an account?{" "}
          <Link className="font-bold" to={"/login"}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
