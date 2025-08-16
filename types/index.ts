// User and Authentication Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  phone: string
  avatar?: string | null
  isActive: boolean
  lastLogin: string
  preferences: UserPreferences
  organizationId?: string
  department?: string
  specialization?: string
  licenseNumber?: string
  npiNumber?: string
}

export type UserRole = 'provider' | 'staff' | 'patient' | 'admin'

export interface UserPreferences {
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
  timezone?: string
  dateFormat?: string
  timeFormat?: string
}

export interface AuthFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  userType: UserRole
  organizationCode: string
}

export type AuthScreen = 'login' | 'register' | 'forgot-password' | 'two-factor' | 'verify-email'

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
  requiresTwoFactor?: boolean
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T
  message: string
  success: boolean
  errors?: string[]
}

export interface ApiError {
  message: string
  code: string
  details?: any
}

// Patient Types
export interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  address: Address
  emergencyContact: EmergencyContact
  insurance: InsuranceInfo[]
  medicalHistory: MedicalHistory[]
  allergies: Allergy[]
  medications: Medication[]
  createdAt: string
  updatedAt: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

export interface InsuranceInfo {
  id: string
  provider: string
  policyNumber: string
  groupNumber?: string
  isPrimary: boolean
  effectiveDate: string
  expirationDate?: string
}

// Medical Types
export interface MedicalHistory {
  id: string
  condition: string
  diagnosisDate: string
  status: 'active' | 'resolved' | 'chronic'
  notes?: string
}

export interface Allergy {
  id: string
  allergen: string
  severity: 'mild' | 'moderate' | 'severe'
  reaction: string
  notes?: string
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  prescribedBy: string
  prescribedDate: string
  endDate?: string
  notes?: string
}

// Appointment Types
export interface Appointment {
  id: string
  patientId: string
  providerId: string
  type: AppointmentType
  status: AppointmentStatus
  scheduledDate: string
  scheduledTime: string
  duration: number
  location: string
  reason: string
  notes?: string
  followUpRequired?: boolean
  createdAt: string
  updatedAt: string
}

export type AppointmentType = 'consultation' | 'follow-up' | 'procedure' | 'emergency' | 'telemedicine'
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'

// Clinical Notes Types
export interface ClinicalNote {
  id: string
  patientId: string
  providerId: string
  appointmentId?: string
  type: NoteType
  content: string
  templates?: NoteTemplate[]
  aiSuggestions?: AISuggestion[]
  status: 'draft' | 'final' | 'signed'
  createdAt: string
  updatedAt: string
}

export type NoteType = 'soap' | 'progress' | 'procedure' | 'discharge' | 'referral'

export interface NoteTemplate {
  id: string
  name: string
  category: string
  content: string
}

export interface AISuggestion {
  type: 'diagnosis' | 'billing_code' | 'procedure'
  suggestion: string
  confidence: number
  reasoning?: string
}

// Prescription Types
export interface Prescription {
  id: string
  patientId: string
  providerId: string
  medication: string
  dosage: string
  quantity: number
  refills: number
  instructions: string
  status: PrescriptionStatus
  prescribedDate: string
  pharmacy?: PharmacyInfo
  createdAt: string
  updatedAt: string
}

export type PrescriptionStatus = 'pending' | 'sent' | 'filled' | 'cancelled'

export interface PharmacyInfo {
  id: string
  name: string
  address: Address
  phone: string
  fax?: string
}

// Billing Types
export interface Invoice {
  id: string
  patientId: string
  appointmentId?: string
  amount: number
  status: InvoiceStatus
  dueDate: string
  items: InvoiceItem[]
  payments: Payment[]
  insurance?: InsuranceClaim
  createdAt: string
  updatedAt: string
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

export interface InvoiceItem {
  id: string
  description: string
  code: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Payment {
  id: string
  amount: number
  method: PaymentMethod
  transactionId?: string
  processedAt: string
}

export type PaymentMethod = 'cash' | 'card' | 'check' | 'insurance' | 'online'

export interface InsuranceClaim {
  id: string
  claimNumber: string
  status: ClaimStatus
  submittedDate: string
  processedDate?: string
  amount: number
  approvedAmount?: number
}

export type ClaimStatus = 'pending' | 'approved' | 'denied' | 'partially_approved'

// Messaging Types
export interface Message {
  id: string
  senderId: string
  receiverId: string
  subject?: string
  content: string
  type: MessageType
  priority: MessagePriority
  isRead: boolean
  attachments?: Attachment[]
  parentMessageId?: string
  createdAt: string
  updatedAt: string
}

export type MessageType = 'direct' | 'broadcast' | 'appointment' | 'prescription' | 'lab_result'
export type MessagePriority = 'low' | 'normal' | 'high' | 'urgent'

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

// File Management Types
export interface MedicalFile {
  id: string
  patientId: string
  name: string
  type: FileType
  category: FileCategory
  size: number
  mimeType: string
  url: string
  thumbnailUrl?: string
  tags: string[]
  metadata: FileMetadata
  uploadedBy: string
  uploadedAt: string
  lastAccessed?: string
}

export type FileType = 'image' | 'document' | 'video' | 'audio' | 'dicom'
export type FileCategory = 'lab_results' | 'imaging' | 'reports' | 'forms' | 'insurance' | 'other'

export interface FileMetadata {
  originalName: string
  description?: string
  keywords?: string[]
  extractedText?: string
  ocrProcessed?: boolean
  faceDetected?: boolean
  patientConsent?: boolean
}

// OCR Types
export interface OCRDocument {
  id: string
  originalFile: MedicalFile
  extractedData: ExtractedData
  verificationStatus: VerificationStatus
  verifiedBy?: string
  verifiedAt?: string
  confidence: number
  createdAt: string
  updatedAt: string
}

export interface ExtractedData {
  text: string
  structuredData: StructuredData
  tables?: TableData[]
  forms?: FormData[]
}

export interface StructuredData {
  patientInfo?: PatientInfo
  dates?: DateInfo[]
  medications?: MedicationInfo[]
  diagnoses?: DiagnosisInfo[]
  procedures?: ProcedureInfo[]
  vitals?: VitalInfo[]
}

export interface PatientInfo {
  name?: string
  dateOfBirth?: string
  id?: string
  ssn?: string
  address?: string
  phone?: string
}

export interface DateInfo {
  type: 'appointment' | 'procedure' | 'prescription' | 'diagnosis'
  date: string
  confidence: number
}

export interface MedicationInfo {
  name: string
  dosage?: string
  frequency?: string
  confidence: number
}

export interface DiagnosisInfo {
  code?: string
  description: string
  confidence: number
}

export interface ProcedureInfo {
  code?: string
  description: string
  date?: string
  confidence: number
}

export interface VitalInfo {
  type: 'blood_pressure' | 'heart_rate' | 'temperature' | 'weight' | 'height'
  value: string
  unit?: string
  confidence: number
}

export interface TableData {
  headers: string[]
  rows: string[][]
  confidence: number
}

export interface FormData {
  fields: FormField[]
  confidence: number
}

export interface FormField {
  label: string
  value: string
  type: 'text' | 'checkbox' | 'date' | 'number'
  confidence: number
}

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'requires_review'

// Telemedicine Types
export interface TeleMedicineSession {
  id: string
  appointmentId: string
  patientId: string
  providerId: string
  status: SessionStatus
  roomId: string
  startTime?: string
  endTime?: string
  duration?: number
  recordingUrl?: string
  notes?: string
  participants: Participant[]
  createdAt: string
  updatedAt: string
}

export type SessionStatus = 'scheduled' | 'waiting' | 'active' | 'ended' | 'cancelled'

export interface Participant {
  userId: string
  role: UserRole
  joinedAt?: string
  leftAt?: string
  connectionQuality?: ConnectionQuality
}

export type ConnectionQuality = 'excellent' | 'good' | 'fair' | 'poor'

// Form Types
export interface IntakeForm {
  id: string
  title: string
  description: string
  fields: FormField[]
  isActive: boolean
  requiredFor: UserRole[]
  category: FormCategory
  version: number
  createdAt: string
  updatedAt: string
}

export type FormCategory = 'general' | 'specialty' | 'pre_visit' | 'post_visit' | 'insurance'

export interface FormSubmission {
  id: string
  formId: string
  patientId: string
  submittedBy: string
  responses: FormResponse[]
  status: SubmissionStatus
  submittedAt: string
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
}

export interface FormResponse {
  fieldId: string
  value: any
  attachments?: Attachment[]
}

export type SubmissionStatus = 'submitted' | 'under_review' | 'approved' | 'requires_changes'

// Dashboard Types
export interface DashboardStats {
  appointments: AppointmentStats
  patients: PatientStats
  revenue: RevenueStats
  alerts: Alert[]
}

export interface AppointmentStats {
  today: number
  thisWeek: number
  thisMonth: number
  upcomingToday: Appointment[]
  recentCancellations: number
}

export interface PatientStats {
  total: number
  newThisMonth: number
  activePatients: number
  criticalAlerts: number
}

export interface RevenueStats {
  thisMonth: number
  lastMonth: number
  outstanding: number
  collected: number
}

export interface Alert {
  id: string
  type: AlertType
  title: string
  message: string
  severity: AlertSeverity
  patientId?: string
  appointmentId?: string
  createdAt: string
  isRead: boolean
  actionRequired?: boolean
}

export type AlertType = 'appointment' | 'medication' | 'lab_result' | 'billing' | 'system'
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical'

// Search and Filter Types
export interface SearchFilters {
  query?: string
  dateRange?: DateRange
  status?: string[]
  category?: string[]
  provider?: string[]
  patient?: string[]
}

export interface DateRange {
  start: string
  end: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Notification Types
export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  appointmentReminders: boolean
  labResults: boolean
  prescriptionUpdates: boolean
  billingNotices: boolean
}

// Settings Types
export interface OrganizationSettings {
  id: string
  name: string
  address: Address
  phone: string
  email: string
  website?: string
  logo?: string
  branding: BrandingSettings
  features: FeatureSettings
  integrations: IntegrationSettings
}

export interface BrandingSettings {
  primaryColor: string
  secondaryColor: string
  logoUrl?: string
  favicon?: string
}

export interface FeatureSettings {
  telemedicine: boolean
  ePrescription: boolean
  billingIntegration: boolean
  ocrProcessing: boolean
  aiAssistant: boolean
  patientPortal: boolean
}

export interface IntegrationSettings {
  pharmacySystem?: string
  labSystem?: string
  imagingSystem?: string
  billingSystem?: string
  ehrSystem?: string
}

// Audit Types
export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId: string
  changes?: Record<string, any>
  ipAddress: string
  userAgent: string
  timestamp: string
}

// Export all types for easy importing
export type {
  // Re-export commonly used types for convenience
  User as MedFlowUser,
  Patient as MedFlowPatient,
  Appointment as MedFlowAppointment,
  ClinicalNote as MedFlowNote,
  Prescription as MedFlowPrescription,
  Invoice as MedFlowInvoice,
  Message as MedFlowMessage,
  MedicalFile as MedFlowFile
}