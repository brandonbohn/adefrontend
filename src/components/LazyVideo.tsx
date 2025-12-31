import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  style?: React.CSSProperties;
  className?: string;
  preload?: 'none' | 'metadata' | 'auto';
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  width = '100%',
  height = 'auto',
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
  style,
  className = '',
  preload = 'none'
}) => {
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load video immediately if not supported
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setShouldLoad(true);
            // Once video container is in view, we don't need to observe anymore
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before the video enters viewport
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Handle autoplay when video comes into view
  useEffect(() => {
    if (isInView && autoPlay && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err);
      });
    }
  }, [isInView, autoPlay]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: 'auto' }}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          width={width}
          height={height}
          controls={controls}
          autoPlay={autoPlay && isInView}
          muted={muted}
          loop={loop}
          preload={preload}
          style={style}
          className={className}
          playsInline
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: typeof height === 'number' ? `${height}px` : height,
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '1.2rem',
            ...style
          }}
        >
          Loading video...
        </div>
      )}
    </div>
  );
};

export default LazyVideo;
