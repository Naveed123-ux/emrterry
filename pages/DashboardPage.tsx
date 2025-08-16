'use client'

import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar,
  Users,
  DollarSign,
  Activity,
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  // Mock data for demonstration
  const stats = {
    todayAppointments: 12,
    totalPatients: 1247,
    monthlyRevenue: 45600,
    pendingTasks: 8
  }

  const upcomingAppointments = [
    { id: '1', patient: 'John Smith', time: '09:00 AM', type: 'Consultation' },
    { id: '2', patient: 'Sarah Johnson', time: '09:30 AM', type: 'Follow-up' },
    { id: '3', patient: 'Michael Brown', time: '10:00 AM', type: 'Procedure' },
    { id: '4', patient: 'Emily Davis', time: '10:30 AM', type: 'Consultation' },
  ]

  const recentActivities = [
    { id: '1', action: 'Completed appointment with John Smith', time: '2 hours ago' },
    { id: '2', action: 'Updated clinical notes for Sarah Johnson', time: '4 hours ago' },
    { id: '3', action: 'Sent prescription to pharmacy', time: '6 hours ago' },
    { id: '4', action: 'Reviewed lab results', time: '1 day ago' },
  ]

  const alerts = [
    { id: '1', message: 'Lab results pending review', type: 'warning', urgent: true },
    { id: '2', message: 'Appointment reminder for tomorrow', type: 'info', urgent: false },
    { id: '3', message: 'Patient medication renewal needed', type: 'warning', urgent: true },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, Dr. {user?.lastName}
        </h1>
        <p className="text-gray-600">
          Today is {formatDate(new Date())} - Here's what's happening in your practice
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              2 high priority
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Next 4 appointments today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-500">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">{appointment.time}</p>
                  <Badge variant="outline" className="text-xs">Confirmed</Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Appointments
            </Button>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alerts & Notifications
            </CardTitle>
            <CardDescription>Important items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  {alert.urgent && (
                    <Badge variant="destructive" className="ml-2 text-xs">Urgent</Badge>
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="h-5 w-5" />
              <span className="text-xs">Add Patient</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-5 w-5" />
              <span className="text-xs">New Note</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-xs">Billing</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Activity className="h-5 w-5" />
              <span className="text-xs">Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage