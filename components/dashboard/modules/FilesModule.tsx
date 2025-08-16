'use client'

import { FolderOpen, Upload, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function FilesModule() {
  const files = [
    { id: '1', name: 'Lab Results - John Smith.pdf', type: 'lab_results', size: '2.4 MB', date: '2024-01-15' },
    { id: '2', name: 'X-Ray - Sarah Johnson.dcm', type: 'imaging', size: '45.6 MB', date: '2024-01-14' },
    { id: '3', name: 'Insurance Card - Michael Brown.jpg', type: 'insurance', size: '1.2 MB', date: '2024-01-13' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">File Management</h1>
          <p className="text-gray-600">Smart document organization with auto-tagging</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Upload Files</span>
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search files..." className="pl-10" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderOpen className="h-5 w-5 mr-2" />
            Recent Files
          </CardTitle>
          <CardDescription>Latest uploaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{file.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{file.type.replace('_', ' ')}</Badge>
                    <span className="text-sm text-gray-600">{file.size}</span>
                  </div>
                  <p className="text-xs text-gray-500">{file.date}</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}