import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AppSidebar } from '@/components/organisms/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

function MainLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const userRol = cookieStore.get('user-rol')

  if (!userRol) {
    redirect('/login')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='flex flex-col w-full'>
        <div>
          <div className='flex items-center gap-2 p-2'>
            <SidebarTrigger className='self-start' />
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
              <p className='text-muted-foreground'>Resultados de análisis</p>
            </div>
          </div>
        </div>

        <main className='w-full'>{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default MainLayout
