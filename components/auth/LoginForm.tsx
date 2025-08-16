'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import { AppDispatch } from '@/store'

interface LoginFormProps {
  onSwitchToRegister: () => void
}

const DEMO_USERS = {
  'provider@medflow.com': { password: 'Provider123!', role: 'provider' as const, name: 'Dr. John Smith' },
  'staff@medflow.com': { password: 'Staff123!', role: 'staff' as const, name: 'Sarah Johnson' },
  'patient@medflow.com': { password: 'Patient123!', role: 'patient' as const, name: 'Jane Doe' },
  'admin@medflow.com': { password: 'Admin123!', role: 'admin' as const, name: 'Michael Admin' },
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    dispatch(loginStart())

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const user = DEMO_USERS[email as keyof typeof DEMO_USERS]
      
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password')
      }

      const [firstName, lastName] = user.name.split(' ')
      
      dispatch(loginSuccess({
        id: '1',
        email,
        firstName,
        lastName: lastName || '',
        role: user.role,
      }))
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed'
      setError(errorMessage)
      dispatch(loginFailure(errorMessage))
    } finally {
      setLoading(false)
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
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
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
                className="pl-10 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
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
                className="pl-10 pr-10 h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
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
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
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
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="text-sm font-semibold text-green-900 mb-2">Demo Credentials</h4>
          <div className="space-y-1 text-xs">
            <div><strong>Provider:</strong> provider@medflow.com / Provider123!</div>
            <div><strong>Staff:</strong> staff@medflow.com / Staff123!</div>
            <div><strong>Patient:</strong> patient@medflow.com / Patient123!</div>
            <div><strong>Admin:</strong> admin@medflow.com / Admin123!</div>
          </div>
        </div>
      </div>
    </Card>
  )
}