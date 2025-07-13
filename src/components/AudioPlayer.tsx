import React from 'react';

interface AudioPlayerProps {
  src: string;
  controls?: boolean;
  autoPlay?: boolean;
  className?: string;
  ariaLabel?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  controls = true,
  autoPlay = false,
  className,
  ariaLabel,
}) => (
  <audio
    controls={controls}
    autoPlay={autoPlay}
    className={className}
    aria-label={ariaLabel}
  >
    <source src={src} />
    Your browser does not support the audio element.
  </audio>
);

export default AudioPlayer;
