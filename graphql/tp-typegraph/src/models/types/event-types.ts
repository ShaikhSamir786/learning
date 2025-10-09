export interface EventAttributes {
  id: number;
  title: string;
  description?: string | null;
  date: Date;
  location?: string | null;
  createdBy: number;
  invitedEmails?: string[] | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EventCreationAttributes = Partial<
  Pick<EventAttributes, "id" | "description" | "location" | "invitedEmails" | "createdAt" | "updatedAt">
> &
  Omit<EventAttributes, "id" | "description" | "location" | "invitedEmails" | "createdAt" | "updatedAt">;
