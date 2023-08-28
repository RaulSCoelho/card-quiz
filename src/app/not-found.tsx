import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-4 text-6xl font-semibold">404</div>
      <div className="text-xl">Oops! This page could not be found.</div>
      <p className="my-4 text-slate-500 dark:text-slate-400">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="transform rounded-md bg-gradient-to-br from-indigo-600 to-blue-400 px-6 py-3 text-white transition duration-300 ease-in-out hover:scale-105"
      >
        Go back to homepage
      </Link>
    </div>
  )
}
