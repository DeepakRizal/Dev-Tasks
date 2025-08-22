import { createAsyncThunk } from "@reduxjs/toolkit";
import invitationService from "../../../services/invitationService";

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
