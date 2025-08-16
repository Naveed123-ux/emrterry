'use client'

import React, { useState } from 'react'
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Alert, AlertDescription } from '../ui/alert'

type AuthScreen = 'login' | 'register' | 'forgot-password' | 'two-factor' | 'verify-email'

interface ForgotPasswordPageProps {
  onScreenChange: (screen: AuthScreen) => void
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onScreenChange }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    if (!email) {
      setEmailError('Email is required')
      return false
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return false
    }
    
    setEmailError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setEmailSent(true)
    } catch (error) {
      console.error('Forgot password failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm text-center">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              If you don't see the email, check your spam folder or try again with a different email address.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => setEmailSent(false)}
              variant="outline"
              className="w-full h-12"
            >
              Try Different Email
            </Button>
            
            <button
              onClick={() => onScreenChange('login')}
              className="text-blue-600 hover:text-blue-500 font-medium text-sm"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="doctor@hospital.com"
                className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError('')
                }}
              />
            </div>
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Send Reset Link</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onScreenChange('login')}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-500 font-medium text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Sign In</span>
            </button>
          </div>
        </form>
      </div>
    </Card>
  )
}

export default ForgotPasswordPage