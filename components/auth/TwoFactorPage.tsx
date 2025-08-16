'use client'

import React, { useState } from 'react'
import { Shield, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { Alert, AlertDescription } from '../ui/alert'

type AuthScreen = 'login' | 'register' | 'forgot-password' | 'two-factor' | 'verify-email'

interface TwoFactorPageProps {
  onScreenChange: (screen: AuthScreen) => void
}

const TwoFactorPage: React.FC<TwoFactorPageProps> = ({ onScreenChange }) => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (code.length !== 6) {
      return
    }

    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      // Success - user will be redirected by the main app
      // For demo, we'll just go back to login
      onScreenChange('login')
    } catch (error) {
      setError('Invalid verification code. Please try again.')
      console.error('Two-factor verification failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
          <p className="text-gray-600">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Verify Code</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have access to your authenticator app?
            </p>
            <button
              type="button"
              onClick={() => onScreenChange('login')}
              className="text-blue-600 hover:text-blue-500 font-medium text-sm"
            >
              Back to Sign In
            </button>
          </div>
        </form>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-800">
            <strong>Security Notice:</strong> This additional security step helps protect your medical data 
            and ensures HIPAA compliance.
          </p>
        </div>
      </div>
    </Card>
  )
}

export default TwoFactorPage