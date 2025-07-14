import React from 'react';

export interface AudioPlayerProps extends React.AudioHTMLAttributes<HTMLAudioElement> {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, ...props }) => (
  <audio controls className="w-full" {...props}>
    <source src={src} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
);

export default AudioPlayer;
