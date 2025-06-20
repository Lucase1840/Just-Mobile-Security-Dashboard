export const Name = {
  JustMobileSecurity: 'Just Mobile Security',
  MobilePenetrationTesting: 'Mobile Penetration Testing',
} as const
export type Name = (typeof Name)[keyof typeof Name]

export const AssessmentStatus = {
  Completed: 'COMPLETED',
  Created: 'CREATED',
  InProgress: 'IN PROGRESS',
} as const
export type AssessmentStatus = (typeof AssessmentStatus)[keyof typeof AssessmentStatus]

export const Type = {
  A: 'A',
  P: 'P',
  R: 'R',
  S: 'S',
} as const
export type Type = (typeof Type)[keyof typeof Type]

export const Platform = {
  Android: 'ANDROID',
  Ios: 'IOS',
} as const
export type Platform = (typeof Platform)[keyof typeof Platform]

export const Category = {
  MasvsNetwork1: 'MASVS-NETWORK-1',
  MasvsResilience1: 'MASVS-RESILIENCE-1',
  MasvsResilience4: 'MASVS-RESILIENCE-4',
} as const
export type Category = (typeof Category)[keyof typeof Category]

export const FileElement = {
  AndroidApk: 'android.apk',
  Classes2Dex: 'classes2.dex',
  Classes3Dex: 'classes3.dex',
  ClassesDex: 'classes.dex',
} as const
export type FileElement = (typeof FileElement)[keyof typeof FileElement]

export const ServiceStatus = {
  Completed: 'COMPLETED',
  InProgress: 'IN PROGRESS',
  WaitingData: 'WAITING_DATA',
} as const
export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]

export const Extra = {
  Java: 'java',
  Text: 'text',
  XML: 'xml',
} as const
export type Extra = (typeof Extra)[keyof typeof Extra]

export const Masvs = {
  MasvsAuth1: 'MASVS-AUTH-1',
  MasvsCode3: 'MASVS-CODE-3',
  MasvsCode4: 'MASVS-CODE-4',
  MasvsNetwork1: 'MASVS-NETWORK-1',
  MasvsPlatform1: 'MASVS-PLATFORM-1',
  MasvsPlatform2: 'MASVS-PLATFORM-2',
  MasvsStorage1: 'MASVS-STORAGE-1',
  MasvsStorage2: 'MASVS-STORAGE-2',
} as const
export type Masvs = (typeof Masvs)[keyof typeof Masvs]

export const SeverityEnum = {
  High: 'high',
  Info: 'info',
  Low: 'low',
  Medium: 'medium',
} as const
export type SeverityEnum = (typeof SeverityEnum)[keyof typeof SeverityEnum]

export const Language = {
  En: 'en',
  Es: 'es',
} as const
export type Language = (typeof Language)[keyof typeof Language]

export interface ServicesData {
  services: Service[]
}

export interface Service {
  assessment: Assessment
  components?: Component[]
  created_at: string
  end_at: string
  id: number
  permissions?: string[]
  platform: Platform
  properties?: Properties
  protections?: Protection[]
  scans: Scan[]
  services: Services
  severityCount?: Severity
  severityDistribution?: Severity
  start_at: string
  status: ServiceStatus
  summary?: Summary
  vulnerabilities?: Vulnerability[]
}

export interface Assessment {
  company: Services
  company_id?: number
  id: string
  name: null
  status: AssessmentStatus
}

export interface Services {
  id: number
  name: Name
}

export interface Component {
  is_browseable: boolean
  is_exported: boolean
  name: string
  type: Type
}

export interface Properties {
  ANDROID_VERSION_CODE?: number | string
  ARCH?: string
  BINARY_PROTECTIONS: BinaryProtections | null
  BITS?: number
  COMPILER?: string
  CRYPTO?: boolean
  FRAMEWORK: string
  LANG?: string
  LIBRARIES?: string[]
  MAIN_ACTIVITY?: string
  MD5: string
  MIN_SDK: number
  SHA1: string
  SHA256: string
  VERSION: number | string
}

export interface BinaryProtections {
  arc: boolean
  canary: boolean
  encrypted: boolean
  pie: boolean
}

export interface Protection {
  category: Category[]
  name: string
  protectors: Protector[]
  type: string
}

export interface Protector {
  files: FileElement[]
  name: string
}

export interface Scan {
  aat_version: string
  app: App
  app_id: string
  assessment_service_id: number
  created_at: string
  id: string
  scan_status?: string
  scan_status_id?: number
  type: string
}

export interface App {
  created_at: string
  description: string
  icon: Icon
  id: string
  name: string
  version: null
}

export interface Icon {
  extname: string
  mimeType: string
  name: string
  size: number
  url: string
}

export interface Severity {
  high?: number
  info?: number
  low?: number
  medium: number
}

export interface Summary {
  appId: string
  createdAt: string
  description: string
  duration: Duration
  end_string: string
  file: FileClass
  finishedAt: string
  icon: string
  name: string
  platform: Platform
  start_string: string
  status: string
  statusId: number
  version: string
}

export interface Duration {
  days: number
  hours: number
  human: string
  milliseconds: number
  minutes: number
  seconds: number
}

export interface FileClass {
  name: string
  size: string
}

export interface Vulnerability {
  evidences: Evidence[]
  owaspRef: OwaspRef
  refs: Ref[]
  scanner_id: number
  severity: SeverityEnum
  status: string
  title: string
  translations: Translation[]
  vulnerabilityId: string
}

export interface Evidence {
  created_at: string
  extra: Extra
  file: null
  file_line: number[]
  file_path: string
  id: string
  is_false_positive: boolean
  isFalsePositive: boolean
  value: string
  vulnerability_evidence_types_id: number
  vulnerability_id: string
}

export interface OwaspRef {
  masvs: Masvs
  maswe: string
}

export interface Ref {
  label: string
  url: string
}

export interface Translation {
  description: string
  impact: string
  language: Language
  remediation: string
}
