'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Types
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'provider' | 'staff' | 'patient' | 'admin'
  phone: string
  avatar?: string | null
  isActive: boolean
  lastLogin: string
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
    language: string
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

type AuthAction =
  | { type: 'LOADING' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

// Demo credentials for frontend-only development
const DEMO_CREDENTIALS = {
  'provider@medflow.com': { password: 'Provider123!', role: 'provider' as const },
  'staff@medflow.com': { password: 'Staff123!', role: 'staff' as const },
  'patient@medflow.com': { password: 'Patient123!', role: 'patient' as const },
  'admin@medflow.com': { password: 'Admin123!', role: 'admin' as const },
  'demo@medflow.com': { password: 'Demo123!', role: 'provider' as const },
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: 'idle',
  error: null,
}

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: 'loading', error: null }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: 'succeeded',
        error: null,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: 'failed',
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: 'idle',
        error: null,
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('medflow_auth_token')
    const userProfile = localStorage.getItem('medflow_user_profile')
    
    if (token && userProfile) {
      try {
        const user = JSON.parse(userProfile)
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      } catch (error) {
        localStorage.removeItem('medflow_auth_token')
        localStorage.removeItem('medflow_user_profile')
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'LOADING' })

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))

      const credentials = DEMO_CREDENTIALS[email as keyof typeof DEMO_CREDENTIALS]
      
      if (!credentials || credentials.password !== password) {
        throw new Error('Invalid email or password')
      }

      // Create user object
      const user: User = {
        id: '1',
        email,
        firstName: credentials.role === 'provider' ? 'Dr. John' : 
                  credentials.role === 'staff' ? 'Sarah' : 
                  credentials.role === 'patient' ? 'Jane' : 'Michael',
        lastName: credentials.role === 'provider' ? 'Smith' : 
                 credentials.role === 'staff' ? 'Johnson' : 
                 credentials.role === 'patient' ? 'Doe' : 'Admin',
        role: credentials.role,
        phone: '(555) 123-4567',
        avatar: null,
        isActive: true,
        lastLogin: new Date().toISOString(),
        preferences: {
          theme: 'light',
          notifications: true,
          language: 'en'
        }
      }

      // Store in localStorage
      localStorage.setItem('medflow_auth_token', 'mock-token-' + Date.now())
      localStorage.setItem('medflow_user_profile', JSON.stringify(user))

      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed'
      })
    }
  }

  const logout = (): void => {
    localStorage.removeItem('medflow_auth_token')
    localStorage.removeItem('medflow_user_profile')
    dispatch({ type: 'LOGOUT' })
  }

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}