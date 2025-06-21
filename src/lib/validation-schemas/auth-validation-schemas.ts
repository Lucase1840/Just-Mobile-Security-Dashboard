import { z } from 'zod'

export const userDataSchema = z.object({
  userName: z.string(),
  password: z.string(),
})
