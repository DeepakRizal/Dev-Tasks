export function validateLogin(data: Record<string, string>) {
  const newErrores: Record<string, string> = {};

  if (!data.email.trim()) newErrores.email = "Email is required!";
  if (!data.password.trim()) newErrores.password = "Password is required!";

  return newErrores;
}

export function validateSignUp(data: Record<string, string>) {
  const newErrores: Record<string, string> = {};

  if (!data.name.trim()) newErrores.name = "Name is required!";
  if (!data.email.trim()) newErrores.email = "Email is required!";
  if (!data.password.trim()) newErrores.password = "Password is required!";
  if (!data.confirmPassword.trim())
    newErrores.confirmPassword = " Password confirmation is required!";

  return newErrores;
}
