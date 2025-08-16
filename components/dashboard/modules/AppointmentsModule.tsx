'use client'

import { Calendar, Clock, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AppointmentsModule() {
  const appointments = [
    { id: '1', patient: 'John Smith', time: '09:00 AM', type: 'Consultation', status: 'confirmed' },
    { id: '2', patient: 'Sarah Johnson', time: '09:30 AM', type: 'Follow-up', status: 'pending' },
    { id: '3', patient: 'Michael Brown', time: '10:00 AM', type: 'Procedure', status: 'confirmed' },
    { id: '4', patient: 'Emily Davis', time: '10:30 AM', type: 'Consultation', status: 'cancelled' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointment Scheduling</h1>
          <p className="text-gray-600">Manage patient appointments and availability</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Appointment</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Calendar View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Calendar component will be implemented here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Today's Appointments
            </CardTitle>
            <CardDescription>{appointments.length} appointments scheduled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{appointment.patient}</p>
                  <Badge variant={
                    appointment.status === 'confirmed' ? 'default' :
                    appointment.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{appointment.time}</span>
                  <span>{appointment.type}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}