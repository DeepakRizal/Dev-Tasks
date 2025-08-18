import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import type { AppDispatch, RootState } from "../../store/store";
import ModalFormWrapper from "../../utils/common/ModalFormWrapper";
import { useForm } from "../../hooks/useForm";
import { validateProject } from "../../utils/validators";
import ModalForm from "../auth-form/ModalForm";

import { createProject } from "../../store/features/project/projectThunks";
import { createBoard } from "../../store/features/board/boardThunks";
import { createColumn } from "../../store/features/column/columnThunks";
import { addProjectToTeam } from "../../store/features/teams/teamThunks";

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
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const { form, handleSubmit, handleChange, errors } = useForm({
    initialValues: {
      name: "",
      emoji: "",
      description: "",
    },
    validate: validateProject,
    onSubmit: () => {
      const projectId = uuid4();
      const boardId = uuid4();

      const todoId = `todo-${uuid4()}`;
      const inProgressId = `inProgress-${uuid4()}`;
      const completedId = `completed-${uuid4()}`;

      const todoColumn = {
        id: `todo-${uuid4()}`,
        boardId,
        title: "To Do",
        emoji: "📝",
        taskIds: [],
      };

      const inProgressColumn = {
        id: `inProgress-${uuid4()}`,
        boardId,
        title: "In Progress",
        emoji: "🔄",
        taskIds: [],
      };

      const completedColumn = {
        id: `completed-${uuid4()}`,
        boardId,
        title: "Completed",
        emoji: "✅",
        taskIds: [],
      };

      const newBoard = {
        id: boardId,
        projectId,
        columnIds: [todoId, inProgressId, completedId],
      };

      const newProject = {
        id: projectId,
        name: form.name,
        emoji: form.emoji ? form.emoji : "🧑‍💻",
        description: form.description,
        status: "Active",
        owner: currentUser?.name as string,
        teamId,
        boardId,
      };
      //disptach the project
      dispatch(createProject(newProject));

      //dispatch the projectId to add to the team state
      dispatch(addProjectToTeam({ teamId, projectId }));

      //disptach the board
      dispatch(createBoard(newBoard));

      //dispatch the three columns
      dispatch(createColumn(todoColumn));
      dispatch(createColumn(inProgressColumn));
      dispatch(createColumn(completedColumn));
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
