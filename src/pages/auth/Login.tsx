import AuthForm from "../../components/auth-form/AuthForm";
import { useForm } from "../../hooks/useForm";
import { validateLogin } from "../../utils/validators";

const Login = () => {
  const { form, handleChange, handleSubmit, errors } = useForm(
    {
      email: "",
      password: "",
    },
    validateLogin,
    () => {}
  );

  const fields = [
    { name: "email", placeholder: "E-mail", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
  ];

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
