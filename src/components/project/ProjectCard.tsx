import { useParams } from "react-router-dom";
import type { Project } from "../../types/team";
import { ClipboardList, SquarePen, Trash } from "lucide-react";
import Button from "../ui/Button";
import { useRole } from "../../hooks/useRole";

interface ProjectProps {
  project: Project;
  projectId: string;
}

const ProjectCard = ({ project, projectId }: ProjectProps) => {
  const { teamId } = useParams();
  const role = useRole();

  function handleEdit() {}

  function handleDelete() {}

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
        <Button
          to={`/teams/${teamId}/project/${projectId}`}
          icon={<ClipboardList size={15} />}
          text="View Board"
          variant="secondary"
          size="sm"
        />
        {role === "Admin" && (
          <>
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
      </div>
    </div>
  );
};

export default ProjectCard;
