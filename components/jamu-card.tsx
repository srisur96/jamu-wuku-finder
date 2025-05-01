"use client"

import { useState } from "react"
import Image from "next/image"
import { Leaf, BookOpen, ZoomIn } from "lucide-react"
import { ImageModal } from "./image-modal"

interface JamuCardProps {
  jamu: {
    wuku: string
    jamu: string
    image: string
  }
}

export function JamuCard({ jamu }: JamuCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-64 w-full md:w-1/3 cursor-pointer group" onClick={() => setIsModalOpen(true)}>
            <Image
              src={jamu.image || "/placeholder.svg"}
              alt={jamu.jamu}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=400&width=600"
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="h-6 w-6" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 flex items-center justify-center">
              <BookOpen className="h-3 w-3 mr-1" />
              <span>Pawukon Mbah Jo Tirto</span>
            </div>
          </div>
          <div className="p-6 md:w-2/3 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <Leaf className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-2xl font-semibold text-green-800">{jamu.jamu}</h3>
            </div>
            <div className="mb-3">
              <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                Wuku: {jamu.wuku}
              </span>
            </div>
            <div className="text-sm text-green-700 flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>From Pawukon Mbah Jo Tirto Manuscript</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-green-700 hover:text-green-800 text-sm flex items-center"
            >
              <ZoomIn className="h-4 w-4 mr-1" />
              Click to view larger image
            </button>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={jamu.image}
        altText={jamu.jamu}
      />
    </>
  )
}
