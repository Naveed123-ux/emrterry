'use client'

import React from 'react'
import { FileText, Mic, Bot, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const ClinicalNotes: React.FC = () => {
  const notes = [
    { id: 'CN-001', patient: 'John Smith', type: 'SOAP', date: '2024-01-15', status: 'completed' },
    { id: 'CN-002', patient: 'Sarah Johnson', type: 'Progress', date: '2024-01-14', status: 'draft' },
    { id: 'CN-003', patient: 'Michael Brown', type: 'Procedure', date: '2024-01-13', status: 'completed' },
    { id: 'CN-004', patient: 'Emily Davis', type: 'Discharge', date: '2024-01-12', status: 'signed' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clinical Notes</h1>
          <p className="text-gray-600">AI-enhanced documentation with voice-to-text</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Mic className="h-4 w-4" />
            <span>Voice Note</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Note</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Notes</p>
                <p className="text-2xl font-bold">234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Mic className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Voice Notes</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI Assisted</p>
                <p className="text-2xl font-bold">67</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notes</CardTitle>
          <CardDescription>Latest clinical documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{note.id}</p>
                  <p className="text-sm text-gray-600">{note.patient}</p>
                  <p className="text-sm font-medium">{note.type} Note</p>
                  <p className="text-xs text-gray-500">{note.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant={
                    note.status === 'signed' ? 'default' :
                    note.status === 'completed' ? 'secondary' : 'destructive'
                  }>
                    {note.status}
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

export default ClinicalNotes