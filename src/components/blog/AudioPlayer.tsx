import React from 'react';

interface AudioPlayerProps {
  src?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  if (!src) return null;
  return (
    <audio controls className="w-full mt-4 rounded bg-zinc-800 text-white">
      <source src={src} />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
