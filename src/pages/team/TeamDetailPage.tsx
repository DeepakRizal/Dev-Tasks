import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import ProjectCard from "../../components/project/ProjectCard";
import { ArchiveRestore, Plus, SquarePen, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import AddProjectModal from "../../components/modals/AddProjectModal";
import Button from "../../components/ui/Button";
import { getAllProjectsOfATeam } from "../../store/features/project/projectThunks";
import ArchiveModal from "../../components/modals/ArchiveModal";
import {
  fetchAllTeams,
  leaveTeam,
} from "../../store/features/teams/teamThunks";
import ModalFormWrapper from "../../utils/common/ModalFormWrapper";
import { can } from "../../utils/permission";

const TeamDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.project.projects);
  const teams = useSelector((state: RootState) => state.team.teams);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const { teamId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  const team = teams.find((team) => team.id === teamId);

  useEffect(() => {
    dispatch(fetchAllTeams());
    dispatch(getAllProjectsOfATeam(teamId as string));
  }, [dispatch, teamId]);

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

  function handleSeeArchives() {
    setIsArchiveOpen(true);
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

            <div className="flex items-center gap-5">
              <Button
                text="See Archives"
                size="sm"
                variant="primary"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold"
                icon={<ArchiveRestore size={15} />}
                onClick={handleSeeArchives}
              />

              {/* Edit Team Name button - only shown to team owner */}
              {currentUser?.id && can.deleteTeam(team, currentUser.id) && (
                <Button
                  text="Edit Team Name"
                  icon={<SquarePen size={15} />}
                  size="sm"
                  variant="neutral"
                  onClick={handleEditName}
                />
              )}

              {/* Leave Team button - shown only to team members who joined (not owners) */}
              {currentUser?.id && can.leaveTeam(team, currentUser.id) && (
                <Button
                  icon={<LogOut size={15} />}
                  text="Leave Team"
                  onClick={() => setIsLeaveOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600"
                  size="sm"
                />
              )}
            </div>
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
            {projects.length > 0 &&
              projects.map((project) => {
                if (!project.archived) {
                  return (
                    <ProjectCard
                      project={project}
                      key={project.id}
                      projectId={project.id}
                    />
                  );
                }
              })}
            {projects.length === 0 && (
              <p className="text-center text-2xl font-bold">
                No Projects to show for this team
              </p>
            )}
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
      {isArchiveOpen && (
        <ArchiveModal isOpen={isArchiveOpen} setIsOpen={setIsArchiveOpen} />
      )}

      {isOpen && (
        <AddProjectModal
          teamId={team?.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      {isLeaveOpen && (
        <ModalFormWrapper
          isOpen={isLeaveOpen}
          title={`Leave Team "${team.name}"`}
        >
          <div className="px-5 py-3">
            <p className="text-gray-300 mb-4">
              Are you sure you want to leave this team? You will no longer have
              access to this team's projects.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                text="Cancel"
                variant="neutral"
                onClick={() => setIsLeaveOpen(false)}
                size="sm"
              />
              <Button
                text="Leave Team"
                variant="primary"
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  if (currentUser?.id) {
                    dispatch(
                      leaveTeam({ teamId: team.id, userId: currentUser.id })
                    );
                  }
                  setIsLeaveOpen(false);
                }}
                size="sm"
              />
            </div>
          </div>
        </ModalFormWrapper>
      )}
    </div>
  );
};

export default TeamDetailPage;
