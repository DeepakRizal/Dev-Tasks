import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import type { AppDispatch, RootState } from "../../store/store";
import ModalFormWrapper from "../../utils/common/ModalFormWrapper";
import { useForm } from "../../hooks/useForm";
import { validateProject } from "../../utils/validators";
import ModalForm from "../auth-form/ModalForm";

import {
  createProject,
  updateProject,
} from "../../store/features/project/projectThunks";
import { createBoard } from "../../store/features/board/boardThunks";
import { createColumn } from "../../store/features/column/columnThunks";
import { addProjectToTeam } from "../../store/features/teams/teamThunks";
import type { Project } from "../../types/team";
import { useEffect } from "react";

interface AddProjectModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  teamId: string;
  project?: Project;
  isEditMode?: boolean;
}

const AddProjectModal = ({
  isOpen,
  setIsOpen,
  teamId,
  project,
  isEditMode,
}: AddProjectModalProps) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const { form, handleSubmit, handleChange, errors, setForm } = useForm({
    initialValues: {
      name: "",
      emoji: "",
      description: "",
    },
    validate: validateProject,
    onSubmit: () => {
      if (isEditMode && project) {
        const updatedProject = {
          id: project.id,
          name: form.name,
          emoji: form.emoji,
          description: form.description,
          status: project.status,
          owner: project.owner,
          teamId: project.teamId,
          boardId: project.boardId,
        };
        dispatch(updateProject(updatedProject));
      } else {
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
          archived: false,
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
      }
    },
    onClose: setIsOpen,
  });

  useEffect(() => {
    if (isEditMode && project) {
      setForm({
        name: project.name,
        emoji: project.emoji,
        description: project.description,
      });
    }
  }, [isEditMode, project, setForm]);

  const fields = [
    { name: "name", placeholder: "Name", type: "text" },
    { name: "emoji", placeholder: "Emoji(Optional)", type: "text" },
    { name: "description", placeholder: "description", type: "text" },
  ];

  const modalTitle = isEditMode ? "Edit a Project" : "Add a Project";
  const submitText = isEditMode ? "Edit Project" : "Submit Project";

  return (
    <ModalFormWrapper isOpen={isOpen} title={modalTitle}>
      <ModalForm
        form={form}
        onSubmit={handleSubmit}
        fields={fields}
        onCancel={() => setIsOpen(false)}
        onChange={handleChange}
        errors={errors}
        isOpen={isOpen}
        submitText={submitText}
        project={project}
      />
    </ModalFormWrapper>
  );
};

export default AddProjectModal;
