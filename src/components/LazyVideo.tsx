import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  style?: React.CSSProperties;
  className?: string;
  preload?: 'none' | 'metadata' | 'auto';
  lazy?: boolean;
  rootMargin?: string;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  width = '100%',
  height = 'auto',
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
  preload = 'metadata',
  lazy = true,
  rootMargin = '200px 0px',
  style,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canLoad, setCanLoad] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;

    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setCanLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCanLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, rootMargin]);

  return (
    <video
      ref={videoRef}
      src={canLoad ? src : undefined}
      poster={poster}
      width={width}
      height={height}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      preload={canLoad ? preload : 'none'}
      style={style}
      className={className}
      playsInline
    />
  );
};

export default LazyVideo;
