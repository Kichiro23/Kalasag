import { ReactNode } from 'react'
import AnimatedBackground from '@/components/layout/AnimatedBackground'
import BottomNav from '@/components/BottomNav'

interface DashboardLayoutProps {
  children: ReactNode
  showNav?: boolean
}

export default function DashboardLayout({ children, showNav = true }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <AnimatedBackground />
      <div className="relative z-10 px-5 pt-12 pb-32">
        {children}
      </div>
      {showNav && <BottomNav />}
    </div>
  )
}
