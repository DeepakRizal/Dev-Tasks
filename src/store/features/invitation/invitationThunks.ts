import { createAsyncThunk } from "@reduxjs/toolkit";
import invitationService from "../../../services/invitationService";
import teamService from "../../../services/teamService";

export const fetchUserInvitations = createAsyncThunk(
  "invitations/fetchUserInvitations",
  async (userEmail: string, thunkApi) => {
    try {
      const invitations = await invitationService.getInvitationsForUser(
        userEmail
      );

      return invitations;
    } catch (error) {
      let message = "Something went wrong!";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      thunkApi.rejectWithValue(message);
    }
  }
);

export const createInvitation = createAsyncThunk(
  "invitations/createInvitation",
  async (
    data: {
      teamId: string;
      teamName: string;
      inviterName: string;
      inviterEmail: string;
      inviteeEmail: string;
      inviteCode: string;
    },
    thunkApi
  ) => {
    try {
      const invitation = invitationService.createInvitation(data);

      return invitation;
    } catch (error) {
      let message = "Something went wrong!";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      thunkApi.rejectWithValue(message);
    }
  }
);

export const respondToInvitation = createAsyncThunk(
  "invitations/respondToInvitation",
  async (
    data: {
      invitationId: string;
      teamId: string;
      userId: string;
      response: "accepted" | "declined";
    },
    thunkApi
  ) => {
    try {
      // Update invitation status
      await invitationService.updateInvitationStatus(
        data.invitationId,
        data.response
      );

      // If accepted, add user to team
      if (data.response === "accepted") {
        const team = await teamService.getAllTeams();
        const targetTeam = team.find((t) => t.id === data.teamId);

        if (targetTeam && !targetTeam.members.includes(data.userId)) {
          const updatedMembers = [...targetTeam.members, data.userId];
          await teamService.updateTeam(
            { members: updatedMembers },
            data.teamId
          );
        }
      }

      return { invitationId: data.invitationId, response: data.response };
    } catch (error) {
      let message = "Something went wrong";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);
