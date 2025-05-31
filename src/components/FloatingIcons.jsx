import React, { useEffect, useRef } from 'react';
import { FaInstagram, FaMusic } from 'react-icons/fa';
import anime from 'animejs/lib/anime.es.js';

export default function FloatingIcons() {
  const containerRef = useRef();

  useEffect(() => {
    const icons = containerRef.current.querySelectorAll('.floating-icon');

    anime({
      targets: icons,
      translateY: [
        { value: -30, duration: 2000 },
        { value: 30, duration: 2000 }
      ],
      rotate: anime.stagger([0, 360]),
      scale: [
        { value: 0.8, duration: 2000 },
        { value: 1.2, duration: 2000 }
      ],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(300),
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="floating-icon absolute text-pink-400 dark:text-pink-600 text-2xl"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
          }}
        >
          {i % 2 === 0 ? <FaInstagram /> : <FaMusic />}
        </div>
      ))}
    </div>
  );
}