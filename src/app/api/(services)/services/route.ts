import { NextResponse } from 'next/server'

import { type ServicesData } from '@/types/services-data-types'

import services from '../data/mock-data.json'

export async function GET() {
  try {
    const servicesData = new Promise<ServicesData>((resolve) =>
      setTimeout(() => resolve(services as ServicesData), 3000),
    )

    const data = await servicesData

    return NextResponse.json(data.services)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
