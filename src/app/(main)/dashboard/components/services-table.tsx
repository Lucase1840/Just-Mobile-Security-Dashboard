import { Eye, Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type Service, type ServicesData } from '@/types/services-data-types'

import mockedData from '../../../api/(services)/data/mock-data.json'

function ServicesTable() {
  const filteredServices = mockedData as ServicesData

  const getTotalVulnerabilities = (service: Service) => {
    if (!service.severityCount) return 0

    return Object.values(service.severityCount).reduce<number>(
      (sum: number, count: number) => sum + count,
      0,
    )
  }

  const getHighestSeverity = (service: Service) => {
    if (!service.severityCount) return { level: 'none', count: 0 }
    if (service.severityCount.high && service.severityCount.high > 0)
      return { level: 'high', count: service.severityCount.high }
    if (service.severityCount.medium && service.severityCount.medium > 0)
      return { level: 'medium', count: service.severityCount.medium }
    if (service.severityCount.low && service.severityCount.low > 0)
      return { level: 'low', count: service.severityCount.low }
    if (service.severityCount.info && service.severityCount.info > 0)
      return { level: 'info', count: service.severityCount.info }

    return { level: 'none', count: 0 }
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Application</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Vulnerabilities</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices.services.map((service) => {
            const totalVulns = getTotalVulnerabilities(service)
            const highestSeverity = getHighestSeverity(service)

            return (
              <TableRow className='cursor-pointer hover:bg-muted/50' key={service.id}>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='font-medium'>
                      {service.summary?.name || service.scans[0]?.app?.name}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {service.summary?.description || service.scans[0]?.app?.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Shield className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>{service.services.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>{service.platform}</div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {service.scans[0]?.scan_status || service.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='text-sm'>{service.summary?.duration.human || '-'}</div>
                  <div className='text-xs text-muted-foreground'>
                    {new Date(service.created_at).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='space-y-1'>
                    <div className='text-sm font-medium'>{totalVulns} total</div>
                    {highestSeverity.count} {highestSeverity.level}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    className='flex items-center gap-2'
                    disabled={Boolean(!service.summary)}
                    size='sm'
                    variant='ghost'
                  >
                    <Eye className='h-4 w-4' />
                    View Details
                  </Button>
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
