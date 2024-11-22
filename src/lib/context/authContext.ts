// stores/authStore.ts
import { create } from 'zustand'

// Zustand 상태 정의
interface AuthState {
  studentId: string | null
  name: string | null
  setAuthData: (studentId: string, studentName: string) => void
  clearAuthData: () => void
  initializeAuth: () => void
}

const useAuthStore = create<AuthState>(set => ({
  studentId: null,
  name: null,
  setAuthData: (studentId, name) => {
    localStorage.setItem('authData', JSON.stringify({ studentId, name }))
    set({ studentId, name })
  },
  clearAuthData: () => {
    localStorage.removeItem('authData')
    set({ studentId: null, name: null })
  },
  initializeAuth: () => {
    const storedData = localStorage.getItem('authData')
    if (storedData) {
      const { studentId, name } = JSON.parse(storedData)
      set({ studentId, name })
    }
  },
}))

export default useAuthStore
