export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  verified: boolean;
  otp?: string | null;
  otpExpiry?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Partial<
  Pick<
    UserAttributes,
    "id" | "otp" | "otpExpiry" | "createdAt" | "updatedAt" | "isActive" | "verified"
  >
> &
  Omit<UserAttributes, "id" | "otp" | "otpExpiry" | "createdAt" | "updatedAt" | "isActive" | "verified">;
