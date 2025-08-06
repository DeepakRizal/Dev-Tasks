import { useDispatch } from "react-redux";
import { v4 as uuid4 } from "uuid";
import type { AppDispatch } from "../../store/store";
import { addProjectToTeam } from "../../store/features/teams/teamSlice";
import ModalFormWrapper from "../../utils/common/ModalFormWrapper";
import { useForm } from "../../hooks/useForm";
import { validateProject } from "../../utils/validators";
import ModalForm from "../auth-form/ModalForm";

interface AddProjectModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  teamId: string;
}

const AddProjectModal = ({
  isOpen,
  setIsOpen,
  teamId,
}: AddProjectModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { form, handleSubmit, handleChange, errors } = useForm({
    initialValues: {
      name: "",
      emoji: "",
      description: "",
    },
    validate: validateProject,
    onSubmit: () => {
      const newProject = {
        id: uuid4(),
        name: form.name,
        emoji: form.emoji ? form.emoji : "🧑‍💻",
        description: form.description,
      };
      dispatch(addProjectToTeam({ teamId, project: newProject }));
    },
    onClose: setIsOpen,
  });

  const fields = [
    { name: "name", placeholder: "Name", type: "text" },
    { name: "emoji", placeholder: "Emoji(Optional)", type: "text" },
    { name: "description", placeholder: "description", type: "text" },
  ];

  return (
    <ModalFormWrapper isOpen={isOpen} title="Add a Team">
      <ModalForm
        form={form}
        onSubmit={handleSubmit}
        fields={fields}
        onCancel={() => setIsOpen(false)}
        onChange={handleChange}
        errors={errors}
        isOpen={isOpen}
        submitText="Submit Project"
      />
    </ModalFormWrapper>
  );
};

export default AddProjectModal;
