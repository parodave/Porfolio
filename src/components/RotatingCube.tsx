import React from 'react';

const RotatingCube: React.FC = () => (
  <div className="cube purple">
    <div className="cube__inner">
      <div className="cube__side front" />
      <div className="cube__side back" />
      <div className="cube__side right" />
      <div className="cube__side left" />
      <div className="cube__side top" />
      <div className="cube__side bottom" />
    </div>
  </div>
);

export default RotatingCube;
