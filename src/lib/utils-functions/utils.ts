import { type RequestInit } from 'next/dist/server/web/spec-extension/request'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchData<T>(
  url: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit,
): Promise<T> {
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
        throw new Error('No autorizado')
      } else if (res.status === 403) {
        throw new Error('Prohibido')
      } else if (res.status === 404) {
        throw new Error('No encontrado')
      } else if (res.status === 422) {
        throw new Error('Entidad no procesable')
      } else if (res.status === 500) {
        throw new Error('Error del servidor')
      }

      throw new Error(`Request failed with status ${res.status.toString()}`)
    }

    const data = (await res.json()) as unknown

    const parsed = schema.safeParse(data)

    if (!parsed.success) {
      throw new Error('Formato de respuesta inválido')
    }

    return parsed.data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }

    throw new Error('Error al obtener los datos')
  }
}
