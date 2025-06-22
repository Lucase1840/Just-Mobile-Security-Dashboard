'use client'

import { usePathname } from 'next/navigation'

import { Code, ExternalLink, LinkIcon, Share2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useClipboard } from '@/hooks/use-clipboard'
import { SEVERITY_LEVELS_LABELS } from '@/lib/constants/services'
import { getSeverityVariant } from '@/lib/utils'
import { type Vulnerability } from '@/types/services-data-types'

import EvidenceDialog from './evidence-dialog'

interface VulnerabilityDetailProps {
  evidenceDefaultValue: string
  serviceId: string
  vulnerability: Vulnerability
}

function VulnerabilityDetail({
  vulnerability,
  serviceId,
  evidenceDefaultValue,
}: VulnerabilityDetailProps) {
  const pathname = usePathname()
  const { copy } = useClipboard()

  const shareVulnerability = () => {
    const shareableUrl = serviceId
      ? `${window.location.origin}${pathname}?service=${serviceId}&vulnerability=${vulnerability.vulnerabilityId}`
      : `${window.location.origin}${pathname}?vulnerability=${vulnerability.vulnerabilityId}`

    void copy(shareableUrl)
  }

  const translation = vulnerability.translations[0]

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <LinkIcon className='h-5 w-5' />
            Referencias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            {vulnerability.refs.map((ref) => (
              <div
                className='flex items-center justify-between p-3 border rounded-lg'
                key={ref.url}
              >
                <span className='text-sm font-medium'>{ref.label}</span>
                <Button asChild size='sm' variant='ghost'>
                  <a href={ref.url} rel='noopener noreferrer' target='_blank'>
                    <ExternalLink className='h-4 w-4' />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <CardTitle className='text-xl'>{vulnerability.title}</CardTitle>
                <Badge variant={getSeverityVariant(vulnerability.severity)}>
                  {
                    SEVERITY_LEVELS_LABELS[
                      vulnerability.severity.toUpperCase() as keyof typeof SEVERITY_LEVELS_LABELS
                    ]
                  }
                </Badge>{' '}
              </div>
              <CardDescription>
                OWASP {vulnerability.owaspRef.masvs} • {vulnerability.owaspRef.maswe}
              </CardDescription>
            </div>
            <Button onClick={shareVulnerability} size='sm' variant='outline'>
              <Share2 className='h-4 w-4 mr-2' />
              Compartir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs className='w-full' defaultValue={evidenceDefaultValue ? 'evidence' : 'description'}>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='description'>Descripción</TabsTrigger>
              <TabsTrigger value='impact'>Impacto</TabsTrigger>
              <TabsTrigger value='remediation'>Remediación</TabsTrigger>
              <TabsTrigger value='evidence'>
                Evidencias ({vulnerability.evidences.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent className='space-y-4' value='description'>
              <div
                className='prose prose-sm max-w-none'
                dangerouslySetInnerHTML={{ __html: translation.description || '' }}
              />
            </TabsContent>

            <TabsContent className='space-y-4' value='impact'>
              <div
                className='prose prose-sm max-w-none'
                dangerouslySetInnerHTML={{ __html: translation.impact || '' }}
              />
            </TabsContent>

            <TabsContent className='space-y-4' value='remediation'>
              <div
                className='prose prose-sm max-w-none'
                dangerouslySetInnerHTML={{ __html: translation.remediation || '' }}
              />
            </TabsContent>

            <TabsContent className='space-y-4' value='evidence'>
              <div className='space-y-4'>
                {vulnerability.evidences.map((evidence, index) => (
                  <Card key={evidence.id}>
                    <CardHeader className='pb-3'>
                      <div className='flex items-center justify-between'>
                        <CardTitle className='text-base flex items-center gap-2'>
                          <Code className='h-4 w-4' />
                          Evidencia {index + 1}
                        </CardTitle>
                        <div className='flex items-center gap-2'>
                          <Badge variant='outline'>{evidence.extra}</Badge>
                          {Boolean(serviceId) && (
                            <EvidenceDialog
                              evidence={evidence}
                              openDefaultValue={evidence.id === evidenceDefaultValue}
                              serviceId={serviceId}
                              vulnerabilityId={vulnerability.vulnerabilityId}
                            />
                          )}
                        </div>
                      </div>
                      <CardDescription className='truncate flex flex-col gap-2'>
                        <div>
                          <span title={evidence.file_path}>{evidence.file_path}</span>
                        </div>
                        {evidence.file_line.length > 0 &&
                          ` (Line ${evidence.file_line.join(', ')})`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className='h-64 w-full rounded-md border'>
                        <pre className='p-4 text-sm'>
                          <code>{evidence.value}</code>
                        </pre>
                        <ScrollBar orientation='horizontal' />
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default VulnerabilityDetail
