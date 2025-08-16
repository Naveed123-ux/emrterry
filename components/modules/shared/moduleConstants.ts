// Shared constants for all modules
export const MODULE_STATS = {
  appointments: {
    today: 12,
    thisWeek: 48,
    newPatients: 8,
    cancellations: 3
  },
  billing: {
    totalRevenue: 45600,
    pendingPayments: 8900,
    overdueAmount: 2400,
    paidThisMonth: 36700
  },
  prescriptions: {
    sentToday: 12,
    pending: 5,
    filled: 8
  },
  telemedicine: {
    todaySessions: 8,
    activeNow: 2,
    totalPatients: 156
  },
  notes: {
    total: 234,
    voiceNotes: 89,
    aiAssisted: 67
  },
  files: {
    total: 1247,
    uploadedToday: 23,
    ocrProcessed: 89,
    storageUsed: '45.2 GB'
  }
}

export const STATUS_VARIANTS = {
  confirmed: 'default',
  pending: 'secondary',
  cancelled: 'destructive',
  completed: 'default',
  'in-progress': 'destructive',
  scheduled: 'secondary',
  paid: 'default',
  overdue: 'destructive',
  sent: 'secondary',
  filled: 'default',
  verified: 'default',
  needs_review: 'destructive',
  processing: 'secondary',
  draft: 'secondary',
  signed: 'default'
} as const

export type StatusVariant = keyof typeof STATUS_VARIANTS