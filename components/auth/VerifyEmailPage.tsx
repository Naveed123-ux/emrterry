'use client'

import React, { useState } from 'react'
import { Mail, ArrowRight, RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'

type AuthScreen = 'login' | 'register' | 'forgot-password' | 'two-factor' | 'verify-email'

interface VerifyEmailPageProps {
  onScreenChange: (screen: AuthScreen) => void
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ onScreenChange }) => {
  const [verificationCode, setVerificationCode] = useState('')
  const [resendLoading, setResendLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!verificationCode.trim()) return

    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      // Verification success - redirect to login
      onScreenChange('login')
    } catch (error) {
      setError('Invalid verification code. Please try again.')
      console.error('Email verification failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setResendLoading(true)
    // Simulate resend action
    setTimeout(() => {
      setResendLoading(false)
    }, 2000)
  }

  return (
    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm text-center">
      <div className="space-y-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600">
            We've sent a verification code to your email address. Enter the code below to verify your account.
          </p>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 text-center text-lg font-mono border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
            />
          </div>

          <Button
            type="submit"
            disabled={loading || verificationCode.length !== 6}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Verify Email</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Didn't receive the code?
          </p>
          
          <Button
            variant="outline"
            onClick={handleResendEmail}
            disabled={resendLoading}
            className="w-full h-10"
          >
            {resendLoading ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Resending...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Resend Code</span>
              </div>
            )}
          </Button>
          
          <button
            onClick={() => onScreenChange('login')}
            className="text-blue-600 hover:text-blue-500 font-medium text-sm"
          >
            Back to Sign In
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> Email verification helps ensure the security of your medical account 
            and enables important healthcare notifications.
          </p>
        </div>
      </div>
    </Card>
  )
}

export default VerifyEmailPage