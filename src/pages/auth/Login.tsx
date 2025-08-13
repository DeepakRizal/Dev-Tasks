import { useDispatch } from "react-redux";
import AuthForm from "../../components/auth-form/AuthForm";
import { useForm } from "../../hooks/useForm";
import { validateLogin } from "../../utils/validators";
import type { AppDispatch } from "../../store/store";
import type { LoginCredentials } from "../../types/auth";
import { loginUser } from "../../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { form, handleChange, handleSubmit, errors } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: () => {
      const credentials: LoginCredentials = {
        email: form.email,
        password: form.password,
      };

      dispatch(loginUser(credentials));
      navigate("/dashboard");
    },
  });

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
