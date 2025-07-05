import React, { useEffect, useState } from 'react';

const CursorEffect: React.FC = () => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Check if device has non-touch primary input
    // Don't apply effects on touch devices
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0));
    };

    if (isTouchDevice()) return;

    const addElements = () => {
      // Custom cursor dot
      const cursorDot = document.createElement('div');
      cursorDot.classList.add('cursor-dot');
      document.body.appendChild(cursorDot);

      // Light effect
      const lightEffect = document.createElement('div');
      lightEffect.classList.add('light-effect');
      document.body.appendChild(lightEffect);

      return { cursorDot, lightEffect };
    };

    const { cursorDot, lightEffect } = addElements();

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update cursor dot position with a slight delay for smooth effect
      requestAnimationFrame(() => {
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;
        
        lightEffect.style.left = `${clientX}px`;
        lightEffect.style.top = `${clientY}px`;
      });
      
    };

    const onMouseDown = () => {
      setClicked(true);
      cursorDot.classList.add('active');
    };

    const onMouseUp = () => {
      setClicked(false);
      cursorDot.classList.remove('active');
    };

    // Handle hoverable elements
    const handleLinkHovers = () => {
      const links = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          cursorDot.classList.add('active');
        });
        
        link.addEventListener('mouseleave', () => {
          if (!clicked) {
            cursorDot.classList.remove('active');
          }
        });
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Initial setup of link hovers
    handleLinkHovers();
    
    // Setup for new elements via MutationObserver
    const observer = new MutationObserver(() => {
      handleLinkHovers();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      
      if (cursorDot && document.body.contains(cursorDot)) {
        document.body.removeChild(cursorDot);
      }
      
      if (lightEffect && document.body.contains(lightEffect)) {
        document.body.removeChild(lightEffect);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // This component doesn't render anything directly
};

export default CursorEffect;