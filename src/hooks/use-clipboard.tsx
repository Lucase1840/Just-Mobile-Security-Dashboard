import { useCallback } from 'react'

import { toast } from 'sonner'

export function useClipboard() {
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('URL copiada al portapapeles')
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }

      toast.error('Error al copiar al portapapeles')
    }
  }, [])

  return { copy }
}
