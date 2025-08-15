import { useDispatch } from "react-redux";
import AuthForm from "../../components/auth-form/AuthForm";
import { useForm } from "../../hooks/useForm";
import { validateSignUp } from "../../utils/validators";
import type { AppDispatch } from "../../store/store";
import { signupUser } from "../../store/features/auth/authSlice";
import type { SignupCredentials } from "../../types/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { form, handleSubmit, handleChange, errors } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateSignUp,
    onSubmit: async () => {
      const newUser: SignupCredentials = {
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        role: "Viewer",
      };

      try {
        // Wait for the signup to complete
        const result = await dispatch(signupUser(newUser)).unwrap();

        // Only navigate if signup was successful
        if (result) {
          navigate("/dashboard");
        }
      } catch (error) {
        // Error is already handled by the rejected case in the slice
        // The error will be displayed in the AuthForm
        console.error("Signup failed:", error);
      }
    },
  });

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
