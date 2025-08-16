import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  currentModule: string
  sidebarCollapsed: boolean
  theme: 'light' | 'dark'
  notifications: Array<{
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    timestamp: string
    read: boolean
  }>
  loading: {
    global: boolean
    modules: Record<string, boolean>
  }
}

const initialState: AppState = {
  currentModule: 'dashboard',
  sidebarCollapsed: false,
  theme: 'light',
  notifications: [],
  loading: {
    global: false,
    modules: {},
  },
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentModule: (state, action: PayloadAction<string>) => {
      state.currentModule = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    addNotification: (state, action: PayloadAction<{
      title: string
      message: string
      type: 'info' | 'success' | 'warning' | 'error'
    }>) => {
      const notification = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: new Date().toISOString(),
        read: false,
      }
      state.notifications.unshift(notification)
      // Keep only the last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50)
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload
    },
    setModuleLoading: (state, action: PayloadAction<{ module: string; loading: boolean }>) => {
      state.loading.modules[action.payload.module] = action.payload.loading
    },
  },
})

export const {
  setCurrentModule,
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearNotifications,
  setGlobalLoading,
  setModuleLoading,
} = appSlice.actions

export default appSlice.reducer