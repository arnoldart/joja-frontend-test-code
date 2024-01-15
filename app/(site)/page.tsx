'use client'
import { useSearchContext } from '@/context/SearchProvider'
import { useAPi } from '@/utils/api'
import Navbar from './_components/Navbar'
import { useState } from 'react';

export default function Home() {
  const { searchQuery } = useSearchContext();
  const { data, error, isLoading } = useAPi(searchQuery);
  
  return (
    <main>
      <section>
        <Navbar />
      </section>
      <section>

      </section>
    </main>
  )
}
