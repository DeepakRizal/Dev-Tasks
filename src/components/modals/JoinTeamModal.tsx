import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Users } from "lucide-react";
import type { AppDispatch, RootState } from "../../store/store";
import { joinTeamByInviteCode } from "../../store/features/teams/teamThunks";
import Button from "../ui/Button";

interface JoinTeamModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const JoinTeamModal = ({ isOpen, setIsOpen }: JoinTeamModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim() || !currentUser) return;

    setError("");

    try {
      await dispatch(
        joinTeamByInviteCode({
          inviteCode: inviteCode.trim(),
          userId: currentUser.id as string,
        })
      ).unwrap();

      alert("Successfully joined the team!");
      setIsOpen(false);
      setInviteCode("");
    } catch (error) {
      setError(error as string);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-slate-700 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-bold text-white">Join Team</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleJoinTeam} className="space-y-4">
          <div>
            <label
              htmlFor="inviteCode"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Invite Code
            </label>
            <input
              id="inviteCode"
              type="text"
              placeholder="Enter invite code (e.g., ABC123-4567)"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 font-mono"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 border border-red-900/50 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              type="button"
              text="Cancel"
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => setIsOpen(false)}
            />
            <Button
              type="submit"
              text="Join Team"
              variant="primary"
              size="sm"
              fullWidth
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinTeamModal;
