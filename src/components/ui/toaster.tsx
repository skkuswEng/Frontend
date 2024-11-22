'use client'

import { Toast, ToastClose, ToastProvider, ToastTitle, ToastViewport } from '@/src/components/ui/toast'
import { useToast } from '@/src/lib/hooks/useToast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} duration={2000}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {/* {description && <ToastDescription>{description}</ToastDescription>} */}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
