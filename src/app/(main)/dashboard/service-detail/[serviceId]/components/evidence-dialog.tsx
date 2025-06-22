'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Expand, ExternalLink } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useClipboard } from '@/hooks/use-clipboard'

import type { Evidence } from '@/types/services-data-types'

interface CodeModalProps {
  evidence: Evidence
  openDefaultValue: boolean
  serviceId: string
  vulnerabilityId: string
}

function EvidenceDialog({
  evidence,
  vulnerabilityId,
  serviceId,
  openDefaultValue,
}: CodeModalProps) {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(Boolean(openDefaultValue))
  const pathName = usePathname()
  const router = useRouter()
  const { copy } = useClipboard()

  const shareableUrl = `${window.location.origin}${window.location.pathname}?service=${serviceId}&vulnerability=${vulnerabilityId}&evidence=${evidence.id}`

  const onOpen = (value: boolean) => {
    if (value) {
      const params = new URLSearchParams(searchParams.toString())

      params.set('evidence', evidence.id)
      router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    } else {
      const params = new URLSearchParams(searchParams.toString())

      params.delete('evidence')
      router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }

    setIsOpen(value)
  }

  const copyUrl = () => {
    void copy(shareableUrl)
  }

  return (
    <Dialog onOpenChange={onOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className='ml-auto' size='sm' variant='outline'>
          <Expand className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-6xl max-h-[90vh] px-5 py-8'>
        <DialogHeader className='pt-2'>
          <div className='flex items-center justify-between'>
            <DialogTitle className='flex items-center gap-2'>
              Code Evidence
              <Badge variant='outline'>{evidence.extra}</Badge>
            </DialogTitle>
            <div className='flex items-center gap-2'>
              <Button onClick={copyUrl} size='sm' variant='outline'>
                <ExternalLink className='h-4 w-4 mr-2' />
                Copy Link
              </Button>
            </div>
          </div>
          <div className='text-sm text-muted-foreground'>
            {evidence.file_path}
            {evidence.file_line.length > 0 && ` (Line ${evidence.file_line.join(', ')})`}
          </div>
        </DialogHeader>
        <ScrollArea className='h-[70vh] w-full rounded-md border'>
          <pre className='p-4 text-sm'>
            <code className='language-java'>{evidence.value}</code>
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default EvidenceDialog
