import { User, AuthFormData, ApiResponse } from '@/types'
import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '@/utils/constants'

// Authentication Response Types
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
  requiresTwoFactor?: boolean
}

export interface RegisterResponse {
  message: string
  requiresEmailVerification: boolean
}

export interface ForgotPasswordResponse {
  message: string
}

export interface TwoFactorResponse {
  accessToken: string
  refreshToken: string
  user: User
}

// Authentication Service
class AuthService {
  // Login user
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.auth.login,
      { email, password }
    )
    
    return response.data.data
  }

  // Register new user
  async register(formData: AuthFormData): Promise<RegisterResponse> {
    const response = await apiClient.post<ApiResponse<RegisterResponse>>(
      API_ENDPOINTS.auth.register,
      {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        role: formData.userType,
        organizationCode: formData.organizationCode,
      }
    )
    
    return response.data.data
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.auth.logout)
    } catch (error) {
      // Handle logout errors gracefully
      console.error('Logout error:', error)
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    const response = await apiClient.post<ApiResponse<ForgotPasswordResponse>>(
      API_ENDPOINTS.auth.forgotPassword,
      { email }
    )
    
    return response.data.data
  }

  // Reset password
  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.auth.resetPassword,
      { token, password }
    )
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    await apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.auth.verifyEmail,
      { token }
    )
  }

  // Verify two-factor authentication
  async verifyTwoFactor(code: string): Promise<TwoFactorResponse> {
    const response = await apiClient.post<ApiResponse<TwoFactorResponse>>(
      API_ENDPOINTS.auth.twoFactor,
      { code }
    )
    
    return response.data.data
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.users.profile
    )
    
    return response.data.data
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(
      API_ENDPOINTS.users.update,
      data
    )
    
    return response.data.data
  }

  // Refresh authentication token
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.auth.refresh,
      { refreshToken }
    )
    
    return response.data.data
  }

  // Check if user has specific permission
  async checkPermission(permission: string): Promise<boolean> {
    try {
      const user = await this.getCurrentUser()
      // Permission checking logic would depend on your backend implementation
      // This is a placeholder implementation
      return true
    } catch (error) {
      return false
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post<ApiResponse<void>>(
      '/auth/change-password',
      { currentPassword, newPassword }
    )
  }

  // Enable/disable two-factor authentication
  async updateTwoFactorAuth(enabled: boolean): Promise<{ qrCode?: string; backupCodes?: string[] }> {
    const response = await apiClient.post<ApiResponse<{ qrCode?: string; backupCodes?: string[] }>>(
      '/auth/two-factor/setup',
      { enabled }
    )
    
    return response.data.data
  }

  // Validate session
  async validateSession(): Promise<boolean> {
    try {
      await this.getCurrentUser()
      return true
    } catch (error) {
      return false
    }
  }

  // Get user organizations
  async getUserOrganizations(): Promise<Array<{ id: string; name: string; role: string }>> {
    const response = await apiClient.get<ApiResponse<Array<{ id: string; name: string; role: string }>>>(
      '/users/organizations'
    )
    
    return response.data.data
  }

  // Switch organization context
  async switchOrganization(organizationId: string): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>(
      '/users/switch-organization',
      { organizationId }
    )
    
    return response.data.data
  }

  // Resend verification email
  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/resend-verification',
      { email }
    )
    
    return response.data.data
  }
}

// Export singleton instance
export const authService = new AuthService()