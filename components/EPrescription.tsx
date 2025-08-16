'use client'

import React from 'react'
import { Pill } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const EPrescription: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">e-Prescription</h1>
        <p className="text-gray-600">Digital prescription management system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="h-5 w-5 mr-2" />
            Prescription Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Pill className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">e-Prescription features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EPrescription