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

  const initialVulnerabilityId = searchParams.vulnerability
  const initialEvidenceId = searchParams.evidence

  let filters = ''

  // *Only include name and severity in the API filters
  // const apiFilters = {
  //   name: searchParams.name,
  //   severity: searchParams.severity,
  // }

  const parsedApiFilters = serviceDetailFiltersSchema.safeParse(searchParams)

  const urlParams: Record<string, string> = {}

  if (parsedApiFilters.success) {
    if (parsedApiFilters.data.name !== undefined) urlParams.name = parsedApiFilters.data.name
    if (parsedApiFilters.data.severity !== undefined)
      urlParams.severity = parsedApiFilters.data.severity
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
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='text-red-500 text-center'>No se encontró el servicio</div>
      <p className='text-red-500 text-center'>{servicesData.message}</p>
    </div>
  )
}

export default ServiceDetailPage
