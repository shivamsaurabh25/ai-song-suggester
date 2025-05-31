import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function AnimatedAvatar() {
  const avatarRef = useRef();
  const hoverAnimation = useRef(null);

  useEffect(() => {
    anime({
      targets: avatarRef.current,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutElastic(1, .8)',
    });
  }, []);

  const handleMouseEnter = () => {
    hoverAnimation.current = anime({
      targets: avatarRef.current,
      scale: 1.2,
      rotate: '+=360deg',
      duration: 1000,
      easing: 'easeInOutQuad',
      loop: true,
    });
  };

  const handleMouseLeave = () => {
    if (hoverAnimation.current) {
      hoverAnimation.current.pause();
    }

    anime({
      targets: avatarRef.current,
      scale: 1,
      rotate: '0deg',
      duration: 600,
      easing: 'easeOutExpo',
    });
  };

  return (
    <div
      ref={avatarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer w-fit mx-auto"
    >
      <img
        src="https://api.dicebear.com/9.x/bottts/svg"
        alt="AI Avatar"
        className="w-20 h-20 rounded-full shadow-lg"
      />
    </div>
  );
}