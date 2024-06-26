import { cn } from '@renderer/utils'
import { ComponentProps, forwardRef } from 'react'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <main className={cn('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside className={cn('w-[250px] !pt-12 h-full  overflow-hidden ', className)} {...props}>
      {children}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex-1 h-full overflow-auto', className)} {...props}>
      {children}
    </div>
  )
})

Content.displayName = 'Content'
