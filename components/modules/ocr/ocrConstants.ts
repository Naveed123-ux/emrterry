export const OCR_MOCK_DATA = {
  stats: {
    processed: 456,
    verified: 387,
    needsReview: 23,
    accuracyRate: 94.2
  },
  jobs: [
    { 
      id: 'OCR-001', 
      document: 'Lab Results - John Smith.pdf', 
      status: 'completed' as const, 
      confidence: 98, 
      date: '2024-01-15' 
    },
    { 
      id: 'OCR-002', 
      document: 'Medical History - Sarah Johnson.pdf', 
      status: 'processing' as const, 
      confidence: 0, 
      date: '2024-01-14' 
    },
    { 
      id: 'OCR-003', 
      document: 'Prescription - Michael Brown.jpg', 
      status: 'verified' as const, 
      confidence: 94, 
      date: '2024-01-13' 
    },
    { 
      id: 'OCR-004', 
      document: 'Insurance Card - Emily Davis.jpg', 
      status: 'needs_review' as const, 
      confidence: 76, 
      date: '2024-01-12' 
    },
  ]
}

export const OCR_STATUS_CONFIG = {
  completed: { variant: 'default' as const, color: 'green' },
  processing: { variant: 'secondary' as const, color: 'blue' },
  verified: { variant: 'default' as const, color: 'green' },
  needs_review: { variant: 'destructive' as const, color: 'yellow' },
} as const

export type OCRStatus = keyof typeof OCR_STATUS_CONFIG