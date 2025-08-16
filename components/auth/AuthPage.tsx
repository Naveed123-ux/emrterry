'use client'

import { useState } from 'react'
import { Stethoscope } from 'lucide-react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

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

        {/* Auth Form */}
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}

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