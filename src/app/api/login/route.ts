import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { userDataSchema } from '@/lib/validation-schemas/auth-validation-schemas'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown
    const userData = userDataSchema.parse(body)

    if (userData.userName === 'admin' && userData.password === 'admin') {
      const cookieStore = cookies()

      cookieStore.set('user-rol', 'admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })

      return NextResponse.json({ message: 'Login successfully' }, { status: 200 })
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Received invalid data from upstream' }, { status: 422 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
