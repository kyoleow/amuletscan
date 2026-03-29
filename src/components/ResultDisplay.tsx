'use client'

import { AmuletResult } from '@/types'
import { useState } from 'react'

interface ResultDisplayProps {
  result: AmuletResult
  onAmend: (amended: AmuletResult) => void
  onFeedback: (feedback: { accuracy: number; helpful: boolean; comment: string }) => void
  onNewSession: () => void
}

export default function ResultDisplay({
  result,
  onAmend,
  onFeedback,
  onNewSession,
}: ResultDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedResult, setEditedResult] = useState(result)
  const [feedbackRating, setFeedbackRating] = useState(0)

  const handleSaveAmendment = () => {
    onAmend(editedResult)
    setIsEditing(false)
  }

  return (
    <div className="w-full space-y-6">
      {/* Result Image */}
      {result.imageData && (
        <div className="w-full">
          <img
            src={result.imageData}
            alt="Amulet"
            className="w-full h-64 object-cover rounded-lg border-2 border-gold"
          />
        </div>
      )}

      {/* Main Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-gold">
          <label className="block text-sm font-semibold mb-1">Temple</label>
          {isEditing ? (
            <input
              type="text"
              value={editedResult.temple}
              onChange={(e) => setEditedResult({ ...editedResult, temple: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          ) : (
            <p className="text-lg">{result.temple}</p>
          )}
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-gold">
          <label className="block text-sm font-semibold mb-1">Type</label>
          {isEditing ? (
            <input
              type="text"
              value={editedResult.type}
              onChange={(e) => setEditedResult({ ...editedResult, type: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          ) : (
            <p className="text-lg">{result.type}</p>
          )}
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-gold">
          <label className="block text-sm font-semibold mb-1">Name (English)</label>
          {isEditing ? (
            <input
              type="text"
              value={editedResult.nameEN}
              onChange={(e) => setEditedResult({ ...editedResult, nameEN: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          ) : (
            <p className="text-lg">{result.nameEN}</p>
          )}
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-gold">
          <label className="block text-sm font-semibold mb-1">Name (Thai)</label>
          {isEditing ? (
            <input
              type="text"
              value={editedResult.nameTH}
              onChange={(e) => setEditedResult({ ...editedResult, nameTH: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          ) : (
            <p className="text-lg">{result.nameTH}</p>
          )}
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-gold">
          <label className="block text-sm font-semibold mb-1">Master</label>
          {isEditing ? (
            <input
              type="text"
              value={editedResult.master}
              onChange={(e) => setEditedResult({ ...editedResult, master: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          ) : (
            <p className="text-lg">{result.master}</p>
          )}
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-gold">
          <label className="block text-sm font-semibold mb-1">Price</label>
          {isEditing ? (
            <input
              type="text"
              value={editedResult.price}
              onChange={(e) => setEditedResult({ ...editedResult, price: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          ) : (
            <p className="text-lg">{result.price}</p>
          )}
        </div>

        <div className="md:col-span-2 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-gold">
          <label className="block text-sm font-semibold mb-1">Effect</label>
          {isEditing ? (
            <textarea
              value={editedResult.effect}
              onChange={(e) => setEditedResult({ ...editedResult, effect: e.target.value })}
              className="w-full px-2 py-1 border rounded"
              rows={2}
            />
          ) : (
            <p>{result.effect}</p>
          )}
        </div>

        <div className="md:col-span-2 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-gold">
          <label className="block text-sm font-semibold mb-1">Material</label>
          {isEditing ? (
            <input
              type="text"
              value={editedResult.material}
              onChange={(e) => setEditedResult({ ...editedResult, material: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          ) : (
            <p>{result.material}</p>
          )}
        </div>

        <div className="md:col-span-2 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-gold">
          <label className="block text-sm font-semibold mb-1">Remarks</label>
          {isEditing ? (
            <textarea
              value={editedResult.remarks}
              onChange={(e) => setEditedResult({ ...editedResult, remarks: e.target.value })}
              className="w-full px-2 py-1 border rounded"
              rows={2}
            />
          ) : (
            <p>{result.remarks}</p>
          )}
        </div>
      </div>

      {/* Quality & Accuracy */}
      <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-300">
        <div className="flex-1">
          <p className="text-sm font-semibold">Accuracy</p>
          <p className="text-2xl font-bold">{result.accuracy}%</p>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Image Quality</p>
          <p className="text-lg capitalize">{result.imageQuality}</p>
        </div>
      </div>

      {/* Edit Button */}
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-maroon text-white font-semibold py-2 rounded-lg hover:bg-opacity-80 transition"
        >
          ✏️ Edit Fields
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={handleSaveAmendment}
            className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            ✓ Save
          </button>
          <button
            onClick={() => {
              setEditedResult(result)
              setIsEditing(false)
            }}
            className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition"
          >
            ✕ Cancel
          </button>
        </div>
      )}

      {/* Feedback Section */}
      <div className="p-4 bg-saffron/20 rounded-lg border border-saffron space-y-3">
        <p className="font-semibold">Was this helpful?</p>
        <div className="flex gap-2">
          <button
            onClick={() => onFeedback({ accuracy: 5, helpful: true, comment: '' })}
            className="flex-1 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition"
          >
            👍 Yes
          </button>
          <button
            onClick={() => onFeedback({ accuracy: 0, helpful: false, comment: '' })}
            className="flex-1 bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
          >
            👎 No
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <button
        onClick={onNewSession}
        className="w-full bg-gold text-maroon font-semibold py-3 rounded-lg hover:bg-saffron transition"
      >
        🆕 Identify Another Amulet
      </button>
    </div>
  )
}
