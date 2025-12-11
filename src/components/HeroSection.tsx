
import React from 'react';
import '../home.css';

export interface HeroSectionProps {
  data: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  if (!data) return null;

  // Mission should come from the main entry, not heroSection
  const mission = (data.sectionsData?.mission || data.mission) ?? { title: 'Our Mission', description: '' };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '700px', overflow: 'hidden', margin: 0, padding: 0 }}>
      {/* Video only */}
      {data.videoSrc && (
        <video
          src={data.videoSrc.trim()}
          width="100%"
          height="700"
          controls
          style={{ display: 'block', width: '100vw', height: '700px', margin: 0, padding: 0, background: 'none', border: 'none', objectFit: 'cover', zIndex: 1 }}
        />
      )}

      {/* Our Mission overlay at top of video */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 20, pointerEvents: 'none' }}>
        <div style={{ background: '#000', color: '#fff', width: '100%', borderRadius: 0, padding: '0.7rem 0.5rem 0.5rem 0.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', textAlign: 'center', pointerEvents: 'auto' }}>
          <h1 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>{mission.title}</h1>
          <p style={{ fontSize: '1rem', color: '#fff', lineHeight: '1.4', maxWidth: 900, margin: '0 auto' }}>{mission.description}</p>
        </div>
      </div>

      {/* Title/subtitle box overlayed and centered on video, only title and subtitle */}
      {(data.title || data.subtitle) && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.35)', // transparent background
          color: '#fff',
          borderRadius: '0',
          padding: '2.2rem 0',
          boxSizing: 'border-box',
          zIndex: 10,
          textAlign: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)'
        }}>
          {data.title && (
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{data.title}</h1>
          )}
          {data.subtitle && (
            <p style={{ fontSize: '1.15rem', fontWeight: 400, margin: '0.5rem 0 0 0' }}>{data.subtitle}</p>
          )}
        </div>
      )}
      {/* Overlay buttons at bottom of video from backend */}
      {Array.isArray(data.buttons) && data.buttons.length > 0 && (
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', gap: '2rem' }}>
          {data.buttons.map((btn: any, idx: number) => (
            <a
              href={btn.link}
              key={idx}
              style={{
                padding: '0.5rem 3.5rem',
                fontSize: '1.15rem',
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 700,
                letterSpacing: '1px',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                transition: 'background 0.3s ease',
                minWidth: '320px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              target={btn.link.startsWith('http') ? '_blank' : undefined}
              rel={btn.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {btn.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
