import AuthForm from "../../components/auth-form/AuthForm";
import { useForm } from "../../hooks/useForm";
import { validateSignUp } from "../../utils/validators";

const SignUp = () => {
  const { form, handleSubmit, handleChange, errors } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateSignUp,
    () => {}
  );

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
