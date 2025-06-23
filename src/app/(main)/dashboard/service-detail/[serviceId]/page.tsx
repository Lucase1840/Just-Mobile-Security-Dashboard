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
  searchParams: { name?: string; severity?: string; vulnerability?: string }
}) {
  if (!params.serviceId) {
    redirect('/dashboard')
  }

  let filters = ''

  const parsedFilters = serviceDetailFiltersSchema.safeParse(searchParams)

  if (parsedFilters.success) {
    filters = new URLSearchParams(parsedFilters.data).toString()
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
    <ServiceDetailContainer service={servicesData.data} />
  ) : (
    <div>No se encontró el servicio</div>
  )
}

export default ServiceDetailPage
