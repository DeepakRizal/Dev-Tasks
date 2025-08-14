import { useNavigate } from "react-router-dom";
import type { Team } from "../../types/team";
import { FolderKanban } from "lucide-react";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { deleteTeam } from "../../store/features/teams/teamThunks";
import type { AppDispatch } from "../../store/store";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  function handleDelete() {
    dispatch(deleteTeam(team.id));
  }

  return (
    <div className="flex items-center justify-between bg-gray-900 border border-slate-700 rounded-lg p-4 transition-colors ">
      <div className="flex items-center space-x-3">
        <span className="text-xl">{team.emoji}</span>
        <span className="text-white font-medium">{team.name}</span>
      </div>

      <div className="flex gap-5">
        <Button
          text="Delete"
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-500"
          size="sm"
        />

        <Button
          text="View Project"
          onClick={() => navigate(`/teams/${team.id}`)}
          variant="neutral"
          icon={<FolderKanban />}
          size="sm"
        />
      </div>
    </div>
  );
};

export default TeamCard;
