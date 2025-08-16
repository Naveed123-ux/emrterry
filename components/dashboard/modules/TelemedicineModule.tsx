'use client'

import { Video, Users, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function TelemedicineModule() {
  const sessions = [
    { id: '1', patient: 'John Smith', time: '2:00 PM', duration: '30 min', status: 'scheduled' },
    { id: '2', patient: 'Sarah Johnson', time: '2:30 PM', duration: '15 min', status: 'in-progress' },
    { id: '3', patient: 'Michael Brown', time: '3:00 PM', duration: '30 min', status: 'completed' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Telemedicine</h1>
          <p className="text-gray-600">Virtual consultation platform</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Video className="h-4 w-4" />
          <span>Start Session</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Now</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Scheduled telemedicine appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{session.patient}</p>
                  <p className="text-sm text-gray-600">{session.time} • {session.duration}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={
                    session.status === 'completed' ? 'default' :
                    session.status === 'in-progress' ? 'destructive' : 'secondary'
                  }>
                    {session.status}
                  </Badge>
                  {session.status === 'scheduled' && (
                    <Button size="sm" className="flex items-center space-x-1">
                      <Video className="h-4 w-4" />
                      <span>Join</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}