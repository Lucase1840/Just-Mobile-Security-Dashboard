// *Rule disabled because I need to use the zod schemas and they are not types as
// *the rule infers.
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { type z } from 'zod'

import {
  ServiceSchema,
  ServicesDataSchema,
} from '@/lib/validation-schemas/services-validation-schemas'

export type ServicesData = z.infer<typeof ServicesDataSchema>
export type Service = z.infer<typeof ServiceSchema>
