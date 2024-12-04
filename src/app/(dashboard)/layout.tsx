import { Logo } from '@/components/logo'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React, { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <SignedIn>
      <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
        <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
          <Logo />
          <div className="flex gap-4 items-center">
            <UserButton />
          </div>
        </nav>
        <main className="flex w-full flex-grow">{children}</main>
      </div>
    </SignedIn>
  )
}

export default Layout
