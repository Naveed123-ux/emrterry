import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { APP_CONFIG, REGEX_PATTERNS, ERROR_MESSAGES } from './constants'
import { UserRole, AppointmentStatus, PriorityLevel, StatusColor } from '@/types'

// Utility function for combining class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Validation helpers
export function validateEmail(email: string): boolean {
  return REGEX_PATTERNS.email.test(email.trim())
}

export function validatePhone(phone: string): boolean {
  return REGEX_PATTERNS.phone.test(phone)
}

export function validateSSN(ssn: string): boolean {
  return REGEX_PATTERNS.ssn.test(ssn)
}

export function validateZipCode(zipCode: string): boolean {
  return REGEX_PATTERNS.zipCode.test(zipCode)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < APP_CONFIG.passwordMinLength) {
    errors.push(`Password must be at least ${APP_CONFIG.passwordMinLength} characters`)
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Date and time helpers
export function formatDate(date: string | Date, format?: string): string {
  const d = new Date(date)
  const formatStr = format || APP_CONFIG.dateFormat
  
  const options: Intl.DateTimeFormatOptions = {}
  
  if (formatStr.includes('MM/dd/yyyy')) {
    options.month = '2-digit'
    options.day = '2-digit'
    options.year = 'numeric'
  }
  
  if (formatStr.includes('HH:mm')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.hour12 = false
  }
  
  return d.toLocaleDateString('en-US', options)
}

export function formatTime(time: string | Date): string {
  const d = new Date(time)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

export function formatDateTime(dateTime: string | Date): string {
  const d = new Date(dateTime)
  return d.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

export function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  
  return formatDate(date)
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function isToday(date: string | Date): boolean {
  const today = new Date()
  const check = new Date(date)
  
  return today.toDateString() === check.toDateString()
}

export function isTomorrow(date: string | Date): boolean {
  const tomorrow = addDays(new Date(), 1)
  const check = new Date(date)
  
  return tomorrow.toDateString() === check.toDateString()
}

// String helpers
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function capitalizeWords(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str
  return str.substring(0, length - suffix.length) + suffix
}

export function generateId(prefix?: string): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 15)
  return prefix ? `${prefix}_${timestamp}_${randomStr}` : `${timestamp}_${randomStr}`
}

// Number and currency helpers
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount)
}

export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-US', options).format(num)
}

export function parseNumber(str: string): number | null {
  const num = parseFloat(str.replace(/[^0-9.-]/g, ''))
  return isNaN(num) ? null : num
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

// Array helpers
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// File helpers
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)
}

export function isImageFile(filename: string): boolean {
  const ext = getFileExtension(filename).toLowerCase()
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)
}

export function isDocumentFile(filename: string): boolean {
  const ext = getFileExtension(filename).toLowerCase()
  return ['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext)
}

export function getFileIcon(filename: string): string {
  const ext = getFileExtension(filename).toLowerCase()
  
  if (isImageFile(filename)) return '🖼️'
  if (ext === 'pdf') return '📄'
  if (['doc', 'docx'].includes(ext)) return '📝'
  if (['xls', 'xlsx'].includes(ext)) return '📊'
  if (['ppt', 'pptx'].includes(ext)) return '📽️'
  if (['zip', 'rar', '7z'].includes(ext)) return '🗜️'
  if (['mp4', 'avi', 'mov'].includes(ext)) return '🎥'
  if (['mp3', 'wav', 'ogg'].includes(ext)) return '🎵'
  
  return '📎'
}

// URL helpers
export function buildUrl(baseUrl: string, params: Record<string, any>): string {
  const url = new URL(baseUrl)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })
  
  return url.toString()
}

export function getQueryParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  const result: Record<string, string> = {}
  
  params.forEach((value, key) => {
    result[key] = value
  })
  
  return result
}

// Color helpers
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    scheduled: 'blue',
    confirmed: 'green',
    'in-progress': 'yellow',
    completed: 'green',
    cancelled: 'red',
    'no-show': 'gray',
    pending: 'yellow',
    approved: 'green',
    denied: 'red',
    draft: 'gray',
    sent: 'blue',
    paid: 'green',
    overdue: 'red',
    active: 'green',
    inactive: 'gray',
  }
  
  return colors[status] || 'gray'
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: 'green',
    normal: 'blue',
    high: 'orange',
    urgent: 'red',
    critical: 'red',
  }
  
  return colors[priority] || 'gray'
}

// User helpers
export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim()
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function getUserDisplayName(user: { firstName: string; lastName: string; email: string }): string {
  const fullName = getFullName(user.firstName, user.lastName)
  return fullName || user.email
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    provider: 'Healthcare Provider',
    staff: 'Medical Staff',
    patient: 'Patient',
    admin: 'Administrator',
  }
  
  return roleNames[role] || role
}

// Phone number helpers
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  return phone
}

export function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}

// Local storage helpers
export function setLocalStorage(key: string, value: any): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export function getLocalStorage<T>(key: string, defaultValue?: T): T | null {
  if (typeof window === 'undefined') return defaultValue || null
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue || null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue || null
  }
}

export function removeLocalStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

// Error handling helpers
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.data?.message) return error.data.message
  return ERROR_MESSAGES.generic
}

export function isNetworkError(error: any): boolean {
  return (
    error?.code === 'NETWORK_ERROR' ||
    error?.message?.includes('Network') ||
    error?.message?.includes('fetch')
  )
}

// Debounce helper
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle helper
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Device detection
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 1024
}

// Random helpers
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

export function generateColor(seed?: string): string {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
  ]
  
  if (seed) {
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }
  
  return colors[Math.floor(Math.random() * colors.length)]
}

// Deep clone helper
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  
  const cloned = {} as T
  Object.keys(obj).forEach(key => {
    cloned[key as keyof T] = deepClone((obj as any)[key])
  })
  
  return cloned
}

// Medical helpers
export function calculateAge(dateOfBirth: string): number {
  const today = new Date()
  const birth = new Date(dateOfBirth)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

export function calculateBMI(weight: number, height: number): number {
  // weight in kg, height in meters
  return Math.round((weight / (height * height)) * 10) / 10
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

export function formatBloodPressure(systolic: number, diastolic: number): string {
  return `${systolic}/${diastolic} mmHg`
}

export function isBloodPressureNormal(systolic: number, diastolic: number): boolean {
  return systolic >= 90 && systolic <= 120 && diastolic >= 60 && diastolic <= 80
}