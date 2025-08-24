import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import type { AppDispatch, RootState } from "../../store/store";
import { useForm } from "../../hooks/useForm";
import { validateTeam } from "../../utils/validators";
import ModalFormWrapper from "../../utils/common/ModalFormWrapper";
import ModalForm from "../auth-form/ModalForm";
import { createTeam, updateTeam } from "../../store/features/teams/teamThunks";
import type { Team } from "../../types/team";
import { useEffect } from "react";

interface AddTeamModalProps {
  team?: Team;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isEditMode?: boolean;
}

const AddTeamModal = ({
  isOpen,
  setIsOpen,
  team,
  isEditMode = false,
}: AddTeamModalProps) => {
  const currentUserId = useSelector(
    (state: RootState) => state.auth.currentUser?.id
  );

  const dispatch = useDispatch<AppDispatch>();

  // Set initial values based on whether we're editing or creating
  const initialValues =
    isEditMode && team
      ? { name: team.name, emoji: team.emoji || "" }
      : { name: "", emoji: "" };

  const { form, handleSubmit, handleChange, errors, setForm } = useForm({
    initialValues,
    validate: validateTeam,
    onSubmit: () => {
      if (isEditMode && team) {
        // Update existing team
        const updatedTeam = {
          id: team.id,
          name: form.name,
          emoji: form.emoji ? form.emoji : "🧑‍💻",
          members: team.members, // Keep existing members
          projectIds: team.projectIds, // Keep existing projectIds
        };
        dispatch(updateTeam(updatedTeam));
      } else {
        // Create new team
        const newTeam = {
          id: uuid4(),
          name: form.name,
          emoji: form.emoji ? form.emoji : "🧑‍💻",
          owner: currentUserId || "",
          members: currentUserId ? [currentUserId] : [],
          projectIds: [],
        };
        dispatch(createTeam(newTeam));
      }
    },
    onClose: setIsOpen,
  });

  // Update form values when team prop changes (for edit mode)
  useEffect(() => {
    if (isEditMode && team) {
      setForm({
        name: team.name,
        emoji: team.emoji || "",
      });
    }
  }, [team, isEditMode, setForm]);

  const fields = [
    { name: "name", placeholder: "Name", type: "text" },
    { name: "emoji", placeholder: "Emoji(Optional)", type: "text" },
  ];

  // Dynamic title and submit text based on mode
  const modalTitle = isEditMode ? "Edit Team" : "Add a Team";
  const submitText = isEditMode ? "Update Team" : "Submit Team";

  return (
    <ModalFormWrapper isOpen={isOpen} title={modalTitle}>
      <ModalForm
        fields={fields}
        form={form}
        onSubmit={handleSubmit}
        onChange={handleChange}
        errors={errors}
        submitText={submitText}
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        team={team}
      />
    </ModalFormWrapper>
  );
};

export default AddTeamModal;
