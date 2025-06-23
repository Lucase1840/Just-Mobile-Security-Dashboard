import { redirect } from 'next/navigation'

import { URLS } from '@/lib/constants/urls'
import { fetchData } from '@/lib/utils'
import {
  serviceDetailFiltersSchema,
  ServiceSchema,
} from '@/lib/validation-schemas/services-validation-schemas'

import ServiceDetailContainer from './components/service-detail-container'

export const dynamic = 'force-dynamic'

async function ServiceDetailPage({
  params,
  searchParams,
}: {
  params: { serviceId: string }
  searchParams: { name?: string; severity?: string; vulnerability?: string; evidence?: string }
}) {
  if (!params.serviceId) {
    redirect('/dashboard')
  }

  // Extract vulnerability and evidence for initial render
  const initialVulnerabilityId = searchParams.vulnerability
  const initialEvidenceId = searchParams.evidence

  let filters = ''

  // Only include name and severity in the API filters
  const apiFilters = {
    name: searchParams.name,
    severity: searchParams.severity,
  }

  const parsedFilters = serviceDetailFiltersSchema.safeParse(apiFilters)

  // Filter out undefined values and create URLSearchParams
  const urlParams: Record<string, string> = {}

  if (parsedFilters.success) {
    if (parsedFilters.data.name !== undefined) urlParams.name = parsedFilters.data.name
    if (parsedFilters.data.severity !== undefined) urlParams.severity = parsedFilters.data.severity
  }

  if (Object.keys(urlParams).length > 0) {
    filters = new URLSearchParams(urlParams).toString()
  }

  const servicesData = await fetchData(
    URLS.getServiceDetail({ serviceId: params.serviceId, filters }),
    ServiceSchema,
    {
      method: 'GET',
      credentials: 'include',
    },
  )

  return servicesData.data ? (
    <ServiceDetailContainer
      initialEvidenceId={initialEvidenceId}
      initialVulnerabilityId={initialVulnerabilityId}
      service={servicesData.data}
    />
  ) : (
    <div>No se encontró el servicio</div>
  )
}

export default ServiceDetailPage
