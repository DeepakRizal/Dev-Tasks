import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import ProjectCard from "../../components/project/ProjectCard";
import { Plus, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import AddProjectModal from "../../components/modals/AddProjectModal";
import Button from "../../components/ui/Button";
import { fetchAllTeams } from "../../store/features/teams/teamThunks";

const TeamDetailPage = () => {
  const projects = useSelector((state: RootState) => state.project.projects);
  const teams = useSelector((state: RootState) => state.team.teams);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const { teamId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const team = teams.find((team) => team.id === teamId);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllTeams());
  }, [dispatch]);

  if (!team) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Team not found.</h2>
          <Link
            to="/dashboard"
            className="text-green-500 underline mt-4 inline-block"
          >
            Go back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  function handleEditName() {}

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            to={"/dashboard"}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>

          <Button
            variant="primary"
            text="create project"
            onClick={handleClick}
            icon={<Plus className="w-5 h-5" />}
          />
        </div>

        <div className="bg-gray-900 border border-slate-700 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{team?.emoji}</span>
              <div className="flex flex-col space-x-5">
                <h2 className="text-2xl font-bold text-white">
                  Team: {team?.name}
                </h2>
                <div className="flex items-center space-x-4 mt-2">
                  {/* <span className="text-gray-400">
                    Invite Code:{" "}
                    <span className="text-white font-mono">
                      {team?.inviteCode}
                    </span>
                  </span> */}
                  <span className="text-gray-400">
                    Role:{" "}
                    <span className="text-white capitalize">
                      {currentUser?.role}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <Button
              text="Edit Team Name"
              icon={<SquarePen />}
              size="md"
              variant="neutral"
              onClick={handleEditName}
            />
          </div>
        </div>

        {/* <div className="bg-gray-900 border border-slate-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <span>👥</span>
            <span>Members:</span>
          </h2>

          <div className="space-y-3">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between bg-gray-800 border border-slate-600 rounded-lg p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {member.name[0]}
                    </span>
                  </div>
                  <span className="text-white font-medium">
                    {member.name} ({member.role})
                  </span>
                </div>
                {currentUser.role === "admin" &&
                  member.id !== currentUser.id && (
                    <div className="flex items-center space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Promote
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Remove
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div> */}

        <div className=" bg-gray-900 border border-slate-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <span>📁</span>
            <span>Projects:</span>
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <ProjectCard
                project={project}
                currentUser={currentUser}
                key={project.id}
                projectId={project.id}
              />
            ))}
          </div>
        </div>

        <Button
          variant="neutral"
          onClick={handleClick}
          text="Create New Project"
          fullWidth
          size="lg"
          className=" mb-5"
          icon={<Plus className="w-5 h-5" />}
        />
      </div>

      {isOpen && (
        <AddProjectModal
          teamId={team?.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default TeamDetailPage;
