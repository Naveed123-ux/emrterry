export const APPOINTMENT_MOCK_DATA = {
  appointments: [
    { id: '1', patient: 'John Smith', time: '09:00 AM', type: 'Consultation', status: 'confirmed' as const },
    { id: '2', patient: 'Sarah Johnson', time: '09:30 AM', type: 'Follow-up', status: 'pending' as const },
    { id: '3', patient: 'Michael Brown', time: '10:00 AM', type: 'Procedure', status: 'confirmed' as const },
    { id: '4', patient: 'Emily Davis', time: '10:30 AM', type: 'Consultation', status: 'cancelled' as const },
  ],
  stats: {
    today: 12,
    thisWeek: 48,
    newPatients: 8,
    cancellations: 3
  }
}

export const APPOINTMENT_STATUS_CONFIG = {
  confirmed: { variant: 'default' as const, color: 'green' },
  pending: { variant: 'secondary' as const, color: 'yellow' },
  cancelled: { variant: 'destructive' as const, color: 'red' },
  completed: { variant: 'default' as const, color: 'blue' },
} as const

export type AppointmentStatus = keyof typeof APPOINTMENT_STATUS_CONFIG