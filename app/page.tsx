'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { getCurrentUser } from '@/store/slices/authSlice'
import AuthContainer from '@/components/AuthContainer'
import AppContainer from '@/components/AppContainer'

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading MedFlow EMR</h2>
      <p className="text-gray-600">Initializing secure healthcare platform...</p>
    </div>
  </div>
)

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, loading, token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check if user is authenticated on app load
    if (token && !isAuthenticated) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, token, isAuthenticated])

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />
  }

  // Show auth container if not authenticated
  if (!isAuthenticated) {
    return <AuthContainer />
  }

  // Show main app if authenticated
  return <AppContainer />
}