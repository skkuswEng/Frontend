import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/src/lib/utils/cn'

export const variant = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  // Custom Buttons
  swWhite: 'bg-swWhite text-black border border-black border-solid hover:bg-swGrayLight hover:shadow-none',
  swBlack: 'border border-solid border-swBlack bg-swBlack text-swWhite hover:text-swBlack hover:bg-swWhite disabled:bg-swGrayDark',
  swGreen: 'bg-swGreen text-black border border-solid border-swBlack hover:bg-swHoverGreen disabled:bg-swDisabledGreen',
  swLightGreen: 'bg-swGreenLight text-black border border-solid border-swBlack hover:bg-swHoverGreenLight disabled:bg-swDisabledGreenLight',
  swRed: 'bg-swRed text-black border border-solid border-black hover:bg-swHoverRed disabled:bg-swDisabledRed',

  // Disabled Buttons
  swBlackDisabled: 'border border-solid border-swBlack bg-swGrayDark text-swWhite',
  swGreenDisabled: 'bg-swDisabledGreen text-black border border-solid border-swBlue',
  swLightGreenDisabled: 'bg-swDisabledGreenLight text-black border border-solid border-swBlack',
  swRedDisabled: 'bg-swDisabledRed text-black border border-solid border-black',
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: variant,
      size: {
        default: 'box-border h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, disabled = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={disabled} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
