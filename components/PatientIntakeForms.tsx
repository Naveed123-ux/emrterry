'use client'

import React from 'react'
import { ClipboardList, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

const PatientIntakeForms: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Intake Forms</h1>
          <p className="text-gray-600">Create and manage digital intake forms</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Form</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="h-5 w-5 mr-2" />
            Forms Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <ClipboardList className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Patient intake forms will be managed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientIntakeForms