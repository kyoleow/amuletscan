'use client'

import { useRef, useState } from 'react'

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)

  const startCamera = async () => {
    try {
      // Request camera permission with better mobile support
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        // Ensure video starts playing on iOS
        videoRef.current.play().catch((err) => console.error('Play error:', err))
        setIsCameraActive(true)
      }
    } catch (err: unknown) {
      const error = err as any
      console.error('Camera access error:', error)
      
      if (error.name === 'NotAllowedError') {
        alert('Camera permission denied. Please enable camera access in your device settings.')
      } else if (error.name === 'NotFoundError') {
        alert('No camera device found on this device.')
      } else {
        alert('Unable to access camera. Please check permissions and try again.')
      }
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const imageData = canvasRef.current.toDataURL('image/jpeg')
        onCapture(imageData)
        stopCamera()
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setIsCameraActive(false)
    }
  }

  return (
    <div className="w-full space-y-4">
      {!isCameraActive ? (
        <button
          onClick={startCamera}
          className="w-full bg-gold text-maroon font-semibold py-3 rounded-lg hover:bg-saffron transition"
        >
          📷 Open Camera
        </button>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-lg border-2 border-gold"
            style={{ transform: 'scaleX(-1)' }}
          />
          <div className="flex gap-2">
            <button
              onClick={capturePhoto}
              className="flex-1 bg-saffron text-white font-semibold py-3 rounded-lg hover:bg-gold transition"
            >
              📸 Capture
            </button>
            <button
              onClick={stopCamera}
              className="flex-1 bg-gray-400 text-white font-semibold py-3 rounded-lg hover:bg-gray-500 transition"
            >
              ✕ Close
            </button>
          </div>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
