
import '../home.css';

import React from 'react';
import '../home.css';


interface MissionBox {
  title: string;
  description: string;
  subtitle?: string;
}

interface HeroSectionProps {
  heroTitle?: string;
  mission?: MissionBox;
  videoSrc?: string;
  buttons?: Array<{ label: string; link: string }>;
  // For backward compatibility
  data?: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroTitle, mission, videoSrc, buttons, data }) => {
  // Backward compatibility: if data prop is provided, extract values from it
  let _heroTitle = heroTitle;
  let _mission = mission;
  let _videoSrc = videoSrc;
  let _buttons = buttons;
  if (data) {
    _heroTitle = data.heroTitle || data.title;
    _mission = data.ourMission || data.sectionsData?.ourMission || data.mission;
    _videoSrc = data.videoSrc || data.videoSection?.src;
    _buttons = data.buttons;
  }

  return (
    <>
      <div style={{ width: '98vw', margin: '0 auto', padding: 0 }}>
        {_videoSrc && (
          <video
            src={_videoSrc}
            width="100%"
            height="700"
            controls
            autoPlay
            muted
            style={{ display: 'block', width: '100%', height: '700px', marginTop: 0, padding: 0, background: 'none', border: 'none', objectFit: 'cover', borderRadius: '0' }}
          />
        )}
          <div style={{ position: 'relative', width: '100%', height: 0 }}>
            {/* Single transparent box for hero title and subtitle, centered in the middle of the video (hardcoded) */}
            <div
              style={{
                position: 'absolute',
                top: 'calc(50% - 350px)', // moved down by 100px
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.55)',
                color: '#fff',
                padding: '0.8rem 1.5rem',
                borderRadius: '14px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                textAlign: 'center',
                width: '60%',
                maxWidth: '700px',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, margin: 0, marginBottom: '0.7rem', letterSpacing: '-1px', textShadow: '2px 2px 8px rgba(0,0,0,0.18)' }}>ADE Community Foundation</h1>
              <div style={{ fontSize: '1.05rem', fontWeight: 400, margin: 0, textShadow: '2px 2px 8px rgba(0,0,0,0.10)' }}>changing girls lives one goal at a time</div>
              {/* Buttons moved just below the hero box, above the fold */}
              {Array.isArray(_buttons) && _buttons.length > 0 && (
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', justifyContent: 'center', width: '100%' }}>
                  {_buttons.map((btn: any, idx: number) => (
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
                        minWidth: '220px',
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
                      {btn.label || btn.text || 'Button'}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
      </div>
      {/* Mission box overlay: always rendered at top of video, hardcoded text */}
      <div
        style={{
          position: 'absolute',
          top: '80px', // exactly at bottom of header
          left: '50%',
          transform: 'translateX(-50%)',
          width: '98vw',
          zIndex: 20,
          pointerEvents: 'auto',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '0',
        }}
      >
        <div
          style={{
            background: '#000',
            color: '#fff',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            padding: '0.8rem 1.2rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
            textAlign: 'center',
            width: '100%',
            margin: 0,
            opacity: 0.98,
          }}
        >
          <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Our Mission</h2>
          <p style={{ fontSize: '1rem', color: '#fff', lineHeight: '1.4', margin: '0 auto' }}>
            We exist to uplift and support girls in Kibera by using football as a bridge to education, dignity, and opportunity. Through mentorship, essential support, and talent development, we create pathways for girls to break cycles of poverty, early marriage, and school dropout—and instead, become changemakers in their lives and their communities.
          </p>
        </div>
      </div>

      {/* Buttons below the video */}
    </>
  );
};

export default HeroSection;
