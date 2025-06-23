import { ENV_VARIABLES } from './env'

export const URLS = {
  getServices: () => `${ENV_VARIABLES.NEXT_PUBLIC_BASE_API_ROUTE}/api/services`,
  getServiceDetail: (params: { serviceId: string; filters: string }) =>
    `${ENV_VARIABLES.NEXT_PUBLIC_BASE_API_ROUTE}/api/service-detail/${params.serviceId}?${params.filters}`,
  login: () => `${ENV_VARIABLES.NEXT_PUBLIC_BASE_API_ROUTE}/api/login`,
}
