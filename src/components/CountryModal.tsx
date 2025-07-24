import React, { useEffect, useState } from 'react'
import AudioPlayer from './AudioPlayer'

interface CountryModalProps {
  country: string | null
  onClose: () => void
}

const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [language, setLanguage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Reset audio state when the modal changes country
  useEffect(() => {
    setAudioUrl(null)
    setLanguage(null)
    setLoading(false)
  }, [country])

  if (!country) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 text-black dark:bg-zinc-900 dark:text-white">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-semibold capitalize text-center">
          {country}
        </h2>

        {loading && <p className="text-center text-sm text-gray-400">Loading...</p>}

        {!loading && audioUrl && (
          <>
            {language && (
              <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                Language: {language}
              </p>
            )}
            <AudioPlayer src={audioUrl} />
          </>
        )}

        {!loading && !audioUrl && (
          <p className="text-center text-sm text-gray-400">No audio available for this country.</p>
        )}
      </div>
    </div>
  )
}

export default CountryModal
