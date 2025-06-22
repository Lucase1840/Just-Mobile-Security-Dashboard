import { z } from 'zod'

export const Platforms = z.union([z.literal('ANDROID'), z.literal('IOS')])

export const SummarySchema = z.object({
  appId: z.string(),
  name: z.string(),
  description: z.string(),
  platform: Platforms,
  version: z.string(),
  createdAt: z.string(),
  finishedAt: z.string(),
  status: z.string(),
  duration: z.object({
    human: z.string(),
    seconds: z.number(),
  }),
  file: z.object({
    size: z.string(),
    name: z.string(),
  }),
})

export const AppSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export const ScanSchema = z.object({
  id: z.string(),
  aat_version: z.string(),
  scan_status: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  type: z.string(),
  app_id: z.string(),
  assessment_service_id: z.number(),
  app: AppSchema,
  scan_status_id: z.number().optional(),
})

export const TranslationSchema = z.object({
  description: z.string(),
  remediation: z.string(),
  impact: z.string(),
  language: z.union([z.literal('en'), z.literal('es')]),
})

export const RefSchema = z.object({
  label: z.string(),
  url: z.string(),
})

export const OwaspRefSchema = z.object({
  masvs: z.string(),
  maswe: z.string(),
})

export const Extras = ['java', 'text', 'xml'] as const

export const EvidenceSchema = z.object({
  id: z.string(),
  value: z.string(),
  vulnerability_id: z.string(),
  vulnerability_evidence_types_id: z.number(),
  file_path: z.string(),
  file_line: z.array(z.number()),
  extra: z.enum(Extras),
  file: z.null(),
  created_at: z.string(),
  is_false_positive: z.boolean(),
  isFalsePositive: z.boolean(),
})

export const VulnerabilitySchema = z.object({
  vulnerabilityId: z.string(),
  title: z.string(),
  severity: z.union([z.literal('high'), z.literal('medium'), z.literal('low'), z.literal('info')]),
  translations: z.array(TranslationSchema),
  refs: z.array(RefSchema),
  owaspRef: OwaspRefSchema,
  evidences: z.array(EvidenceSchema),
})

export const SeveritySchema = z.object({
  high: z.number().optional(),
  medium: z.number().optional(),
  low: z.number().optional(),
  info: z.number().optional(),
})

export const SeverityDistributionSchema = z.object({
  high: z.number().optional(),
  medium: z.number().optional(),
  low: z.number().optional(),
  info: z.number().optional(),
})

export const ServiceSchema = z.object({
  id: z.number(),
  status: z.union([
    z.literal('COMPLETED'),
    z.literal('CREATED'),
    z.literal('IN PROGRESS'),
    z.literal('WAITING_DATA'),
  ]),
  start_at: z.string(),
  end_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  platform: z.enum(['ANDROID', 'IOS']),
  services: z.object({
    id: z.number(),
    name: z.string(),
  }),
  scans: z.array(ScanSchema),
  summary: SummarySchema.optional(),
  vulnerabilities: z.array(VulnerabilitySchema).optional(),
  severityCount: SeveritySchema.optional(),
  severityDistribution: SeverityDistributionSchema.optional(),
})

export const ServicesSchema = z.object({
  services: z.array(ServiceSchema),
})

export const ServicesDataSchema = z.array(ServiceSchema)

export const serviceDetailFiltersSchema = z.object({
  name: z.string().optional(),
  severity: z.string().optional(),
})
