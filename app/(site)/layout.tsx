// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../_components/Navbar'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full max-w-[1400px] mx-auto'>
      <Navbar />
      <div>
        {children}
      </div>
    </div>
  )
}
