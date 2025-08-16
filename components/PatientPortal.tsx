'use client'

import React from 'react'
import { Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const PatientPortal: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patient Portal</h1>
        <p className="text-gray-600">Your personal healthcare dashboard</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Patient Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Patient portal features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientPortal