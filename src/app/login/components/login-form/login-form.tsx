'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordInput from '@/components/ui/password-input'
import { loginService } from '@/services/services'

export function LoginForm() {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userName || !password) {
      setError('Por favor, ingrese su email y contraseña')

      return
    }

    try {
      const response = await loginService({ userName, password })

      if (response.ok) {
        router.push('/dashboard')
      }

      if (response.status === 401) {
        toast.error('Usuario o contraseña incorrectos')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <form
      className='space-y-4 flex flex-col justify-center mt-4'
      onSubmit={(e) => void handleSubmit(e)}
    >
      <Label htmlFor='email'>Usuario</Label>
      <Input
        className='p-4'
        id='email'
        name='email'
        onChange={(e) => setUserName(e.target.value)}
        placeholder='Ingrese su email'
        type='text'
      />
      <Label htmlFor='password'>Contraseña</Label>
      <PasswordInput
        id='password'
        name='password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Ingrese su contraseña'
        showPasswordIcon
      />
      <Button type='submit'>Ingresar</Button>

      {error ? <p className='text-red-500'>{error}</p> : null}
    </form>
  )
}

export default LoginForm
