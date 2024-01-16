import type { Metadata } from 'next'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'

export const metadata: Metadata = {
  title: 'Flix | Cari Film dan TV Show Favoritmu',
  description: 'Cari Film dan TV Show Favoritmu',
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className='border-b-2 border-red-500 border-opacity-30'>
        <Navbar />
      </div>
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}
