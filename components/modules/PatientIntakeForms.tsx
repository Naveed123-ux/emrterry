'use client'

import React from 'react'
import { ClipboardList, Plus, Eye, Edit } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const PatientIntakeForms: React.FC = () => {
  const forms = [
    { id: '1', title: 'General Medical History', submissions: 45, status: 'active' },
    { id: '2', title: 'COVID-19 Screening', submissions: 78, status: 'active' },
    { id: '3', title: 'Cardiology Intake', submissions: 23, status: 'draft' },
    { id: '4', title: 'Pre-Surgery Assessment', submissions: 12, status: 'active' },
  ]

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {forms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2" />
                  {form.title}
                </CardTitle>
                <Badge variant={form.status === 'active' ? 'default' : 'secondary'}>
                  {form.status}
                </Badge>
              </div>
              <CardDescription>
                {form.submissions} submissions received
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PatientIntakeForms