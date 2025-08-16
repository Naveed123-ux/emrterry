'use client'

import React from 'react'
import { MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const SecureMessaging: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Secure Messaging</h1>
        <p className="text-gray-600">HIPAA-compliant communication platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Secure messaging features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SecureMessaging