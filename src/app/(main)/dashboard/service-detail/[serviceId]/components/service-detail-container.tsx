'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

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

function ServiceDetailContainer({
  service,
  initialVulnerabilityId,
  initialEvidenceId,
}: ServiceDetailViewProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Set initial active tab based on whether we have vulnerability or evidence
  const hasInitialVulnerabilityOrEvidence = initialVulnerabilityId || initialEvidenceId

  const [activeTab, setActiveTab] = useState<'description' | 'vulnerabilities'>(
    hasInitialVulnerabilityOrEvidence ? 'vulnerabilities' : 'description',
  )

  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null)
  const evidenceDefaultValue = searchParams.get('evidence') ?? initialEvidenceId ?? ''

  // Use ref to track the current vulnerability ID without causing re-renders
  const vulnerabilityIdRef = useRef<string | null>(initialVulnerabilityId || null)

  // Clean URL after initial render if we have vulnerability or evidence params
  useEffect(() => {
    const hasVulnerabilityOrEvidence =
      searchParams.get('vulnerability') || searchParams.get('evidence')

    if (hasVulnerabilityOrEvidence) {
      const cleanSearchParams = new URLSearchParams()

      // Preserve name and severity parameters
      const nameParam = searchParams.get('name')
      const severityParam = searchParams.get('severity')

      if (nameParam) cleanSearchParams.set('name', nameParam)
      if (severityParam) cleanSearchParams.set('severity', severityParam)

      const cleanUrl = cleanSearchParams.toString()
        ? `${pathname}?${cleanSearchParams.toString()}`
        : pathname

      // Replace URL without triggering a page reload
      router.replace(cleanUrl, { scroll: false })
    }
  }, [searchParams, pathname, router])

  const handleVulnerabilitySelect = (vulnerability: Vulnerability) => {
    const vulnerabilityId = vulnerability.vulnerabilityId

    vulnerabilityIdRef.current = vulnerabilityId

    // Update local state without changing URL to avoid re-fetching
    const vulnerabilityData = service.vulnerabilities?.find(
      (v) => v.vulnerabilityId === vulnerabilityId,
    )

    setSelectedVulnerability(vulnerabilityData ?? null)
  }

  // Initialize vulnerability selection from initialVulnerabilityId or URL
  useEffect(() => {
    const urlVulnerabilityId = searchParams.get('vulnerability')
    const vulnerabilityId = initialVulnerabilityId || urlVulnerabilityId

    if (vulnerabilityId) {
      vulnerabilityIdRef.current = vulnerabilityId
      setActiveTab('vulnerabilities')

      const vulnerability = service.vulnerabilities?.find(
        (v) => v.vulnerabilityId === vulnerabilityId,
      )

      setSelectedVulnerability(vulnerability ?? null)
    }
  }, [initialVulnerabilityId, service.vulnerabilities])

  // Update selected vulnerability when vulnerabilityIdRef changes
  useEffect(() => {
    const currentVulnerabilityId = vulnerabilityIdRef.current

    if (currentVulnerabilityId) {
      const vulnerability = service.vulnerabilities?.find(
        (v) => v.vulnerabilityId === currentVulnerabilityId,
      )

      setSelectedVulnerability(vulnerability ?? null)
    }
  }, [service.vulnerabilities])

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
