// import { type ServicesData } from '@/types/services-data-types'

import ServicesTable from './components/services-table'

function DashboardPage() {
  // const services = await fetch('http://localhost:3000/api/services', {
  //   method: 'GET',
  //   credentials: 'include',
  //   next: {
  //     revalidate: 60,
  //   },
  // })

  // const servicesData = (await services.json()) as ServicesData

  // console.log(servicesData)

  return (
    <div className='p-4'>
      <div className='space-y-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Services</h2>
          <p className='text-muted-foreground'>
            Monitorea los servicios de evaluación de seguridad
          </p>
        </div>
        <ServicesTable />
      </div>
    </div>
  )
}

export default DashboardPage
