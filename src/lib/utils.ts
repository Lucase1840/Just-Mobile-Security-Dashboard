import { type RequestInit } from 'next/dist/server/web/spec-extension/request'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type z } from 'zod'

import { type BadgeVariant } from '@/components/ui/badge'

import { SERVICE_STATUS, SEVERITY_LEVELS, SUMMARY_STATUS } from './constants/services'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchData<T>(
  url: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit,
): Promise<{ data: T; status: number } | { data: null; message: string }> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
    })

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Usuario o contraseña incorrectos')
      } else if (res.status === 404) {
        throw new Error('Recurso no encontrado')
      } else if (res.status === 403) {
        throw new Error('Prohibido')
      } else if (res.status === 422) {
        throw new Error('Entidad no procesable')
      }

      throw new Error(`Request failed with status ${res.status.toString()}`)
    }

    const data = (await res.json()) as unknown

    const parsed = schema.safeParse(data)

    if (!parsed.success) {
      throw new Error('Formato de respuesta inválido')
    }

    return { data: parsed.data, status: res.status }
  } catch (err) {
    if (err instanceof Error) {
      return { data: null, message: err.message }
    }

    return { data: null, message: 'Error desconocido' }
  }
}

export function formatDateTime(dateString?: string) {
  if (!dateString) return '—'
  const date = new Date(dateString)

  return date.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Argentina/Buenos_Aires',
  })
}

export const getStatusVariant = (status: string) => {
  switch (status) {
    case SERVICE_STATUS.WAITING_DATA.toLowerCase():
      return 'outline_yellow'
    case SERVICE_STATUS.COMPLETED.toLowerCase():
      return 'outline_green'
    case SERVICE_STATUS['IN PROGRESS'].toLowerCase():
      return 'outline_blue'
    default:
      return 'outline_gray'
  }
}

export const getSummaryStatusVariant = (status: string) => {
  switch (status) {
    case SUMMARY_STATUS.Incomplete.toLowerCase():
      return 'outline_red'
    case SUMMARY_STATUS.Completed.toLowerCase():
      return 'outline_green'
  }
}

export const getSeverityVariant = (severity: string): BadgeVariant => {
  switch (severity) {
    case SEVERITY_LEVELS.HIGH:
      return 'outline_red'
    case SEVERITY_LEVELS.MEDIUM:
      return 'outline_yellow'
    case SEVERITY_LEVELS.LOW:
      return 'outline_green'
    case SEVERITY_LEVELS.INFO:
      return 'outline_blue'
    default:
      return 'outline_gray'
  }
}
