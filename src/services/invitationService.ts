import type { Invitation } from "../types/invitation";
import { api } from "./api";
import { v4 as uuid4 } from "uuid";

const invitationService = {
  async createInvitation(invitation: Omit<Invitation, "id">) {
    const res = await api.post("/invitations", {
      ...invitation,
      id: uuid4(),
      createdAt: new Date().toISOString(),
    });
    return res.data;
  },

  async getInvitationsForUser(email: string) {
    const res = await api.get(
      `/invitations?inviteeEmail=${email}&status=pending`
    );
    return res.data as Invitation[];
  },

  async updateInvitationStatus(
    invitationId: string,
    status: "accepted" | "declined"
  ) {
    const res = await api.patch(`/invitations/${invitationId}`, { status });
    return res.data;
  },

  async getAllInvitations() {
    const res = await api.get("/invitations");
    return res.data as Invitation[];
  },
};

export default invitationService;
