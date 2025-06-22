import { type Service } from '@/types/services-data-types'

export const getTotalVulnerabilities = (service: Service) => {
  if (!service.severityCount) return 0

  return Object.values(service.severityCount).reduce<number>(
    (sum: number, count: number) => sum + count,
    0,
  )
}

export const getHighestSeverity = (service: Service) => {
  if (!service.severityCount) return { level: 'none', count: 0 }
  if (service.severityCount.high && service.severityCount.high > 0)
    return { level: 'high', count: service.severityCount.high }
  if (service.severityCount.medium && service.severityCount.medium > 0)
    return { level: 'medium', count: service.severityCount.medium }
  if (service.severityCount.low && service.severityCount.low > 0)
    return { level: 'low', count: service.severityCount.low }
  if (service.severityCount.info && service.severityCount.info > 0)
    return { level: 'info', count: service.severityCount.info }

  return { level: 'none', count: 0 }
}
