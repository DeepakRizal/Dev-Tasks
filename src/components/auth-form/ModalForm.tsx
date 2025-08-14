import type { Team } from "../../types/team";
import Button from "../ui/Button";
import FormInput from "./FormInput";
import React from "react";

interface FieldConfig {
  name: string;
  placeholder: string;
  type?: string;
}

interface ModalFormProps {
  isOpen: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  fields: FieldConfig[];
  form: Record<string, string>;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitText: string;
  team?: Team;
}

const ModalForm = ({
  isOpen,
  onSubmit,
  onCancel,
  fields,
  form,
  errors,
  onChange,
  submitText,
}: ModalFormProps) => {
  if (!isOpen) return null;

  return (
    <div className="bg-black/50 z-10 fixed inset-0 flex items-center justify-center">
      <div className="bg-[#1e1e1e] text-white px-8 py-10 rounded-md border border-slate-700 shadow-lg max-w-md w-full">
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
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
          <div className="flex justify-end gap-4 mt-6">
            <Button
              text="Cancel"
              variant="primary"
              className="bg-red-500 hover:bg-red-600"
              onClick={onCancel}
              size="sm"
            />
            <Button
              type="submit"
              variant="primary"
              text={submitText}
              size="sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
