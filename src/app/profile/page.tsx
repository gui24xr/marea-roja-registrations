'use client'
import React from 'react'
import { UserButton, UserProfile } from '@clerk/nextjs'

export default function page() {

  
  return (
    <div>
        <h1>profile</h1>
        <UserButton/>
        <UserProfile/>
        
    </div>
  )
}
