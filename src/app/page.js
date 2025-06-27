'use client'

import { useSession } from 'next-auth/react'
import LoginPage from '@/components/LoginPage'
import Dashboard from '@/components/Dashboard'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  if (!session) {
    return <LoginPage />
  }

  return <Dashboard />
}