'use client'

import { ChangeEvent, useRef } from 'react'

interface ImageUploadProps {
  onUpload: (imageData: string) => void
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        onUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full">
      <label className="block">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gold rounded-lg p-8 text-center cursor-pointer hover:bg-gold/10 transition"
        >
          <div className="text-3xl mb-2">📁</div>
          <p className="font-semibold">Click to upload image</p>
          <p className="text-sm text-gray-500">or drag and drop</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>
    </div>
  )
}
