'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordInput from '@/components/ui/password-input'

function LoginForm() {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: refactor this logic and take outside component - LE-20-06-2025
    e.preventDefault()

    if (!userName || !password) {
      setError('Por favor, ingrese su email y contraseña')

      return
    }

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
    })

    const data = (await response.json()) as unknown

    if (response.status === 200) {
      setError('')
    }

    if (response.status === 401) {
      setError('Email o contraseña incorrectos')
    }

    // eslint-disable-next-line no-console
    console.log('submit', data)
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
