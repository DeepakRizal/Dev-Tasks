import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/auth-form/FormInput";

interface formState {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<formState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm(data: formState) {
    const newErros: Record<string, string> = {};
    if (!data.email.trim()) newErros.email = "Email is required!";
    if (!data.password.trim()) newErros.password = "Password is required!";

    return newErros;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  }

  return (
    <div className=" flex items-center h-[100%]  justify-center">
      <form onSubmit={handleSubmit} className="w-[350px]">
        <h2 className="auth-heading-styles">Login</h2>

        <div className="flex flex-col gap-5 items-center justify-center mb-4">
          <FormInput
            placeholder="E-mail"
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            value={form.email}
            error={errors.email}
          />
          <FormInput
            placeholder="Password"
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            value={form.password}
            error={errors.password}
          />
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
          don't have an account?
          <Link className="font-bold" to={"/sign-up"}>
            Create a account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
