import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'Marea Roja',
  description: 'Gestión de registros - Marea Roja',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <ClerkProvider>
          <Navbar />
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-gray-200 py-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Marea Roja
          </footer>
        </ClerkProvider>
      </body>
    </html>
  )
}