"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  altText: string
}

export function ImageModal({ isOpen, onClose, imageUrl, altText }: ImageModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Handle escape key press to close modal
  useEffect(() => {
    setIsMounted(true)

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Handle clicks outside the image to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isMounted) return null

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative w-full h-[80vh] bg-[#166534]">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={altText}
            fill
            className="object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=800&width=1200"
            }}
          />
        </div>

        {/* <div className="p-4 bg-white">
          <p className="text-sm text-gray-600" >By Museum Pawukon ft Jawasastra</p>
        </div> */}
        <div className="p-4 bg-[#166534]">
            <p className="text-sm text-gray-100">By Museum Pawukon ft Jawasastra</p>
        </div>

      </div>
    </div>
  )
}
