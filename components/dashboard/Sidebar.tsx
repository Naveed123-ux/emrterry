'use client'

import { useSelector, useDispatch } from 'react-redux'
import { 
  LayoutDashboard, Calendar, Users, FileText, Pill, DollarSign, 
  MessageSquare, FolderOpen, Video, Stethoscope, ChevronLeft, ChevronRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RootState, AppDispatch } from '@/store'
import { setCurrentModule, toggleSidebar } from '@/store/slices/appSlice'

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['provider', 'staff', 'patient', 'admin'] },
  { id: 'appointments', label: 'Appointments', icon: Calendar, roles: ['provider', 'staff', 'patient', 'admin'] },
  { id: 'patients', label: 'Patients', icon: Users, roles: ['provider', 'staff', 'admin'] },
  { id: 'notes', label: 'Clinical Notes', icon: FileText, roles: ['provider', 'staff'] },
  { id: 'prescriptions', label: 'Prescriptions', icon: Pill, roles: ['provider'] },
  { id: 'billing', label: 'Billing', icon: DollarSign, roles: ['provider', 'staff', 'admin'] },
  { id: 'messaging', label: 'Messages', icon: MessageSquare, roles: ['provider', 'staff', 'patient', 'admin'] },
  { id: 'files', label: 'Files', icon: FolderOpen, roles: ['provider', 'staff', 'admin'] },
  { id: 'telemedicine', label: 'Telemedicine', icon: Video, roles: ['provider', 'patient'] },
]

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>()
  const { currentModule, sidebarOpen } = useSelector((state: RootState) => state.app)
  const { user } = useSelector((state: RootState) => state.auth)

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  )

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-50 ${
      sidebarOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {sidebarOpen && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MedFlow</h1>
              <p className="text-xs text-gray-500">EMR Platform</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleSidebar())}
          className="p-2"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
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
              className={`w-full h-12 ${sidebarOpen ? 'justify-start px-3' : 'justify-center px-0'} ${
                isActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => dispatch(setCurrentModule(item.id))}
            >
              <Icon className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </Button>
          )
        })}
      </nav>

      {/* User Info */}
      {sidebarOpen && user && (
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
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}