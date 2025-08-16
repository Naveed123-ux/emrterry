'use client'

import React from 'react'
import { Eye, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { OCR_STATUS_CONFIG, type OCRStatus } from './ocrConstants'

interface OCRJob {
  id: string
  document: string
  status: OCRStatus
  confidence: number
  date: string
}

interface OCRJobsListProps {
  jobs: OCRJob[]
}

export const OCRJobsList: React.FC<OCRJobsListProps> = ({ jobs }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent OCR Jobs</CardTitle>
        <CardDescription>Latest document processing activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{job.id}</p>
                <p className="text-sm text-gray-600">{job.document}</p>
                <p className="text-xs text-gray-500">{job.date}</p>
                {job.confidence > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Confidence</span>
                      <span>{job.confidence}%</span>
                    </div>
                    <Progress value={job.confidence} className="h-2" />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3 ml-4">
                <Badge variant={OCR_STATUS_CONFIG[job.status].variant}>
                  {job.status.replace('_', ' ')}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {job.status === 'needs_review' && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}