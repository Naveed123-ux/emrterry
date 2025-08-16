// Storage Keys
export const STORAGE_KEYS = {
  authToken: 'medflow_auth_token',
  refreshToken: 'medflow_refresh_token',
  userProfile: 'medflow_user_profile',
  theme: 'medflow_theme',
  sidebarCollapsed: 'medflow_sidebar_collapsed',
  recentSearches: 'medflow_recent_searches',
  preferences: 'medflow_preferences',
} as const

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    twoFactor: '/auth/two-factor',
    refresh: '/auth/refresh',
  },
  users: {
    profile: '/users/profile',
    update: '/users/update',
    changePassword: '/users/change-password',
    preferences: '/users/preferences',
    organizations: '/users/organizations',
    switchOrganization: '/users/switch-organization',
  },
  patients: {
    list: '/patients',
    create: '/patients',
    get: '/patients/:id',
    update: '/patients/:id',
    delete: '/patients/:id',
    search: '/patients/search',
    history: '/patients/:id/history',
    documents: '/patients/:id/documents',
  },
  appointments: {
    list: '/appointments',
    create: '/appointments',
    get: '/appointments/:id',
    update: '/appointments/:id',
    delete: '/appointments/:id',
    schedule: '/appointments/schedule',
    availability: '/appointments/availability',
    reschedule: '/appointments/:id/reschedule',
    cancel: '/appointments/:id/cancel',
  },
  notes: {
    list: '/notes',
    create: '/notes',
    get: '/notes/:id',
    update: '/notes/:id',
    delete: '/notes/:id',
    templates: '/notes/templates',
    aiSuggestions: '/notes/:id/ai-suggestions',
  },
  prescriptions: {
    list: '/prescriptions',
    create: '/prescriptions',
    get: '/prescriptions/:id',
    update: '/prescriptions/:id',
    delete: '/prescriptions/:id',
    send: '/prescriptions/:id/send',
    refill: '/prescriptions/:id/refill',
  },
  billing: {
    invoices: '/billing/invoices',
    payments: '/billing/payments',
    claims: '/billing/claims',
    reports: '/billing/reports',
    statements: '/billing/statements',
  },
  messaging: {
    list: '/messages',
    send: '/messages',
    get: '/messages/:id',
    markRead: '/messages/:id/read',
    delete: '/messages/:id',
    attachments: '/messages/attachments',
  },
  files: {
    upload: '/files/upload',
    list: '/files',
    get: '/files/:id',
    delete: '/files/:id',
    download: '/files/:id/download',
    thumbnail: '/files/:id/thumbnail',
    search: '/files/search',
  },
  ocr: {
    process: '/ocr/process',
    list: '/ocr/documents',
    get: '/ocr/documents/:id',
    verify: '/ocr/documents/:id/verify',
    approve: '/ocr/documents/:id/approve',
    reject: '/ocr/documents/:id/reject',
  },
  telemedicine: {
    sessions: '/telemedicine/sessions',
    create: '/telemedicine/sessions',
    join: '/telemedicine/sessions/:id/join',
    end: '/telemedicine/sessions/:id/end',
    recording: '/telemedicine/sessions/:id/recording',
  },
  dashboard: {
    stats: '/dashboard/stats',
    appointments: '/dashboard/appointments',
    alerts: '/dashboard/alerts',
    revenue: '/dashboard/revenue',
  },
  forms: {
    list: '/forms',
    create: '/forms',
    get: '/forms/:id',
    submit: '/forms/:id/submit',
    submissions: '/forms/:id/submissions',
  },
} as const

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection and try again.',
  serverError: 'Server error. Please try again later.',
  unauthorized: 'You are not authorized to perform this action.',
  sessionExpired: 'Your session has expired. Please log in again.',
  validation: 'Please check your input and try again.',
  fileUpload: 'Error uploading file. Please try again.',
  fileSize: 'File size exceeds the maximum limit.',
  fileType: 'File type is not supported.',
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number.',
  password: 'Password must be at least 8 characters long.',
  passwordMatch: 'Passwords do not match.',
  generic: 'An error occurred. Please try again.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  login: 'Welcome back! You have successfully logged in.',
  logout: 'You have been logged out successfully.',
  register: 'Account created successfully. Please check your email for verification.',
  passwordReset: 'Password reset email sent successfully.',
  profileUpdate: 'Your profile has been updated successfully.',
  appointmentCreated: 'Appointment scheduled successfully.',
  appointmentUpdated: 'Appointment updated successfully.',
  appointmentCancelled: 'Appointment cancelled successfully.',
  prescriptionSent: 'Prescription sent to pharmacy successfully.',
  noteSaved: 'Clinical note saved successfully.',
  messagesSent: 'Message sent successfully.',
  fileUploaded: 'File uploaded successfully.',
  paymentProcessed: 'Payment processed successfully.',
  emailVerified: 'Email verified successfully.',
  passwordChanged: 'Password changed successfully.',
} as const

// Application Constants
export const APP_CONFIG = {
  name: 'MedFlow EMR',
  version: '1.0.0',
  description: 'Comprehensive Electronic Medical Record Platform',
  company: 'MedFlow Healthcare Solutions',
  supportEmail: 'support@medflow.com',
  supportPhone: '1-800-MEDFLOW',
  website: 'https://medflow.com',
  
  // File upload limits
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedDocumentTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  allowedVideoTypes: ['video/mp4', 'video/webm', 'video/ogg'],
  allowedAudioTypes: ['audio/mp3', 'audio/wav', 'audio/ogg'],
  
  // Pagination
  defaultPageSize: 20,
  maxPageSize: 100,
  
  // Timeouts
  requestTimeout: 30000, // 30 seconds
  sessionTimeout: 3600000, // 1 hour
  
  // Validation rules
  passwordMinLength: 8,
  phoneRegex: /^\(\d{3}\) \d{3}-\d{4}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // UI Constants
  sidebarWidth: 280,
  sidebarCollapsedWidth: 80,
  headerHeight: 64,
  
  // Date formats
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'MM/dd/yyyy HH:mm',
  
  // Theme colors
  themes: {
    light: 'light',
    dark: 'dark',
  },
} as const

// Medical Specializations
export const MEDICAL_SPECIALIZATIONS = [
  'Family Medicine',
  'Internal Medicine',
  'Pediatrics',
  'Cardiology',
  'Dermatology',
  'Emergency Medicine',
  'Endocrinology',
  'Gastroenterology',
  'Geriatrics',
  'Hematology',
  'Infectious Disease',
  'Nephrology',
  'Neurology',
  'Obstetrics and Gynecology',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'Otolaryngology',
  'Pathology',
  'Psychiatry',
  'Pulmonology',
  'Radiology',
  'Rheumatology',
  'Surgery',
  'Urology',
] as const

// Appointment Types
export const APPOINTMENT_TYPES = [
  { value: 'consultation', label: 'Consultation', duration: 30 },
  { value: 'follow-up', label: 'Follow-up', duration: 15 },
  { value: 'procedure', label: 'Procedure', duration: 60 },
  { value: 'emergency', label: 'Emergency', duration: 30 },
  { value: 'telemedicine', label: 'Telemedicine', duration: 30 },
] as const

// Priority Levels
export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'green' },
  { value: 'normal', label: 'Normal', color: 'blue' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
] as const

// Status Colors
export const STATUS_COLORS = {
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
  resolved: 'green',
  chronic: 'orange',
} as const

// Form Field Types
export const FORM_FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'select', label: 'Select Dropdown' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date Picker' },
  { value: 'time', label: 'Time Picker' },
  { value: 'number', label: 'Number Input' },
  { value: 'email', label: 'Email Input' },
  { value: 'phone', label: 'Phone Input' },
  { value: 'file', label: 'File Upload' },
  { value: 'signature', label: 'Digital Signature' },
] as const

// Insurance Providers
export const INSURANCE_PROVIDERS = [
  'Aetna',
  'Anthem',
  'Blue Cross Blue Shield',
  'Cigna',
  'Humana',
  'Kaiser Permanente',
  'Medicaid',
  'Medicare',
  'Molina Healthcare',
  'UnitedHealth',
  'Other',
] as const

// Relationship Types
export const RELATIONSHIP_TYPES = [
  'Spouse',
  'Parent',
  'Child',
  'Sibling',
  'Grandparent',
  'Grandchild',
  'Friend',
  'Guardian',
  'Other',
] as const

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
] as const

// Time Zones
export const TIME_ZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
] as const

// Languages
export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ar', label: 'Arabic' },
] as const

// Vital Signs Ranges (Normal adult values)
export const VITAL_RANGES = {
  systolicBP: { min: 90, max: 120, unit: 'mmHg' },
  diastolicBP: { min: 60, max: 80, unit: 'mmHg' },
  heartRate: { min: 60, max: 100, unit: 'bpm' },
  temperature: { min: 97.8, max: 99.1, unit: '°F' },
  respiratoryRate: { min: 12, max: 20, unit: '/min' },
  oxygenSaturation: { min: 95, max: 100, unit: '%' },
} as const

// Lab Test Categories
export const LAB_CATEGORIES = [
  'Blood Chemistry',
  'Hematology',
  'Immunology',
  'Microbiology',
  'Pathology',
  'Radiology',
  'Cardiology',
  'Endocrinology',
  'Genetics',
  'Toxicology',
] as const

// Medication Routes
export const MEDICATION_ROUTES = [
  'Oral',
  'Intravenous',
  'Intramuscular',
  'Subcutaneous',
  'Topical',
  'Inhalation',
  'Rectal',
  'Sublingual',
  'Transdermal',
  'Nasal',
] as const

// Dosing Frequencies
export const DOSING_FREQUENCIES = [
  { value: 'once-daily', label: 'Once daily' },
  { value: 'twice-daily', label: 'Twice daily' },
  { value: 'three-times-daily', label: 'Three times daily' },
  { value: 'four-times-daily', label: 'Four times daily' },
  { value: 'every-other-day', label: 'Every other day' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'as-needed', label: 'As needed' },
  { value: 'before-meals', label: 'Before meals' },
  { value: 'with-meals', label: 'With meals' },
  { value: 'at-bedtime', label: 'At bedtime' },
] as const

// Alert Icons
export const ALERT_ICONS = {
  appointment: '📅',
  medication: '💊',
  lab_result: '🧪',
  billing: '💰',
  system: '⚙️',
} as const

// Module Icons (using lucide-react icon names)
export const MODULE_ICONS = {
  dashboard: 'LayoutDashboard',
  appointments: 'Calendar',
  patients: 'Users',
  notes: 'FileText',
  prescriptions: 'Pill',
  billing: 'DollarSign',
  messaging: 'MessageSquare',
  files: 'FolderOpen',
  telemedicine: 'Video',
  forms: 'ClipboardList',
  ocr: 'ScanLine',
  reports: 'BarChart3',
  settings: 'Settings',
} as const

// Regex Patterns
export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(\d{3}\) \d{3}-\d{4}$/,
  ssn: /^\d{3}-\d{2}-\d{4}$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  insurancePolicy: /^[A-Za-z0-9]{6,20}$/,
  medicationCode: /^[A-Za-z0-9\-]{6,15}$/,
  procedureCode: /^\d{5}$/,
  diagnosisCode: /^[A-Za-z]\d{2}(\.\d{1,2})?$/,
} as const

// Default Values
export const DEFAULTS = {
  appointmentDuration: 30, // minutes
  reminderTime: 24, // hours before appointment
  sessionTimeout: 30, // minutes
  maxLoginAttempts: 5,
  passwordResetExpiry: 24, // hours
  fileRetentionPeriod: 2555, // days (7 years for medical records)
  backupFrequency: 24, // hours
} as const