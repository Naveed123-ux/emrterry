'use client'

import React from 'react'
import { ScanLine, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface OCRStatsProps {
  stats: {
    processed: number
    verified: number
    needsReview: number
    accuracyRate: number
  }
}

export const OCRStats: React.FC<OCRStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <ScanLine className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Processed</p>
              <p className="text-2xl font-bold">{stats.processed}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold">{stats.verified}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Needs Review</p>
              <p className="text-2xl font-bold">{stats.needsReview}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
              <p className="text-2xl font-bold">{stats.accuracyRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}