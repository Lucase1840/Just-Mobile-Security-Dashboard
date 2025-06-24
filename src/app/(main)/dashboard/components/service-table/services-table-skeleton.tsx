import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function ServicesTableSkeleton() {
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
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className='space-y-1'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-3 w-48' />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-24' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-16' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 w-20' />
              </TableCell>
              <TableCell>
                <div className='space-y-1'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-3 w-24' />
                </div>
              </TableCell>
              <TableCell>
                <div className='space-y-1'>
                  <Skeleton className='h-4 w-12' />
                  <Skeleton className='h-5 w-16' />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className='h-8 w-20' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ServicesTableSkeleton
