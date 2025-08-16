'use client'

import React from 'react'
import { MessageSquare, Send, Search, Paperclip } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const SecureMessaging: React.FC = () => {
  const conversations = [
    { id: '1', participant: 'Dr. Smith', lastMessage: 'Lab results are ready for review', time: '2m ago', unread: true },
    { id: '2', participant: 'Sarah Johnson (Patient)', lastMessage: 'Thank you for the prescription', time: '1h ago', unread: false },
    { id: '3', participant: 'Medical Staff', lastMessage: 'Appointment rescheduled for tomorrow', time: '3h ago', unread: false },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Secure Messaging</h1>
          <p className="text-gray-600">HIPAA-compliant communication platform</p>
        </div>
        <Button className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>New Message</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card>
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {conversations.map((conv) => (
              <div key={conv.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{conv.participant}</p>
                  {conv.unread && <Badge variant="destructive" className="text-xs">New</Badge>}
                </div>
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                <p className="text-xs text-gray-400 mt-1">{conv.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Message View */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Dr. Smith</CardTitle>
            <CardDescription>Last seen 5 minutes ago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                    <p className="text-sm">Lab results are ready for review. Please check the patient portal.</p>
                    <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Thanks, I'll review them now.</p>
                    <p className="text-xs text-blue-100 mt-1">2:32 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Message Input */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Type your message..." className="flex-1" />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SecureMessaging