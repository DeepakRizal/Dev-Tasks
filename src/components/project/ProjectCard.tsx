import { Link, useParams } from "react-router-dom";
import type { User } from "../../types/auth";
import type { Project } from "../../types/team";

interface ProjectProps {
  project: Project;
  currentUser: User | null;
  projectId: string;
}

const ProjectCard = ({ project, currentUser, projectId }: ProjectProps) => {
  const { teamId } = useParams();
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
        <Link
          to={`/teams/${teamId}/project/${projectId}`}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <span>📂</span>
          <span>View Board</span>
        </Link>
        {currentUser?.role === "admin" && (
          <>
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors">
              <span>✏️</span>
              <span>Edit</span>
            </button>
            <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors">
              <span>🗑️</span>
              <span>Delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
