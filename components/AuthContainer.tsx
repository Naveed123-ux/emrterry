'use client'

import React, { useState } from 'react'
import { Stethoscope } from 'lucide-react'
import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'
import ForgotPasswordPage from './auth/ForgotPasswordPage'
import TwoFactorPage from './auth/TwoFactorPage'
import VerifyEmailPage from './auth/VerifyEmailPage'

type AuthScreen = 'login' | 'register' | 'forgot-password' | 'two-factor' | 'verify-email'

export const AuthContainer: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login')

  const renderAuthScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginPage onScreenChange={setCurrentScreen} />
      case 'register':
        return <RegisterPage onScreenChange={setCurrentScreen} />
      case 'forgot-password':
        return <ForgotPasswordPage onScreenChange={setCurrentScreen} />
      case 'two-factor':
        return <TwoFactorPage onScreenChange={setCurrentScreen} />
      case 'verify-email':
        return <VerifyEmailPage onScreenChange={setCurrentScreen} />
      default:
        return <LoginPage onScreenChange={setCurrentScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-blue-600 rounded-full">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MedFlow EMR</h1>
              <p className="text-sm text-gray-600">Secure Healthcare Management</p>
            </div>
          </div>
        </div>

        {/* Auth Screen */}
        {renderAuthScreen()}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 MedFlow EMR. All rights reserved.</p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">HIPAA Compliant</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer