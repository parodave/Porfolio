import React from 'react';

export interface AudioPlayerProps extends React.AudioHTMLAttributes<HTMLAudioElement> {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, ...props }) => (
  <audio
    controls
    className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    aria-label="Audio player"
    {...props}
  >
    <source src={src} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
);

export default AudioPlayer;
