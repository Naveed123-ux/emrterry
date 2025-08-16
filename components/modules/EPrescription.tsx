'use client'

import React from 'react'
import { Pill, Plus, Send, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const EPrescription: React.FC = () => {
  const prescriptions = [
    { id: 'RX-001', patient: 'John Smith', medication: 'Lisinopril 10mg', status: 'sent', date: '2024-01-15' },
    { id: 'RX-002', patient: 'Sarah Johnson', medication: 'Metformin 500mg', status: 'pending', date: '2024-01-14' },
    { id: 'RX-003', patient: 'Michael Brown', medication: 'Atorvastatin 20mg', status: 'filled', date: '2024-01-13' },
    { id: 'RX-004', patient: 'Emily Davis', medication: 'Omeprazole 40mg', status: 'sent', date: '2024-01-12' },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Send className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sent Today</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Pill className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Filled</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Prescriptions</CardTitle>
          <CardDescription>Latest prescription activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{prescription.id}</p>
                  <p className="text-sm text-gray-600">{prescription.patient}</p>
                  <p className="text-sm font-medium">{prescription.medication}</p>
                  <p className="text-xs text-gray-500">{prescription.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant={
                    prescription.status === 'filled' ? 'default' :
                    prescription.status === 'sent' ? 'secondary' : 'destructive'
                  }>
                    {prescription.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EPrescription