import React, { useRef } from 'react';

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
  style,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      width={width}
      height={height}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      preload="auto"
      style={style}
      className={className}
      playsInline
    />
  );
};

export default LazyVideo;
