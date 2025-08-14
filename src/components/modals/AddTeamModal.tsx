import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import type { AppDispatch, RootState } from "../../store/store";

import { useForm } from "../../hooks/useForm";
import { validateTeam } from "../../utils/validators";
import ModalFormWrapper from "../../utils/common/ModalFormWrapper";
import ModalForm from "../auth-form/ModalForm";
import { createTeam } from "../../store/features/teams/teamThunks";

interface AddTeamModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const AddTeamModal = ({ isOpen, setIsOpen }: AddTeamModalProps) => {
  const currentUserId = useSelector(
    (state: RootState) => state.auth.currentUser?.id
  );
  const dispatch = useDispatch<AppDispatch>();
  const { form, handleSubmit, handleChange, errors } = useForm({
    initialValues: {
      name: "",
      emoji: "",
    },
    validate: validateTeam,
    onSubmit: () => {
      const newTeam = {
        id: uuid4(),
        name: form.name,
        emoji: form.emoji ? form.emoji : "🧑‍💻",
        members: currentUserId ? [currentUserId] : [],
        projectIds: [],
      };

      dispatch(createTeam(newTeam));
    },
    onClose: setIsOpen,
  });

  const fields = [
    { name: "name", placeholder: "Name", type: "text" },
    { name: "emoji", placeholder: "Emoji(Optional)", type: "text" },
  ];

  return (
    <ModalFormWrapper isOpen={isOpen} title="Add a Team">
      <ModalForm
        fields={fields}
        form={form}
        onSubmit={handleSubmit}
        onChange={handleChange}
        errors={errors}
        submitText="Submit Team"
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
      />
    </ModalFormWrapper>
  );
};

export default AddTeamModal;
