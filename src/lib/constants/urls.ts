import { ENV_VARIABLES } from './env'

export const URLS = {
  getServices: () => `${ENV_VARIABLES.BASE_API_ROUTE}/api/services`,
  getServiceDetail: (params: { serviceId: string; filters: string }) =>
    `${ENV_VARIABLES.BASE_API_ROUTE}/api/service-detail/${params.serviceId}?${params.filters}`,
}
