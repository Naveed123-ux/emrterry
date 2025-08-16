import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authService } from '@/services/authService'
import { User, AuthFormData, LoginResponse } from '@/types'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  token: string | null
  refreshToken: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
  refreshToken: null,
}

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed')
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (formData: AuthFormData, { rejectWithValue }) => {
    try {
      const response = await authService.register(formData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed')
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
      return true
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed')
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser()
      return user
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to get current user')
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send reset email')
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }: { token: string; password: string }, { rejectWithValue }) => {
    try {
      await authService.resetPassword(token, password)
      return true
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to reset password')
    }
  }
)

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token: string, { rejectWithValue }) => {
    try {
      await authService.verifyEmail(token)
      return true
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to verify email')
    }
  }
)

export const verifyTwoFactor = createAsyncThunk(
  'auth/verifyTwoFactor',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await authService.verifyTwoFactor(code)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Two-factor verification failed')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const updatedUser = await authService.updateProfile(data)
      return updatedUser
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setTokens: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
    },
    clearAuth: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      state.refreshToken = null
      state.error = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        // Store tokens in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('medflow_auth_token', action.payload.accessToken)
          localStorage.setItem('medflow_refresh_token', action.payload.refreshToken)
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.user = null
      })

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.token = null
        state.refreshToken = null
        state.error = null
        // Clear tokens from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('medflow_auth_token')
          localStorage.removeItem('medflow_refresh_token')
          localStorage.removeItem('medflow_user_profile')
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Get Current User
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.user = null
      })

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Verify Two Factor
    builder
      .addCase(verifyTwoFactor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyTwoFactor.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        // Store tokens in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('medflow_auth_token', action.payload.accessToken)
          localStorage.setItem('medflow_refresh_token', action.payload.refreshToken)
        }
      })
      .addCase(verifyTwoFactor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, setTokens, clearAuth } = authSlice.actions
export default authSlice.reducer