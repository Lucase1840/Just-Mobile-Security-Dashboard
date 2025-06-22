import { type NextRequest, NextResponse } from 'next/server'

import { z } from 'zod'

import { ServicesSchema } from '@/lib/validation-schemas/services-validation-schemas'

import services from '../../data/mock-data.json'

const filtersSchema = z.object({
  severity: z
    .union([z.literal('high'), z.literal('medium'), z.literal('low'), z.literal('info')])
    .optional(),
  name: z.string().optional(),
})

export async function GET(request: NextRequest, { params }: { params: { serviceId: string } }) {
  try {
    const serviceId = params.serviceId

    const getServicesData = new Promise<unknown>((resolve) =>
      setTimeout(() => resolve(services), 300),
    )

    const servicesData = await getServicesData
    const servicesDataParsed = ServicesSchema.parse(servicesData)
    const service = servicesDataParsed.services.find((service) => service.id === Number(serviceId))

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const searchParams = request.nextUrl.searchParams.entries()
    const filters = Object.fromEntries(searchParams)

    if (!Object.keys(filters).length) {
      return NextResponse.json(service)
    }

    const filtersParsed = filtersSchema.parse(filters)

    if (service.vulnerabilities) {
      if (filtersParsed.severity) {
        service.vulnerabilities = service.vulnerabilities.filter(
          (vulnerability) => vulnerability.severity === filtersParsed.severity,
        )
      }

      if (filtersParsed.name) {
        service.vulnerabilities = service.vulnerabilities.filter((vulnerability) =>
          vulnerability.title
            .toLowerCase()
            .includes(filtersParsed.name ? filtersParsed.name.toLowerCase() : ''),
        )
      }
    }

    return NextResponse.json(service)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid filters' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
