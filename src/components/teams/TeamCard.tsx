import { useNavigate } from "react-router-dom";
import type { Team } from "../../types/team";
import { FolderKanban, SquarePen, Trash, Users } from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";
import DeleteModal from "../modals/DeleteModal";
import AddTeamModal from "../modals/AddTeamModal";
import { useRole } from "../../hooks/useRole";
import { can } from "../../utils/permission";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { deleteTeam } from "../../store/features/teams/teamThunks";
import InviteModal from "../modals/InviteModal";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const navigate = useNavigate();
  const role = useRole();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-gray-900 border border-slate-700 rounded-lg p-4 transition-colors ">
      <div className="flex items-center space-x-3">
        <span className="text-xl">{team.emoji}</span>
        <span className="text-white font-medium">{team.name}</span>
      </div>

      <div className="flex gap-5">
        {role && can.manageTeams(role) && (
          <>
            <Button
              icon={<Trash size={15} />}
              text="Delete"
              onClick={() => setIsDeleteOpen(true)}
              className="bg-red-500 hover:bg-red-500"
              size="sm"
            />

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
    </div>
  );
};

export default TeamCard;
