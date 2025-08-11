import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState } from "react";
import AddTeamModal from "../../components/modals/AddTeamModal";
import TeamCard from "../../components/teams/TeamCard";
import CreateButton from "../../components/ui/CreateButtons";

const Dashboard = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const teams = useSelector((state: RootState) => state.team.teams);
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  const myTeams = teams.filter((team) =>
    team.members.includes(currentUser?.id || "")
  );

  return (
    <div className="min-h-screen  bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="border-b border-slate-700 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-white">
            Welcome, {currentUser?.name} ({currentUser?.role})
          </h1>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-4">
            Your Teams
          </h2>
          <div className="space-y-3">
            {myTeams.map((team) => (
              <TeamCard team={team} key={team.id} />
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700 pt-10">
          <CreateButton
            variant="secondary"
            onClick={handleClick}
            text="Create New Team"
            fullWidth
          />
        </div>
      </div>
      {isOpen && <AddTeamModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Dashboard;
