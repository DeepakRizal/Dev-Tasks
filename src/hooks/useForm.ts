import { useState } from "react";

type ValidateFn = (value: Record<string, string>) => Record<string, string>;

interface UseFormProps {
  initialValues: Record<string, string>;
  validate: ValidateFn;
  onSubmit: () => void;
  onClose?: (value: boolean) => void;
}

export function useForm({
  initialValues,
  validate,
  onSubmit,
  onClose,
}: UseFormProps) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit();
    setForm(initialValues);
    setErrors({});
    if (onClose) onClose(false);
  }

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    setForm,
    setErrors,
  };
}
