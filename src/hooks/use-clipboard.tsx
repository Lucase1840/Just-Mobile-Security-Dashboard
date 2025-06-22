import { useCallback, useState } from 'react'

import { toast } from 'sonner'

export function useClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        // *Fallback for non-HTTPS pages
        const textArea = document.createElement('textarea')

        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '0'
        textArea.style.top = '0'
        textArea.style.opacity = '0'

        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }

      setCopied(true)
      toast.success('URL copiada al portapapeles')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }

      toast.error('Error al copiar al portapapeles')
    }
  }, [])

  return { copy, copied }
}
