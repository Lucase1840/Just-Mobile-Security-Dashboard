import { type ReactNode } from 'react'

interface LoginLayoutProps {
  children: ReactNode
}

function AuthLayout({ children }: LoginLayoutProps) {
  return <div className='flex h-dvh w-dvw'>{children}</div>
}

export default AuthLayout
