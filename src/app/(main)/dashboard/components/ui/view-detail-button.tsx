'use client'

import { useRouter } from 'next/navigation'

import { Eye } from 'lucide-react'

import { Button } from '@/components/ui/button'

function ViewDetailButton({ id, disabled }: { id: string; disabled: boolean }) {
  const router = useRouter()

  return (
    <Button
      className='flex items-center gap-2'
      disabled={disabled}
      onClick={() => router.push(`/dashboard/service-detail/${id}`)}
      size='sm'
      variant='ghost'
    >
      <Eye className='h-4 w-4' />
      Ver detalles
    </Button>
  )
}

export default ViewDetailButton
