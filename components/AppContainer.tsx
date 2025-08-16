import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import MainLayout from '../layouts/MainLayout'
import DashboardPage from '../pages/DashboardPage'
import AppointmentScheduling from './AppointmentScheduling'
import PatientIntakeForms from './PatientIntakeForms'
import PatientPortal from './PatientPortal'
import SecureMessaging from './SecureMessaging'
import BillingInvoicing from './BillingInvoicing'
import EPrescription from './EPrescription'
import Telemedicine from './Telemedicine'
import ClinicalNotes from './ClinicalNotes'
import FileManagement from './FileManagement'
import OCRWorkflow from './OCRWorkflow'

export const AppContainer: React.FC = () => {
  const { user } = useAuth()
  const [currentModule, setCurrentModule] = React.useState('dashboard')

  // Check user permissions for the current module
  useEffect(() => {
    // Add any global app initialization logic here
    document.title = `MedFlow EMR - ${currentModule.charAt(0).toUpperCase() + currentModule.slice(1)}`
  }, [currentModule])

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <DashboardPage />
      case 'appointments':
        return <AppointmentScheduling />
      case 'intake':
        return <PatientIntakeForms />
      case 'portal':
        return <PatientPortal />
      case 'messaging':
        return <SecureMessaging />
      case 'billing':
        return <BillingInvoicing />
      case 'prescription':
        return <EPrescription />
      case 'telemedicine':
        return <Telemedicine />
      case 'notes':
        return <ClinicalNotes />
      case 'files':
        return <FileManagement />
      case 'ocr':
        return <OCRWorkflow />
      default:
        return <DashboardPage />
    }
  }

  return (
    <MainLayout currentModule={currentModule} setCurrentModule={setCurrentModule}>
      {renderModule()}
    </MainLayout>
  )
}

export default AppContainer