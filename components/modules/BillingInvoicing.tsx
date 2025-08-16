'use client'

import React from 'react'
import { DollarSign, FileText, CreditCard, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/helpers'

const BillingInvoicing: React.FC = () => {
  const invoices = [
    { id: 'INV-001', patient: 'John Smith', amount: 250, status: 'paid', date: '2024-01-15' },
    { id: 'INV-002', patient: 'Sarah Johnson', amount: 180, status: 'pending', date: '2024-01-14' },
    { id: 'INV-003', patient: 'Michael Brown', amount: 320, status: 'overdue', date: '2024-01-10' },
    { id: 'INV-004', patient: 'Emily Davis', amount: 150, status: 'paid', date: '2024-01-12' },
  ]

  const stats = {
    totalRevenue: 45600,
    pendingPayments: 8900,
    overdueAmount: 2400,
    paidThisMonth: 36700
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoicing</h1>
          <p className="text-gray-600">Manage payments and financial records</p>
        </div>
        <Button className="flex items-center space-x-2">
          <FileText className="h-4 w-4" />
          <span>Create Invoice</span>
        </Button>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.pendingPayments)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.overdueAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paid This Month</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.paidThisMonth)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Latest billing activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-gray-600">{invoice.patient}</p>
                  <p className="text-xs text-gray-500">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(invoice.amount)}</p>
                  <Badge variant={
                    invoice.status === 'paid' ? 'default' :
                    invoice.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {invoice.status}
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

export default BillingInvoicing