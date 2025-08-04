interface FormInputProps {
  name: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
}

const FormInput = ({
  name,
  placeholder,
  type = "text",
  onChange,
  value,
  error,
}: FormInputProps) => {
  return (
    <div className="w-full">
      <input
        className="auth-input-styles"
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
