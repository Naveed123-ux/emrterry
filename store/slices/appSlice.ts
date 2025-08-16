import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  currentModule: string
  sidebarOpen: boolean
}

const initialState: AppState = {
  currentModule: 'dashboard',
  sidebarOpen: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentModule: (state, action: PayloadAction<string>) => {
      state.currentModule = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
  },
})

export const { setCurrentModule, toggleSidebar, setSidebarOpen } = appSlice.actions
export default appSlice.reducer