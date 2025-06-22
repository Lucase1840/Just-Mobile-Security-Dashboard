'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { type Service, type Vulnerability } from '@/types/services-data-types'

import ServiceDetail from './service-detail'
import VulnerabilityDetail from './vulnerabilities-detail'
import VulnerabilityList from './vulnerability-list'

interface ServiceDetailViewProps {
  initialEvidenceId?: string
  initialVulnerabilityId?: string
  service: Service
}

function ServiceDetailContainer({ service }: ServiceDetailViewProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const defaultActiveTab = searchParams.get('vulnerability') ? 'vulnerabilities' : 'description'
  const [activeTab, setActiveTab] = useState<'description' | 'vulnerabilities'>(defaultActiveTab)
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null)
  const evidenceDefaultValue = searchParams.get('evidence') ?? ''

  const handleVulnerabilitySelect = (vulnerability: Vulnerability) => {
    const vulnerabilityId = vulnerability.vulnerabilityId
    const params = new URLSearchParams(searchParams.toString())

    params.set('vulnerability', vulnerabilityId)

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const vulnerabilityId = searchParams.get('vulnerability')

    if (vulnerabilityId) {
      setSelectedVulnerability(
        service.vulnerabilities?.find((v) => v.vulnerabilityId === vulnerabilityId) ?? null,
      )
    }
  }, [searchParams, service.vulnerabilities])

  return (
    <div className='space-y-6 p-4'>
      <div className='flex items-center gap-4'>
        <Button onClick={() => router.push('/dashboard')} size='sm' variant='ghost'>
          <ArrowLeft className='h-4 w-4 mr-2' />
          Volver al Dashboard
        </Button>
      </div>

      <div className='flex space-x-1 border-b'>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'description'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('description')}
        >
          Descripción general
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'vulnerabilities'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('vulnerabilities')}
        >
          Vulnerabilidades ({service.vulnerabilities?.length || 0})
        </button>
      </div>
      <div>
        {activeTab === 'description' && <ServiceDetail service={service} />}
        {activeTab === 'vulnerabilities' && (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <VulnerabilityList
                onVulnerabilitySelect={handleVulnerabilitySelect}
                selectedVulnerability={selectedVulnerability ?? null}
                vulnerabilities={service.vulnerabilities ?? []}
              />
              {selectedVulnerability ? (
                <VulnerabilityDetail
                  evidenceDefaultValue={evidenceDefaultValue}
                  serviceId={service.id.toString()}
                  vulnerability={selectedVulnerability}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceDetailContainer
