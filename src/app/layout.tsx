import type { Metadata } from 'next'
import './globals.css'
import VersionFooter from '@/components/VersionFooter'

export const metadata: Metadata = {
  title: 'Amulet Scan - Thai Amulet Identifier',
  description: 'Identify Thai amulets using AI technology. Powered by Gemini.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </div>
        <VersionFooter version="v20260330v02" showBuildDetails={true} />
      </body>
    </html>
  )
}
