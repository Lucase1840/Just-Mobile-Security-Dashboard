import { ENV_VARIABLES } from '@/lib/constants/env'
import { type UserData } from '@/types/auth-types'

export const loginService = async (values: UserData) =>
  fetch(`${ENV_VARIABLES.BASE_API_ROUTE}/api/login`, {
    method: 'POST',
    body: JSON.stringify(values),
  })
