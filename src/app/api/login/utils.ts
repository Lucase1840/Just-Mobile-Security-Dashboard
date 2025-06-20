import { z } from 'zod'

const userDataSchema = z.object({
  userName: z.string().email(),
  password: z.string(),
})

export type UserData = z.infer<typeof userDataSchema>

export const validateUserData = (data: unknown): UserData => {
  return userDataSchema.parse(data)
}
