import React from 'react';
import './BlackHoleBackground.css';

interface BlackHoleBackgroundProps {
  /**
   * When false, the component renders nothing.
   */
  show?: boolean;
}

const BlackHoleBackground: React.FC<BlackHoleBackgroundProps> = ({ show = true }) => {
  if (!show) return null;

  return (
    <div className="blackhole-container">
      <div className="blackhole" />
      <div className="event-horizon" />
      <div className="accretion-disk" />
    </div>
  );
};

export default BlackHoleBackground;
