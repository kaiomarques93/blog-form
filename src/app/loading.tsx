'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function LoadingPage() {
  const [loadingMessage, setLoadingMessage] = useState('Loading awesomeness')

  useEffect(() => {
    const messages = [
      'Preparing something amazing',
      'Almost there',
      'Just a moment longer',
      'Crafting perfection',
      'Loading awesomeness',
    ]
    let currentIndex = 0

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length
      setLoadingMessage(messages[currentIndex])
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="relative">
        <div className="w-32 h-32 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
        <Loader2 className="w-16 h-16 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
      </div>
      <h1 className="mt-8 text-3xl font-bold text-white text-center animate-pulse">
        {loadingMessage}
      </h1>
    </div>
  )
}
