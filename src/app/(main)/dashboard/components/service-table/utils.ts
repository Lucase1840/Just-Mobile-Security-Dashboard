import { type BadgeVariant } from '@/components/ui/badge'
import { SEVERITY_LEVELS_LABELS } from '@/lib/constants/services'
import { type Service } from '@/types/services-data-types'

export const getTotalVulnerabilities = (service: Service) => {
  if (!service.severityCount) return 0

  return Object.values(service.severityCount).reduce<number>(
    (sum: number, count: number) => sum + count,
    0,
  )
}

interface GetHighestSeverityReturnType {
  count: number
  level: string
  variant: BadgeVariant
}

export const getHighestSeverity = (service: Service): GetHighestSeverityReturnType => {
  if (!service.severityCount) return { level: 'none', count: 0, variant: null }
  if (service.severityCount.high && service.severityCount.high > 0)
    return {
      level: SEVERITY_LEVELS_LABELS.HIGH,
      count: service.severityCount.high,
      variant: 'outline_red',
    }
  if (service.severityCount.medium && service.severityCount.medium > 0)
    return {
      level: SEVERITY_LEVELS_LABELS.MEDIUM,
      count: service.severityCount.medium,
      variant: 'outline_yellow',
    }
  if (service.severityCount.low && service.severityCount.low > 0)
    return {
      level: SEVERITY_LEVELS_LABELS.LOW,
      count: service.severityCount.low,
      variant: 'outline_green',
    }
  if (service.severityCount.info && service.severityCount.info > 0)
    return {
      level: SEVERITY_LEVELS_LABELS.INFO,
      count: service.severityCount.info,
      variant: 'outline_blue',
    }

  return { level: 'none', count: 0, variant: null }
}
