import { type ReactNode } from 'react'

interface LoginLayoutProps {
  children: ReactNode
}

function AuthLayout({ children }: LoginLayoutProps) {
  return <main className='flex h-dvh w-dvw'>{children}</main>
}

export default AuthLayout
