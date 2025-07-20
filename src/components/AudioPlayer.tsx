import React from 'react'

interface AudioPlayerProps {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  if (!src) return null

  return (
    <audio
      controls
      className="w-full mt-4 rounded text-white bg-zinc-800"
    >
      <source src={src} />
      Your browser does not support the audio element.
    </audio>
  )
}
