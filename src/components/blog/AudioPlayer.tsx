import React from 'react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => (
  <audio
    controls
    className="w-full h-10 md:h-8 bg-gray-200 dark:bg-gray-800 rounded"
  >
    <source src={src} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
);

export default AudioPlayer;
