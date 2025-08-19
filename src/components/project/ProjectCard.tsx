import { useParams } from "react-router-dom";
import type { Project } from "../../types/team";
import { Archive, ClipboardList, SquarePen, Trash } from "lucide-react";
import Button from "../ui/Button";
import { useRole } from "../../hooks/useRole";
import { can } from "../../utils/permission";
import { useState } from "react";
import DeleteModal from "../modals/DeleteModal";
import AddProjectModal from "../modals/AddProjectModal";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import {
  archiveProject,
  deleteProject,
  restoreProject,
} from "../../store/features/project/projectThunks";

interface ProjectProps {
  project: Project;
  projectId: string;
  isArchive?: boolean;
}

const ProjectCard = ({ project, projectId, isArchive }: ProjectProps) => {
  const { teamId } = useParams();
  const role = useRole();
  const dispatch = useDispatch<AppDispatch>();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleEdit() {
    setIsEditOpen(true);
  }

  function handleDelete() {
    setIsDeleteOpen(true);
  }

  function handleArchive() {
    dispatch(
      archiveProject({ id: projectId, project: { ...project, archived: true } })
    );
  }

  function handleRestore() {
    dispatch(
      restoreProject({
        id: projectId,
        project: { ...project, archived: false },
      })
    );
  }

  return (
    <div
      key={project.id}
      className="flex items-center justify-between bg-gray-800 border border-slate-600 rounded-lg p-4"
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl">{project.emoji}</span>
        <div>
          <span className="text-white font-medium">{project.name}</span>
          <p className="text-gray-400 text-sm mt-1">{project.description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {!isArchive && (
          <Button
            to={`/teams/${teamId}/project/${projectId}`}
            icon={<ClipboardList size={15} />}
            text="View Board"
            variant="secondary"
            size="sm"
          />
        )}
        {role && can.manageProjects(role) && (
          <>
            {isArchive && (
              <Button
                text="Restore"
                icon={<Archive size={15} />}
                variant="primary"
                size="sm"
                className="bg-slate-400 hover:bg-slate-500"
                onClick={handleRestore}
              />
            )}
            {!isArchive && (
              <>
                <Button
                  text="Archive"
                  icon={<Archive size={15} />}
                  variant="primary"
                  size="sm"
                  className="bg-slate-400 hover:bg-slate-500"
                  onClick={handleArchive}
                />
                <Button
                  text="Edit"
                  icon={<SquarePen size={15} />}
                  variant="neutral"
                  size="sm"
                  onClick={handleEdit}
                />
                <Button
                  text="Delete"
                  icon={<Trash size={15} />}
                  variant="accent"
                  className="bg-red-500 hover:bg-red-600"
                  size="sm"
                  onClick={handleDelete}
                />
              </>
            )}
          </>
        )}
      </div>
      {isDeleteOpen && (
        <DeleteModal
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          onConfirm={() => dispatch(deleteProject(project.id))}
        />
      )}

      {/* Add the edit modal */}
      {isEditOpen && (
        <AddProjectModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          project={project}
          isEditMode={true}
          teamId={teamId as string}
        />
      )}
    </div>
  );
};

export default ProjectCard;
