import { SERVER_ENV_VARIABLES } from './env'

export const URLS = {
  getServices: () => `${SERVER_ENV_VARIABLES.BASE_API_ROUTE}/api/services`,
  getServiceDetail: (params: { serviceId: string; filters: string }) =>
    `${SERVER_ENV_VARIABLES.BASE_API_ROUTE}/api/service-detail/${params.serviceId}?${params.filters}`,
}
