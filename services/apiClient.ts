import { ApiResponse, ApiError } from '@/types'
import { STORAGE_KEYS, ERROR_MESSAGES } from '@/utils/constants'
import { getErrorMessage } from '@/utils/helpers'

// Request configuration interface
interface RequestConfig {
  headers?: Record<string, string>
  timeout?: number
  retries?: number
}

// Response interceptor type
type ResponseInterceptor<T = any> = (response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>

// Request interceptor type
type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>

// HTTP Methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// API Client Class
class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>
  private defaultTimeout: number
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
    this.defaultTimeout = 30000 // 30 seconds

    // Add default request interceptor for authentication
    this.addRequestInterceptor(this.authInterceptor.bind(this))
    
    // Add default response interceptor for error handling
    this.addResponseInterceptor(this.errorInterceptor.bind(this))
  }

  // Demo credentials for frontend-only development
  private readonly DEMO_CREDENTIALS = {
    'provider@medflow.com': { password: 'Provider123!', role: 'provider' },
    'staff@medflow.com': { password: 'Staff123!', role: 'staff' },
    'patient@medflow.com': { password: 'Patient123!', role: 'patient' },
    'admin@medflow.com': { password: 'Admin123!', role: 'admin' },
    'demo@medflow.com': { password: 'Demo123!', role: 'provider' },
  }

  // Mock authentication for demo purposes
  private handleMockAuth(endpoint: string, data: any): any {
    if (endpoint === '/auth/login') {
      const { email, password } = data
      const user = this.DEMO_CREDENTIALS[email as keyof typeof this.DEMO_CREDENTIALS]
      
      if (!user || user.password !== password) {
        throw {
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS'
        }
      }

      // Return mock login response
      return {
        data: {
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: {
            id: '1',
            email,
            firstName: user.role === 'provider' ? 'Dr. John' : user.role === 'staff' ? 'Sarah' : user.role === 'patient' ? 'Jane' : 'Michael',
            lastName: user.role === 'provider' ? 'Smith' : user.role === 'staff' ? 'Johnson' : user.role === 'patient' ? 'Doe' : 'Admin',
            role: user.role,
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
        },
        message: 'Login successful',
        success: true
      }
    }

    if (endpoint === '/users/profile') {
      return {
        data: {
          id: '1',
          email: 'demo@medflow.com',
          firstName: 'Dr. John',
          lastName: 'Smith',
          role: 'provider',
          phone: '(555) 123-4567',
          avatar: null,
          isActive: true,
          lastLogin: new Date().toISOString(),
          preferences: {
            theme: 'light',
            notifications: true,
            language: 'en'
          }
        },
        message: 'Profile retrieved',
        success: true
      }
    }

    if (endpoint === '/auth/logout') {
      return {
        data: null,
        message: 'Logout successful',
        success: true
      }
    }

    if (endpoint === '/auth/register') {
      return {
        data: {
          message: 'Registration successful. Please check your email to verify your account.',
          requiresEmailVerification: true
        },
        message: 'Registration successful',
        success: true
      }
    }

    if (endpoint === '/auth/forgot-password') {
      return {
        data: {
          message: 'Password reset email sent successfully.'
        },
        message: 'Password reset email sent',
        success: true
      }
    }

    // Default mock response for other endpoints
    return {
      data: null,
      message: 'Mock response',
      success: true
    }
  }

  // Add request interceptor
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor)
  }

  // Add response interceptor
  addResponseInterceptor<T>(interceptor: ResponseInterceptor<T>): void {
    this.responseInterceptors.push(interceptor as ResponseInterceptor)
  }

  // Default auth interceptor
  private async authInterceptor(config: RequestConfig): Promise<RequestConfig> {
    const token = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.authToken) : null
    
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    return config
  }

  // Default error interceptor
  private async errorInterceptor<T>(response: ApiResponse<T>): Promise<ApiResponse<T>> {
    // Handle token refresh if needed
    if (response.data && typeof response.data === 'object' && 'code' in response.data) {
      const errorCode = (response.data as any).code
      
      if (errorCode === 'TOKEN_EXPIRED' || errorCode === 'UNAUTHORIZED') {
        await this.handleTokenRefresh()
      }
    }

    return response
  }

  // Handle token refresh
  private async handleTokenRefresh(): Promise<void> {
    try {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.refreshToken) : null
      
      if (!refreshToken) {
        this.clearAuth()
        return
      }

      const response = await this.post<{
        accessToken: string
        refreshToken: string
      }>('/auth/refresh', { refreshToken })

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.authToken, response.data.accessToken)
        localStorage.setItem(STORAGE_KEYS.refreshToken, response.data.refreshToken)
      }
    } catch (error) {
      this.clearAuth()
      // Dispatch logout event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:logout'))
      }
    }
  }

  // Clear authentication tokens
  private clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.authToken)
      localStorage.removeItem(STORAGE_KEYS.refreshToken)
      localStorage.removeItem(STORAGE_KEYS.userProfile)
    }
  }

  // Apply interceptors to config
  private async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let finalConfig = config
    
    for (const interceptor of this.requestInterceptors) {
      finalConfig = await interceptor(finalConfig)
    }
    
    return finalConfig
  }

  // Apply response interceptors
  private async applyResponseInterceptors<T>(response: ApiResponse<T>): Promise<ApiResponse<T>> {
    let finalResponse = response
    
    for (const interceptor of this.responseInterceptors) {
      finalResponse = await interceptor(finalResponse)
    }
    
    return finalResponse
  }

  // Build full URL
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    let url = `${this.baseURL}${endpoint}`
    
    // Replace path parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, encodeURIComponent(String(value)))
      })
    }
    
    return url
  }

  // Build query string
  private buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, String(item)))
        } else {
          searchParams.set(key, String(value))
        }
      }
    })
    
    return searchParams.toString()
  }

  // Make HTTP request
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    config: RequestConfig = {},
    pathParams?: Record<string, any>,
    queryParams?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    try {
      // Handle mock authentication for demo (frontend-only)
      if (process.env.NODE_ENV === 'development' || typeof window !== 'undefined') {
        const mockResponse = this.handleMockAuth(endpoint, data)
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        return mockResponse as ApiResponse<T>
      }

      // Apply request interceptors
      const finalConfig = await this.applyRequestInterceptors({
        ...config,
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
        timeout: config.timeout || this.defaultTimeout,
      })

      // Build URL
      let url = this.buildUrl(endpoint, pathParams)
      
      // Add query parameters
      if (queryParams) {
        const queryString = this.buildQueryString(queryParams)
        if (queryString) {
          url += `?${queryString}`
        }
      }

      // Create AbortController for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), finalConfig.timeout)

      // Prepare request options
      const requestOptions: RequestInit = {
        method,
        headers: finalConfig.headers,
        signal: controller.signal,
      }

      // Add body for POST, PUT, PATCH requests
      if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
        if (data instanceof FormData) {
          // Remove Content-Type header for FormData to let browser set it
          delete requestOptions.headers!['Content-Type']
          requestOptions.body = data
        } else {
          requestOptions.body = JSON.stringify(data)
        }
      }

      // Make request
      const response = await fetch(url, requestOptions)
      clearTimeout(timeoutId)

      // Parse response
      let responseData: any
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json()
      } else {
        responseData = await response.text()
      }

      // Handle HTTP errors
      if (!response.ok) {
        const apiError: ApiError = {
          message: responseData?.message || ERROR_MESSAGES.serverError,
          code: responseData?.code || 'HTTP_ERROR',
          details: responseData?.details,
        }
        
        throw apiError
      }

      // Create API response
      const apiResponse: ApiResponse<T> = {
        data: responseData?.data || responseData,
        message: responseData?.message || 'Success',
        success: responseData?.success !== false,
        errors: responseData?.errors,
      }

      // Apply response interceptors
      return await this.applyResponseInterceptors(apiResponse)

    } catch (error: any) {
      // Handle network errors
      if (error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      
      if (typeof window !== 'undefined' && !navigator.onLine) {
        throw new Error(ERROR_MESSAGES.network)
      }

      // Re-throw API errors
      if (error.code) {
        throw error
      }

      // Handle other errors
      throw new Error(getErrorMessage(error))
    }
  }

  // HTTP method shortcuts
  async get<T>(
    endpoint: string,
    config?: RequestConfig,
    pathParams?: Record<string, any>,
    queryParams?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config, pathParams, queryParams)
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
    pathParams?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, config, pathParams)
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
    pathParams?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config, pathParams)
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
    pathParams?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, config, pathParams)
  }

  async delete<T>(
    endpoint: string,
    config?: RequestConfig,
    pathParams?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config, pathParams)
  }

  // Upload file
  async uploadFile<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
    }

    // For file uploads, we'll use the standard post method
    // In a real implementation, you might want to handle progress differently
    return this.post<T>(endpoint, formData)
  }

  // Download file
  async downloadFile(
    endpoint: string,
    filename?: string,
    pathParams?: Record<string, any>
  ): Promise<void> {
    try {
      const config = await this.applyRequestInterceptors({
        headers: this.defaultHeaders,
      })

      const url = this.buildUrl(endpoint, pathParams)
      
      const response = await fetch(url, {
        headers: config.headers,
      })

      if (!response.ok) {
        throw new Error('Download failed')
      }

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename || 'download'
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.get('/health')
      return true
    } catch (error) {
      return false
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient(
  process.env.NODE_ENV === 'production' 
    ? 'https://api.medflow.com/v1' 
    : '/api/v1'
)