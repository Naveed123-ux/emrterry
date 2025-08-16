'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Sidebar from './Sidebar'
import Header from './Header'
import DashboardContent from './DashboardContent'
import AppointmentsModule from './modules/AppointmentsModule'
import PatientsModule from './modules/PatientsModule'
import NotesModule from './modules/NotesModule'
import PrescriptionsModule from './modules/PrescriptionsModule'
import BillingModule from './modules/BillingModule'
import MessagingModule from './modules/MessagingModule'
import FilesModule from './modules/FilesModule'
import TelemedicineModule from './modules/TelemedicineModule'

export default function Dashboard() {
  const { currentModule } = useSelector((state: RootState) => state.app)
  const { sidebarOpen } = useSelector((state: RootState) => state.app)

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <DashboardContent />
      case 'appointments':
        return <AppointmentsModule />
      case 'patients':
        return <PatientsModule />
      case 'notes':
        return <NotesModule />
      case 'prescriptions':
        return <PrescriptionsModule />
      case 'billing':
        return <BillingModule />
      case 'messaging':
        return <MessagingModule />
      case 'files':
        return <FilesModule />
      case 'telemedicine':
        return <TelemedicineModule />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  )
}