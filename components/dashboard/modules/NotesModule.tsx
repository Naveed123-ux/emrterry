'use client'

import { FileText, Plus, Mic } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function NotesModule() {
  const notes = [
    { id: '1', patient: 'John Smith', type: 'SOAP', date: '2024-01-15', status: 'completed' },
    { id: '2', patient: 'Sarah Johnson', type: 'Progress', date: '2024-01-14', status: 'draft' },
    { id: '3', patient: 'Michael Brown', type: 'Procedure', date: '2024-01-13', status: 'signed' },
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Recent Notes
          </CardTitle>
          <CardDescription>Latest clinical documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{note.patient}</p>
                  <p className="text-sm text-gray-600">{note.type} Note</p>
                  <p className="text-xs text-gray-500">{note.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={
                    note.status === 'signed' ? 'default' :
                    note.status === 'completed' ? 'secondary' : 'destructive'
                  }>
                    {note.status}
                  </Badge>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}