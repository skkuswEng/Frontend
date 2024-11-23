import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { toast } from '../hooks/useToast'

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type InstallPromptStoreState = {
  showPrompt: boolean
}

type InstallPromptState = {
  deferredPrompt: BeforeInstallPromptEvent | null
  setDeferredPrompt: (
    event: BeforeInstallPromptEvent | null | ((prev: BeforeInstallPromptEvent | null) => BeforeInstallPromptEvent | null),
  ) => void
  setShowPrompt: (value: boolean) => void
  triggerInstall: () => Promise<void>
}

type InstallPromptStore = InstallPromptStoreState & InstallPromptState

export const useInstallPromptStore = create(
  persist<InstallPromptStore>(
    (set, get) => ({
      deferredPrompt: null, // 초기 상태는 null
      setDeferredPrompt: event =>
        set(state => ({
          deferredPrompt: typeof event === 'function' ? event(state.deferredPrompt) : event,
        })),

      showPrompt: true, // true : 닫은적 없음 +  false: 닫은적 있음
      setShowPrompt: value => set({ showPrompt: value }),
      triggerInstall: async () => {
        // PWA 설치 여부 확인
        const isInstalled = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true

        if (isInstalled) {
          toast({ title: '이미 설치된 상태입니다', variant: 'success' })
          return
        }

        const deferredPrompt = get().deferredPrompt
        if (deferredPrompt) {
          await deferredPrompt.prompt()
          const { outcome } = await deferredPrompt.userChoice
          if (outcome === 'accepted') {
            console.log('PWA installed successfully')
            set({ deferredPrompt: null, showPrompt: false })
          } else {
            console.log('User dismissed the install prompt')
            set({ showPrompt: false })
          }
        }
      },
    }),
    {
      name: 'install-prompt-storage',
      partialize: state => ({ showPrompt: state.showPrompt }) as InstallPromptStore, // 로컬 스토리지에 필요한 데이터만 저장
    },
  ),
)
