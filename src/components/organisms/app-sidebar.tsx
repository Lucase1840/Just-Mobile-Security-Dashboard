import { Home, Shield } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='p-4'>
        <div className='flex items-center gap-2'>
          <Shield className='h-8 w-8 text-red-600' />
          <div>
            <h1 className='text-lg font-bold'>Just Mobile Security</h1>
            <p className='text-sm text-muted-foreground'>Panel de Pentester</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
