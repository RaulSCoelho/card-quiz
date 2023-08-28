'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-4 text-6xl font-semibold text-red-500">Oops!</div>
      <div className="text-xl">Something went wrong.</div>
      <p className="my-4 text-slate-500 dark:text-slate-400">
        We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
      </p>
      <button
        onClick={reset}
        className="transform rounded-md bg-gradient-to-br from-red-600 to-pink-400 px-6 py-3 text-white transition duration-300 ease-in-out hover:scale-105"
      >
        Try again
      </button>
    </div>
  )
}
