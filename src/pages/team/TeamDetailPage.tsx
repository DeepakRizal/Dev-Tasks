import { useState } from "react";

const TeamDetailPage = () => {
  const [showInviteCode, setShowInviteCode] = useState(false);

  // Mock data based on your wireframe
  const team = {
    id: "1",
    name: "Dev Warriors",
    emoji: "🧑‍💻",
    inviteCode: "dvt123",
    members: [
      { id: "1", name: "John", role: "admin" },
      { id: "2", name: "Alice", role: "member" },
    ],
    projects: [
      {
        id: "1",
        name: "DevForge Clone",
        emoji: "🔧",
        description: "A comprehensive development platform clone",
      },
      {
        id: "2",
        name: "Portfolio Redesign",
        emoji: "🌐",
        description: "Modern portfolio website redesign",
      },
    ],
  };

  const currentUser = { id: "1", role: "admin" };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
        </div>

        <div className="bg-gray-900 border border-slate-700 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{team.emoji}</span>
              <div className="flex flex-col space-x-5">
                <h2 className="text-2xl font-bold text-white">
                  Team: {team.name}
                </h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-gray-400">
                    Invite Code:{" "}
                    <span className="text-white font-mono">
                      {team.inviteCode}
                    </span>
                  </span>
                  <span className="text-gray-400">
                    Role:{" "}
                    <span className="text-white capitalize">
                      {currentUser.role}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md border border-slate-600 transition-colors">
              <span>✏️</span>
              <span>Edit Team Name</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailPage;
