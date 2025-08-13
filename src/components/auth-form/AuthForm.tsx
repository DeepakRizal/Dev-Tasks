import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import type React from "react";
import type { FormEvent } from "react";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface FieldConfig {
  name: string;
  placeholder: string;
  type?: string;
}

interface AuthFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  headingText: string;
  fields: FieldConfig[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: Record<string, string>;
  errors: Record<string, string>;
  buttonText: string;
  footerText: string;
  footer: {
    label: string;
    to: string;
  };
}

const AuthForm = ({
  onSubmit,
  headingText,
  fields,
  onChange,
  form,
  errors,
  footerText,
  footer,
  buttonText,
}: AuthFormProps) => {
  const { error } = useSelector((state: RootState) => state.auth);

  return (
    <div className=" flex items-center h-[100%]  justify-center">
      <form onSubmit={onSubmit} className="w-[350px]">
        <h2 className="auth-heading-styles">{headingText}</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex flex-col gap-5 items-center justify-center mb-4">
          {fields.map((field) => (
            <FormInput
              key={field.name}
              placeholder={field.placeholder}
              name={field.name}
              type={field.type}
              onChange={onChange}
              value={form[field.name]}
              error={errors[field.name]}
            />
          ))}

          <button
            className="py-2 font-bold text-white rounded-md w-full cursor-pointer hover:shadow-pink-500/50 transition-shadow duration-300"
            style={{
              background:
                "linear-gradient(to right, #db2777 0%, #db2777 80%, #f472b6 100%)",
            }}
          >
            {buttonText}
          </button>
        </div>

        <p className="text-white">
          {footerText}{" "}
          <Link className="font-bold" to={footer.to}>
            {footer.label}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
