import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string(),
  country: z.string().min(1),
});
