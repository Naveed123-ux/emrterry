'use client'

import React from 'react'
import { ScanLine, Upload } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OCRStats } from './ocr/OCRStats'
import { OCRJobsList } from './ocr/OCRJobsList'
import { OCR_MOCK_DATA } from './ocr/ocrConstants'

const OCRWorkflow: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">OCR Workflow</h1>
          <p className="text-gray-600">Automated document processing and data extraction</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Upload for OCR</span>
        </Button>
      </div>

      <OCRStats stats={OCR_MOCK_DATA.stats} />
      <OCRJobsList jobs={OCR_MOCK_DATA.jobs} />
    </div>
  )
}

export default OCRWorkflow