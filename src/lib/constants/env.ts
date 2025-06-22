'server only'

import { z } from 'zod'

const ENV_VARIABLES = z.object({
  BASE_API_ROUTE: z.string(),
})

const SERVER_ENV_VARIABLES = ENV_VARIABLES.parse(process.env)

export { SERVER_ENV_VARIABLES }
