'use client'

import { useState } from 'react'
import CameraCapture from '@/components/CameraCapture'
import ImageUpload from '@/components/ImageUpload'
import ResultDisplay from '@/components/ResultDisplay'
import { AmuletResult } from '@/types'
import { identifyAmulet } from '@/lib/gemini'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function Home() {
  const [step, setStep] = useState<'input' | 'loading' | 'result'>('input')
  const [result, setResult] = useState<AmuletResult | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleImageCapture = async (imageData: string) => {
    setStep('loading')
    try {
      const identified = await identifyAmulet(imageData)
      setResult({ ...identified, imageData })
      setStep('result')
    } catch (error) {
      console.error('Identification failed:', error)
      alert('Failed to identify amulet. Please try again.')
      setStep('input')
    }
  }

  const handleAmend = (amended: AmuletResult) => {
    setResult(amended)
    alert('✅ Amendments saved!')
  }

  const handleFeedback = async (feedback: {
    accuracy: number
    helpful: boolean
    comment: string
  }) => {
    try {
      await addDoc(collection(db, 'feedback'), {
        ...feedback,
        timestamp: Date.now(),
        amuletName: result?.nameEN,
      })
      alert('✅ Thank you for your feedback!')
    } catch (error) {
      console.error('Feedback submission failed:', error)
      alert('Failed to submit feedback')
    }
  }

  const handleNewSession = () => {
    setStep('input')
    setResult(null)
  }

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} min-h-screen transition-colors`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gold mb-2">🏯 Amulet Scan</h1>
            <p className="text-gray-600 dark:text-gray-300">Thai Amulet Identifier</p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Version Footer */}
        <div className="text-right text-xs text-gray-400 dark:text-gray-500 mb-8">
          v20260330v01
        </div>

        {/* Main Content */}
        {step === 'input' && (
          <div className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl border-2 border-gold shadow-lg">
            <h2 className="text-2xl font-bold text-maroon dark:text-gold mb-6">
              How would you like to identify an amulet?
            </h2>

            <div className="space-y-4">
              <CameraCapture onCapture={handleImageCapture} />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">OR</span>
                </div>
              </div>
              <ImageUpload onUpload={handleImageCapture} />
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin text-5xl mb-4">🔄</div>
            <p className="text-xl font-semibold text-maroon dark:text-gold">
              Identifying amulet...
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Using AI technology to analyze the image
            </p>
          </div>
        )}

        {step === 'result' && result && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border-2 border-gold shadow-lg">
            <ResultDisplay
              result={result}
              onAmend={handleAmend}
              onFeedback={handleFeedback}
              onNewSession={handleNewSession}
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>🙏 Thai Amulet Identifier | Powered by Gemini AI</p>
          <p className="mt-2">For educational and identification purposes only</p>
        </div>
      </div>
    </div>
  )
}
