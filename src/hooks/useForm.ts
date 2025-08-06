import React, { useState } from "react";

type validateFn = (value: Record<string, string>) => Record<string, string>;

export function useForm(
  initialValues: Record<string, string>,
  validate: validateFn,
  onSubmit: () => void
) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 1) {
      setErrors(validationErrors);
      return;
    }
    onSubmit();
    setForm(initialValues);
    setErrors({});
  }

  return {
    form,
    handleChange,
    handleSubmit,
    errors,
  };
}
