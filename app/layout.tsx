import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReduxProvider } from '@/providers/ReduxProvider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MedFlow EMR - Healthcare Management Platform',
  description: 'Comprehensive Electronic Medical Record (EMR) platform built with Next.js 15, featuring 11 core modules designed to meet healthcare industry standards.',
  keywords: ['EMR', 'Healthcare', 'Medical Records', 'HIPAA', 'Patient Management'],
  authors: [{ name: 'MedFlow Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'noindex, nofollow', // Since this is a demo
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  )
}