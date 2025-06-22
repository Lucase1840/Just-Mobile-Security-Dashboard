import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PLATFORMS, SERVICE_STATUS } from '@/lib/constants/services'
import { formatDateTime, getStatusVariant } from '@/lib/utils'
import { type ServicesData } from '@/types/services-data-types'

import ViewDetailButton from '../ui/view-detail-button'

import { getHighestSeverity, getTotalVulnerabilities } from './utils'

function ServicesTable({ servicesData }: { servicesData: ServicesData }) {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aplicación</TableHead>
            <TableHead>Tipo de servicio</TableHead>
            <TableHead>Plataforma</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Duración</TableHead>
            <TableHead>Vulnerabilidades</TableHead>
            <TableHead>Ver más</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicesData.map((service) => {
            const totalVulnerabilities = getTotalVulnerabilities(service)
            const highestSeverity = getHighestSeverity(service)

            return (
              <TableRow className='hover:bg-muted/50' key={service.id}>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='font-medium'>{service.summary?.name || '-'}</div>
                    <div className='text-sm text-muted-foreground'>
                      {service.summary?.description || '-'}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm'>{service.services.name || '-'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>{PLATFORMS[service.platform]}</div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Badge
                      className='text-sm'
                      variant={getStatusVariant(
                        SERVICE_STATUS[service.status as keyof typeof SERVICE_STATUS].toLowerCase(),
                      )}
                    >
                      {SERVICE_STATUS[service.status as keyof typeof SERVICE_STATUS]}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='text-sm'>{service.summary?.duration.human || '-'}</div>
                  <div className='text-xs text-muted-foreground'>
                    Inicio: {formatDateTime(service.created_at)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='text-sm font-medium'>{totalVulnerabilities} total</div>
                    {highestSeverity.variant ? (
                      <Badge variant={highestSeverity.variant}>
                        {highestSeverity.count
                          ? `${highestSeverity.count.toString()} ${highestSeverity.level}`
                          : '-'}
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <ViewDetailButton
                    disabled={Boolean(!service.summary)}
                    id={service.id.toString()}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ServicesTable
