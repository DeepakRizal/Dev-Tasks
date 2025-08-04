import React, { useState } from "react";
import AuthForm from "../../components/auth-form/AuthForm";

const Login = () => {
  const [form, setForm] = useState<Record<string, string>>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = [
    { name: "email", placeholder: "E-mail", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
  ];

  function validateForm(data: Record<string, string>) {
    const newErros: Record<string, string> = {};
    if (!data.email.trim()) newErros.email = "Email is required!";
    if (!data.password.trim()) newErros.password = "Password is required!";

    return newErros;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    <AuthForm
      headingText="Login"
      buttonText="Login"
      fields={fields}
      onSubmit={handleSubmit}
      onChange={handleChange}
      form={form}
      errors={errors}
      footerText="don't have an account?"
      footer={{
        label: "Sign up",
        to: "/sign-up",
      }}
    />
  );
};

export default Login;
