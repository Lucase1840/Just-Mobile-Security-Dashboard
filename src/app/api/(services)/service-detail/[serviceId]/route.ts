import { type NextRequest, NextResponse } from 'next/server'

import { z } from 'zod'

import { type ServicesData, SeverityEnum } from '@/types/services-data-types'

import services from '../../data/mock-data.json'

const filtersSchema = z.object({
  severity: z
    .enum([SeverityEnum.Info, SeverityEnum.Low, SeverityEnum.Medium, SeverityEnum.High])
    .optional(),
  name: z.string().optional(),
})

export function GET(request: NextRequest, { params }: { params: { serviceId: string } }) {
  try {
    const serviceId = params.serviceId
    const servicesData = services as ServicesData
    const service = servicesData.services.find((service) => service.id === Number(serviceId))

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
