'use client'

import React from 'react'
import { Video } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const Telemedicine: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Telemedicine</h1>
        <p className="text-gray-600">Virtual consultation platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="h-5 w-5 mr-2" />
            Virtual Consultations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Telemedicine features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Telemedicine