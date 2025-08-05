import { useNavigate } from "react-router-dom";
import type { Team } from "../../types/team";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/teams/${team.id}`)}
      className="flex items-center justify-between bg-gray-900 border border-slate-700 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl">{team.emoji}</span>
        <span className="text-white font-medium">{team.name}</span>
      </div>

      <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md border border-slate-600 transition-colors">
        <span>📁</span>
        <span>View Projects</span>
      </button>
    </div>
  );
};

export default TeamCard;
