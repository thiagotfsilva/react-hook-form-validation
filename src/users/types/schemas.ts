import { z } from 'zod'
import { patterns } from "../../constants.ts"

export const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .refine((text) => patterns.email.test(text), {
      message: 'Email not valid',
    }),
  states: z.array(z.string()).min(1).max(2),
});

export type UserSchema = z.infer<typeof schema>;

export const defaultValues: UserSchema = {
  email: '',
  name: '',
  states: [],
}
