import { createSlice } from "@reduxjs/toolkit";
import type { Invitation } from "../../../types/invitation";
import {
  createInvitation,
  fetchUserInvitations,
  respondToInvitation,
} from "./invitationThunks";

interface InvitationState {
  invitations: Invitation[];
  loading: boolean;
  error: string | null;
}

const initialState: InvitationState = {
  invitations: [],
  loading: false,
  error: null,
};

const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInvitations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInvitations.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations = action.payload as Invitation[];
      })
      .addCase(fetchUserInvitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvitation.fulfilled, (state) => {
        state.loading = false;
        // Don't add to current user's invitations since they're the sender
      })
      .addCase(createInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(respondToInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(respondToInvitation.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the invitation from the list after responding
        state.invitations = state.invitations.filter(
          (inv) => inv.id !== action.payload.invitationId
        );
      })
      .addCase(respondToInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default invitationSlice.reducer;
