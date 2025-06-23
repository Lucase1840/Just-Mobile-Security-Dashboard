import { z } from 'zod'

const EnvSchema = z.object({
  BASE_API_ROUTE: z.string(),
  MOCK_API_DELAY: z.string().optional(),
})

const ENV_VARIABLES = EnvSchema.parse(process.env)

export { ENV_VARIABLES }
