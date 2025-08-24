import { useNavigate } from "react-router-dom";
import type { Team } from "../../types/team";
import { FolderKanban, SquarePen, Trash, Users, LogOut } from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";
import DeleteModal from "../modals/DeleteModal";
import AddTeamModal from "../modals/AddTeamModal";
import { can } from "../../utils/permission";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { deleteTeam, leaveTeam } from "../../store/features/teams/teamThunks";
import InviteModal from "../modals/InviteModal";
import ModalFormWrapper from "../../utils/common/ModalFormWrapper";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-gray-900 border border-slate-700 rounded-lg p-4 transition-colors ">
      <div className="flex items-center space-x-3">
        <span className="text-xl">{team.emoji}</span>
        <span className="text-white font-medium">{team.name}</span>
      </div>

      <div className="flex gap-5">
        {/* Delete Team button - only shown to team owner */}
        {currentUser?.id && can.deleteTeam(team, currentUser.id) && (
          <Button
            icon={<Trash size={15} />}
            text="Delete"
            onClick={() => setIsDeleteOpen(true)}
            className="bg-red-500 hover:bg-red-500"
            size="sm"
          />
        )}

        {/* Update and Invite buttons - only shown to team owners */}
        {currentUser?.id && can.deleteTeam(team, currentUser.id) && (
          <>
            <Button
              text="Update"
              variant="secondary"
              size="sm"
              icon={<SquarePen size={15} />}
              onClick={() => setIsEditOpen(true)}
            />
            <Button
              icon={<Users size={15} />}
              text="Invite"
              onClick={() => setIsInviteOpen(true)}
              variant="primary"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600"
            />
          </>
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

        <Button
          text="View Project"
          onClick={() => navigate(`/teams/${team.id}`)}
          variant="neutral"
          icon={<FolderKanban />}
          size="sm"
        />
      </div>

      {isDeleteOpen && (
        <DeleteModal
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          onConfirm={() => dispatch(deleteTeam(team.id))}
        />
      )}

      {/* Add the edit modal */}
      {isEditOpen && (
        <AddTeamModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          team={team}
          isEditMode={true}
        />
      )}

      {isInviteOpen && (
        <InviteModal
          isOpen={isInviteOpen}
          setIsOpen={setIsInviteOpen}
          team={team}
          currentUserName={currentUser?.name || ""}
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

export default TeamCard;
