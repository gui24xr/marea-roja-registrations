import React from 'react'
import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {

  const user = await currentUser()
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hola {user?.fullName}</p>
    </div>
  )
}
