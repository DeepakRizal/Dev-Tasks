import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, X, Check, Users } from "lucide-react";
import type { AppDispatch, RootState } from "../../store/store";

import Button from "../ui/Button";
import {
  fetchUserInvitations,
  respondToInvitation,
} from "../../store/features/invitation/invitationThunks";
import { fetchAllTeams } from "../../store/features/teams/teamThunks";

export interface Invitation {
  id: string;
  teamId: string;
  teamName: string;
  inviterName: string;
  inviteCode: string;
}

const InvitationNotificationBadge = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const invitations = useSelector(
    (state: RootState) => state.invitation.invitations
  ) as Invitation[]; // 👈 cast to Invitation[]

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (currentUser?.email) {
      dispatch(fetchUserInvitations(currentUser.email));

      // Refresh invitations every 30 seconds
      const interval = setInterval(() => {
        dispatch(fetchUserInvitations(currentUser.email));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [dispatch, currentUser?.email]);

  const handleAcceptInvitation = async (invitation: Invitation) => {
    if (!currentUser) return;

    await dispatch(
      respondToInvitation({
        invitationId: invitation.id,
        teamId: invitation.teamId,
        userId: currentUser.id as string,
        response: "accepted",
      })
    );
    await dispatch(fetchAllTeams());

    alert(`Successfully joined ${invitation.teamName}!`);
  };

  const handleDeclineInvitation = async (invitation: Invitation) => {
    if (!currentUser) return;

    await dispatch(
      respondToInvitation({
        invitationId: invitation.id,
        teamId: invitation.teamId,
        userId: currentUser.id as string,
        response: "declined",
      })
    );

    alert(`Declined invitation to ${invitation.teamName}`);
  };

  if (!currentUser) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        {invitations.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {invitations.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-slate-700 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Team Invitations</span>
            </h3>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {invitations.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No pending invitations
              </div>
            ) : (
              invitations.map((invitation: Invitation) => (
                <div
                  key={invitation.id}
                  className="p-4 border-b border-slate-700 last:border-b-0"
                >
                  <div className="mb-3">
                    <p className="text-white font-medium">
                      Join "{invitation.teamName}"
                    </p>
                    <p className="text-sm text-gray-400">
                      Invited by {invitation.inviterName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Code:{" "}
                      <span className="font-mono">{invitation.inviteCode}</span>
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleAcceptInvitation(invitation)}
                      text="Accept"
                      size="sm"
                      variant="primary"
                      className="bg-green-600 hover:bg-green-700 flex-1"
                      icon={<Check className="w-4 h-4" />}
                    />
                    <Button
                      onClick={() => handleDeclineInvitation(invitation)}
                      text="Decline"
                      size="sm"
                      variant="secondary"
                      className="bg-red-600 hover:bg-red-700 flex-1"
                      icon={<X className="w-4 h-4" />}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default InvitationNotificationBadge;
