import { SERVER_ENV_VARIABLES } from './env'

export const URLS = {
  getServices: () => `${SERVER_ENV_VARIABLES.BASE_API_ROUTE}/api/services`,
}
