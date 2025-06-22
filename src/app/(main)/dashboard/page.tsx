import { URLS } from '@/lib/constants/urls'
import { fetchData } from '@/lib/utils'
import { ServicesDataSchema } from '@/lib/validation-schemas/services-validation-schemas'

import ServicesTable from './components/service-table/services-table'

async function DashboardPage() {
  const servicesData = await fetchData(URLS.getServices(), ServicesDataSchema, {
    method: 'GET',
    credentials: 'include',
    next: {
      revalidate: 60,
    },
  })

  return (
    <div className='p-4'>
      <div className='space-y-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Services</h2>
          <p className='text-muted-foreground'>
            Monitorea los servicios de evaluación de seguridad
          </p>
        </div>
        <ServicesTable servicesData={servicesData} />
      </div>
    </div>
  )
}

export default DashboardPage
