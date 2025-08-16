'use client'

import React from 'react'
import { ScanLine } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const OCRWorkflow: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">OCR Workflow</h1>
        <p className="text-gray-600">Automated document processing and data extraction</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ScanLine className="h-5 w-5 mr-2" />
            Document Processing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <ScanLine className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">OCR processing features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OCRWorkflow