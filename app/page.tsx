'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import AuthPage from '@/components/auth/AuthPage'
import Dashboard from '@/components/dashboard/Dashboard'

export default function HomePage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return isAuthenticated ? <Dashboard /> : <AuthPage />
}