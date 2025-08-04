import React, { useState } from "react";
import AuthForm from "../../components/auth-form/AuthForm";

const SignUp = () => {
  const [form, setForm] = useState<Record<string, string>>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = [
    { name: "email", placeholder: "E-mail", type: "text" },
    { name: "name", placeholder: "Name", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
    {
      name: "confirmPassword",
      placeholder: "Confirm password",
      type: "password",
    },
  ];

  function validateErrors(data: Record<string, string>) {
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
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <AuthForm
      form={form}
      onSubmit={handleSubmit}
      onChange={handleChange}
      errors={errors}
      headingText="Sign Up"
      footerText="Already have an account?"
      footer={{
        label: "Login",
        to: "/login",
      }}
      buttonText="Sign up"
      fields={fields}
    />
  );
};

export default SignUp;
