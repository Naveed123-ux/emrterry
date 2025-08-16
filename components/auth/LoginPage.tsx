'use client'

import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Shield 
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { Alert, AlertDescription } from '../ui/alert'

type AuthScreen = 'login' | 'register' | 'forgot-password' | 'two-factor' | 'verify-email'

interface LoginPageProps {
  onScreenChange: (screen: AuthScreen) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onScreenChange }) => {
  const { login, loading, error, clearError } = useAuth()
  
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{email?: string; password?: string}>({})

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {}
    
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    clearError()

    try {
      await login(email, password)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your secure medical account</p>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={() => onScreenChange('forgot-password')}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading === 'loading'}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg"
          >
            {loading === 'loading' ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>

          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              type="button"
              onClick={() => onScreenChange('register')}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>

      {/* Demo Credentials Notice */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-green-900">🚀 Demo Credentials</h4>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="bg-white rounded p-2 border border-green-100">
              <div className="font-medium text-green-800">Healthcare Provider</div>
              <div className="text-green-700">provider@medflow.com / Provider123!</div>
            </div>
            <div className="bg-white rounded p-2 border border-green-100">
              <div className="font-medium text-green-800">Medical Staff</div>
              <div className="text-green-700">staff@medflow.com / Staff123!</div>
            </div>
            <div className="bg-white rounded p-2 border border-green-100">
              <div className="font-medium text-green-800">Patient</div>
              <div className="text-green-700">patient@medflow.com / Patient123!</div>
            </div>
            <div className="bg-white rounded p-2 border border-green-100">
              <div className="font-medium text-green-800">Administrator</div>
              <div className="text-green-700">admin@medflow.com / Admin123!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">HIPAA Compliant Security</h4>
            <p className="text-xs text-blue-700 mt-1">
              Your medical data is protected with enterprise-grade encryption and security protocols.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default LoginPage