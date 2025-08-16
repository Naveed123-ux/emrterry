'use client'

import { Pill, Plus, Send } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PrescriptionsModule() {
  const prescriptions = [
    { id: '1', patient: 'John Smith', medication: 'Lisinopril 10mg', status: 'sent', date: '2024-01-15' },
    { id: '2', patient: 'Sarah Johnson', medication: 'Metformin 500mg', status: 'pending', date: '2024-01-14' },
    { id: '3', patient: 'Michael Brown', medication: 'Atorvastatin 20mg', status: 'filled', date: '2024-01-13' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">e-Prescription</h1>
          <p className="text-gray-600">Digital prescription management system</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Prescription</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="h-5 w-5 mr-2" />
            Recent Prescriptions
          </CardTitle>
          <CardDescription>Latest prescription activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{prescription.patient}</p>
                  <p className="text-sm text-gray-600">{prescription.medication}</p>
                  <p className="text-xs text-gray-500">{prescription.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={
                    prescription.status === 'filled' ? 'default' :
                    prescription.status === 'sent' ? 'secondary' : 'destructive'
                  }>
                    {prescription.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}