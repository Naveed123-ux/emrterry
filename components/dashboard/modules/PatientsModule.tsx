'use client'

import { Users, Plus, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function PatientsModule() {
  const patients = [
    { id: '1', name: 'John Smith', age: 45, lastVisit: '2024-01-15', status: 'active' },
    { id: '2', name: 'Sarah Johnson', age: 32, lastVisit: '2024-01-10', status: 'active' },
    { id: '3', name: 'Michael Brown', age: 58, lastVisit: '2024-01-08', status: 'inactive' },
    { id: '4', name: 'Emily Davis', age: 29, lastVisit: '2024-01-05', status: 'active' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Patient</span>
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search patients..." className="pl-10" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Patient List
          </CardTitle>
          <CardDescription>All registered patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-gray-600">Age: {patient.age}</p>
                  <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                    {patient.status}
                  </Badge>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}