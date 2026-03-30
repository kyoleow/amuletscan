'use client'

import { ChangeEvent, useRef, useState } from 'react'

interface ImageUploadProps {
  onUpload: (imageData: string) => void
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      setSelectedFiles(fileArray)
      
      // Process the first selected file
      if (fileArray.length > 0) {
        processFile(fileArray[0])
      }
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      onUpload(result)
      // Reset after upload
      setSelectedFiles([])
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'))
      if (fileArray.length > 0) {
        setSelectedFiles(fileArray)
        processFile(fileArray[0])
      }
    }
  }

  return (
    <div className="w-full">
      <label className="block">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gold rounded-lg p-8 text-center cursor-pointer hover:bg-gold/10 transition"
        >
          <div className="text-3xl mb-2">📁</div>
          <p className="font-semibold">Click to upload images</p>
          <p className="text-sm text-gray-500">or drag and drop (multiple files allowed)</p>
          {selectedFiles.length > 0 && (
            <p className="text-sm text-gold mt-2 font-semibold">
              {selectedFiles.length} file(s) selected
            </p>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>
    </div>
  )
}
