import React, { useEffect, useState } from 'react'
import { getCountryAudio } from '../lib/supabaseClient'
import AudioPlayer from './AudioPlayer'

interface CountryModalProps {
  slug: string
  onClose: () => void
}

export default function CountryModal({ slug, onClose }: CountryModalProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [language, setLanguage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await getCountryAudio(slug)
        setAudioUrl(data?.url || null)
        setLanguage(data?.language || null)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md rounded-lg bg-zinc-900 p-6 text-white">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-semibold capitalize">{slug}</h2>
        {loading && <p>Loading...</p>}
        {!loading && audioUrl && (
          <>
            {language && <p className="text-sm text-gray-400">{language}</p>}
            <AudioPlayer src={audioUrl} />
          </>
        )}
        {!loading && !audioUrl && <p className="text-gray-400">No audio available.</p>}
      </div>
    </div>
  )
}
