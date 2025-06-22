const SERVICE_STATUS = {
  WAITING_DATA: 'Pendiente',
  COMPLETED: 'Completado',
  ['IN PROGRESS']: 'En progreso',
} as const

const SUMMARY_STATUS = {
  Incomplete: 'Incompleto',
  Completed: 'Completado',
} as const

const PLATFORMS = {
  ANDROID: 'Android',
  IOS: 'iOS',
} as const

const SEVERITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  INFO: 'info',
} as const

const SEVERITY_LEVELS_LABELS = {
  HIGH: 'Alta',
  MEDIUM: 'Media',
  LOW: 'Baja',
  INFO: 'Info',
} as const

export { SERVICE_STATUS, SUMMARY_STATUS, PLATFORMS, SEVERITY_LEVELS, SEVERITY_LEVELS_LABELS }
