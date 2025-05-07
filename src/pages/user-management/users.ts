import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().nonempty('Name is required'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores and hyphens'
    ),
  email: z.string().email('Must be a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  mobileNumber: z.string().regex(/^\+?[0-9]{10,15}$/, 'Enter a valid mobile number'),
});

export type UserFormValues = z.infer<typeof userSchema>;

export type User = UserFormValues & {
  id: string;
  createdAt: string;
};
