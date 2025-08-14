import { useNavigate } from "react-router-dom";
import type { Team } from "../../types/team";
import { FolderKanban, SquarePen, Trash } from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";
import DeleteModal from "../modals/DeleteModal";
import AddTeamModal from "../modals/AddTeamModal"; // Import the modal
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const navigate = useNavigate();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // Add state for edit modal

  return (
    <div className="flex items-center justify-between bg-gray-900 border border-slate-700 rounded-lg p-4 transition-colors ">
      <div className="flex items-center space-x-3">
        <span className="text-xl">{team.emoji}</span>
        <span className="text-white font-medium">{team.name}</span>
      </div>

      <div className="flex gap-5">
        {currentUser?.role === "admin" && (
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
              onClick={() => setIsEditOpen(true)} // Open edit modal
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
          id={team.id}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
        />
      )}

      {/* Add the edit modal */}
      {isEditOpen && (
        <AddTeamModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          team={team} // Pass the team to be edited
          isEditMode={true} // Add this prop to indicate edit mode
        />
      )}
    </div>
  );
};

export default TeamCard;
