import { Copy, Mail, Users, X } from "lucide-react";
import Button from "../ui/Button";
import type { AppDispatch } from "../../store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  generateInviteCode,
  sendInvitation,
} from "../../store/features/teams/teamThunks";

interface InviteModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  team: {
    id: string;
    name: string;
    inviteCode?: string;
  };
  currentUserName: string;
}

const InviteModal = ({
  isOpen,
  setIsOpen,
  team,
  currentUserName,
}: InviteModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = async () => {
    await dispatch(generateInviteCode(team.id));
    setShowInviteCode(true);
  };

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await dispatch(
        sendInvitation({
          teamId: team.id,
          email: email.trim(),
          inviterName: currentUserName,
        })
      );
      alert(`Invitation sent to ${email}!`);
      setEmail("");
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to send invitation: ${error.message}`);
      } else {
        alert("Failed to send invitation due to an unknown error");
      }
    }
  };

  const copyInviteCode = async () => {
    if (team.inviteCode) {
      await navigator.clipboard.writeText(team.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-slate-700 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-white">
              Invite to {team.name}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 cursor-pointer h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Send Email Invitation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Send Email Invitation</span>
            </h3>
            <form onSubmit={handleSendInvitation} className="space-y-3">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                required
              />
              <Button
                type="submit"
                text="Send Invitation"
                variant="primary"
                size="sm"
                fullWidth
                icon={<Mail className="w-4 h-4" />}
              />
            </form>
          </div>

          {/* Divider */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-slate-600"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-slate-600"></div>
          </div>

          {/* Invite Code */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Share Invite Code
            </h3>

            {!showInviteCode && !team.inviteCode ? (
              <Button
                text="Generate Invite Code"
                variant="neutral"
                size="sm"
                fullWidth
                onClick={handleGenerateCode}
              />
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={team.inviteCode || ""}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-800 border border-slate-600 rounded-lg text-white font-mono text-sm"
                  />
                  <Button
                    onClick={copyInviteCode}
                    variant="neutral"
                    size="sm"
                    icon={<Copy className="w-4 h-4" />}
                    text={copied ? "Copied!" : "Copy"}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  Share this code with team members so they can join the team.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <Button
            text="Close"
            variant="secondary"
            size="sm"
            fullWidth
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
