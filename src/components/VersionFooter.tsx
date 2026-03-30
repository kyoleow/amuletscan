'use client'

import { useState } from 'react'

interface VersionFooterProps {
  version?: string
  showBuildDetails?: boolean
}

export default function VersionFooter({
  version = 'v20260330v02',
  showBuildDetails = true,
}: VersionFooterProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Extract version components
  const versionMatch = version.match(/v(\d{8})v(\d+)/)
  const buildDate = versionMatch
    ? `${versionMatch[1].slice(0, 4)}-${versionMatch[1].slice(4, 6)}-${versionMatch[1].slice(6, 8)}`
    : 'unknown'
  const buildNumber = versionMatch ? parseInt(versionMatch[2]) : 0

  const handleClick = () => {
    if (showBuildDetails) {
      setShowDetails(!showDetails)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`text-xs text-gray-400 dark:text-gray-500 opacity-60 hover:opacity-100 transition-opacity ${
          showBuildDetails ? 'cursor-pointer' : ''
        }`}
        onClick={handleClick}
        title={showBuildDetails ? 'Click for build details' : ''}
      >
        {version}
      </div>

      {showBuildDetails && showDetails && (
        <div className="absolute bottom-6 right-0 bg-gray-800 dark:bg-gray-700 text-gray-100 p-3 rounded-lg shadow-lg text-xs w-48 border border-gray-700 dark:border-gray-600">
          <div className="space-y-1">
            <div>
              <span className="text-gray-400">Version:</span> {version}
            </div>
            <div>
              <span className="text-gray-400">Build Date:</span> {buildDate}
            </div>
            <div>
              <span className="text-gray-400">Build #:</span> {buildNumber}
            </div>
            <div className="pt-2 border-t border-gray-600 mt-2">
              <span className="text-gray-500 text-xs">Tap to hide details</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
