// *Rule disabled because I need to use the zod schemas and they are not types as
// *the rule infers.
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from 'zod'

import { userDataSchema } from '@/lib/validation-schemas/auth-validation-schemas'

export type UserData = z.infer<typeof userDataSchema>
