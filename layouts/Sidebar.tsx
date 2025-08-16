'use client'

import React from 'react'
import { 
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Pill,
  DollarSign,
  MessageSquare,
  FolderOpen,
  Video,
  ClipboardList,
  ScanLine,
  Stethoscope,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '../components/ui/button'

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  roles: string[]
  badge?: string
}

interface SidebarProps {
  currentModule: string
  setCurrentModule: (module: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  user: {
    firstName: string
    lastName: string
    role: string
  }
}

const navigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['provider', 'staff', 'patient', 'admin'],
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: Calendar,
    roles: ['provider', 'staff', 'patient', 'admin'],
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: Users,
    roles: ['provider', 'staff', 'admin'],
  },
  {
    id: 'notes',
    label: 'Clinical Notes',
    icon: FileText,
    roles: ['provider', 'staff'],
  },
  {
    id: 'prescription',
    label: 'e-Prescription',
    icon: Pill,
    roles: ['provider'],
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: DollarSign,
    roles: ['provider', 'staff', 'admin'],
  },
  {
    id: 'messaging',
    label: 'Secure Messaging',
    icon: MessageSquare,
    roles: ['provider', 'staff', 'patient', 'admin'],
  },
  {
    id: 'files',
    label: 'File Management',
    icon: FolderOpen,
    roles: ['provider', 'staff', 'admin'],
  },
  {
    id: 'telemedicine',
    label: 'Telemedicine',
    icon: Video,
    roles: ['provider', 'patient'],
  },
  {
    id: 'intake',
    label: 'Patient Intake',
    icon: ClipboardList,
    roles: ['staff', 'admin'],
  },
  {
    id: 'portal',
    label: 'Patient Portal',
    icon: Users,
    roles: ['patient'],
  },
  {
    id: 'ocr',
    label: 'OCR Workflow',
    icon: ScanLine,
    roles: ['provider', 'staff', 'admin'],
  },
]

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentModule, 
  setCurrentModule, 
  collapsed, 
  setCollapsed, 
  user 
}) => {
  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user.role)
  )

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-50",
      collapsed ? "w-20" : "w-80"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MedFlow EMR</h1>
              <p className="text-xs text-gray-500">Healthcare Platform</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {filteredNavigation.map((item) => {
          const Icon = item.icon
          const isActive = currentModule === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-12 px-3",
                isActive && "bg-blue-600 text-white hover:bg-blue-700",
                !isActive && "text-gray-700 hover:bg-gray-100",
                collapsed && "justify-center px-0"
              )}
              onClick={() => setCurrentModule(item.id)}
            >
              <Icon className={cn(
                "h-5 w-5",
                !collapsed && "mr-3"
              )} />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Button>
          )
        })}
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {user.role.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar