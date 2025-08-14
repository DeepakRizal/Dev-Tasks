import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import TeamCard from "../../components/teams/TeamCard";
import { Link } from "react-router-dom";

const TeamList = () => {
  const teams = useSelector((state: RootState) => state.team.teams);

  return (
    <div className="px-10 space-y-7 mt-10">
      <Link
        to={"/dashboard"}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
      >
        <span>←</span>
        <span>Back to Dashboard</span>
      </Link>
      <div className="space-y-4">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default TeamList;
