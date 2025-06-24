'use client'

import { Clock, FileText, Package } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SUMMARY_STATUS } from '@/lib/constants/services'
import { formatDateTime, getSummaryStatusVariant } from '@/lib/utils'
import { type Service } from '@/types/services-data-types'

import SeverityChart from './severity-chart'

function ServiceDetail({ service }: { service: Service }) {
  const { summary, scans, severityDistribution, severityCount } = service

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-lg font-bold'>
            Resumen de la evaluación de {summary?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 flex justify-between'>
          <div className='flex flex-col mt-4'>
            <p className='text-lg font-bold text-muted-foreground'>Vulnerabilidades encontradas:</p>
            {severityDistribution && severityCount ? (
              <SeverityChart
                severityCount={severityCount}
                severityDistribution={severityDistribution}
              />
            ) : (
              <p className='text-lg font-bold text-muted-foreground'>
                No se encontraron vulnerabilidades
              </p>
            )}
          </div>
          <div className='flex flex-col gap-4 space-y-0'>
            <p className='text-lg font-bold text-muted-foreground'>Informacion general:</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                  <Package className='h-4 w-4' />
                  Detalles de la aplicación
                </div>
                <div className='space-y-2 text-sm text-muted-foreground'>
                  <p>
                    <strong>Nombre:</strong> {summary?.name}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {summary?.description}
                  </p>
                  <p>
                    <strong>Plataforma:</strong> {summary?.platform}
                  </p>
                  <p>
                    <strong>Versión:</strong> {summary?.version || 'N/A'}
                  </p>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                  <Clock className='h-4 w-4' />
                  Cronología de la evaluación
                </div>
                <div className='space-y-2 text-sm text-muted-foreground'>
                  <p>
                    <strong>Inicio</strong> {formatDateTime(summary?.createdAt || '')}
                  </p>
                  <p>
                    <strong>Finalización:</strong> {formatDateTime(summary?.finishedAt || '')}
                  </p>
                  <p>
                    <strong>Duración:</strong> {summary?.duration.human || '-'}
                  </p>
                  <span>
                    <strong>Estado:</strong>{' '}
                    <Badge
                      variant={getSummaryStatusVariant(
                        SUMMARY_STATUS[
                          summary?.status as keyof typeof SUMMARY_STATUS
                        ].toLowerCase(),
                      )}
                    >
                      {SUMMARY_STATUS[summary?.status as keyof typeof SUMMARY_STATUS]}
                    </Badge>
                  </span>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                  <FileText className='h-4 w-4' />
                  Información del archivo
                </div>
                <div className='space-y-2 text-sm text-muted-foreground'>
                  <p>
                    <strong>Tamaño:</strong> {summary?.file.size}
                  </p>
                  <p>
                    <strong>Tipo:</strong> APK
                  </p>
                  <p>
                    <strong>Tipo de escaneo:</strong> {scans[0]?.type}
                  </p>
                  <p>
                    <strong>Versión:</strong> {scans[0]?.aat_version}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ServiceDetail
