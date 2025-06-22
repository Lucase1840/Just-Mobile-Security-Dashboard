import { NextResponse } from 'next/server'

import { ZodError } from 'zod'

import { ServicesSchema } from '@/lib/validation-schemas/services-validation-schemas'

import services from '../data/mock-data.json'

export async function GET() {
  try {
    const getServicesData = new Promise<unknown>((resolve) =>
      setTimeout(() => resolve(services), 300),
    )

    const data = await getServicesData

    const servicesData = ServicesSchema.parse(data)

    return NextResponse.json(servicesData.services)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Received invalid data from upstream' }, { status: 422 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
