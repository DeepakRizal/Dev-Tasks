import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const Dashboard = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const teams = useSelector((state: RootState) => state.team.teams);

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
              <div
                key={team.id}
                className="flex items-center justify-between bg-gray-900 border border-slate-700 rounded-lg p-4 hover:bg-gray-800 transition-colors"
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
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700 pt-10">
          <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-lg border border-slate-700 border-dashed transition-colors flex items-center justify-center space-x-2">
            <span className="text-xl">+</span>
            <span>Create New Team</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
