'use client'

import React from 'react'
import { FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const ClinicalNotes: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clinical Notes</h1>
        <p className="text-gray-600">AI-enhanced documentation with voice-to-text</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Notes Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Clinical notes features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClinicalNotes