
import '../home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import '../home.css';
import LazyVideo from './LazyVideo';


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

let width = 1;

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
  // Fallback: if no buttons provided, use static Donate and Sponsor a Girl
  if (!_buttons || !Array.isArray(_buttons) || _buttons.length === 0) {
    _buttons = [
      { label: 'Donate', link: 'https://www.adekiberafoundation.org/donate' },
      { label: 'Sponsor a Girl', link: '/sponsor-a-girl' }
    ];
  }

  return (
    <>
      <div style={{ width: '98vw', margin: '0 auto', padding: 0, position: 'relative' }}>
        {_videoSrc && (
          <LazyVideo
            src={_videoSrc}
            width="100%"
            height="700"
            controls
            autoPlay
            muted
            preload="none"
            style={{ display: 'block', width: '100%', height: '700px', marginTop: 0, padding: 0, background: 'none', border: 'none', objectFit: 'cover', borderRadius: '0' }}
          />
        )}
          <div className="hero-flex-stack" style={{ position: 'relative', width: '100%', height: 0, display: 'flex', flexDirection: 'column' }}>
            {/* On mobile, show hero title box at top, mission box in center; on desktop, mission box at top, hero title in center */}
            <div className="hero-title-box hero-title-bottom"
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#000',
                color: '#fff',
                padding: '1.5rem 2rem',
                borderRadius: '14px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                textAlign: 'center',
                width: '60%',
                maxWidth: '700px',
                minHeight: '220px',
                zIndex: 21,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 1,
              }}
            >
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, margin: 0, marginBottom: '0.7rem', letterSpacing: '-1px', textShadow: '2px 2px 8px rgba(0,0,0,0.18)' }}>ADE Community Foundation</h1>
              <div style={{ fontSize: '1.05rem', fontWeight: 400, margin: 0, marginBottom: '1.2rem', textShadow: '2px 2px 8px rgba(0,0,0,0.10)' }}>changing girls lives one goal at a time</div>
              {/* Fallback: Always show two static buttons */}
              <div className="hero-buttons-row" style={{ marginTop: '0.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
                <Link
                  to="/donate"
                  style={{
                    textDecoration: 'none',
                    flex: '0 1 auto',
                  }}
                >
                  <button
                    className="hero-button"
                    style={{
                      padding: '0.75rem 2.5rem',
                      fontSize: '1.1rem',
                      background: '#d32f2f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                      transition: 'all 0.3s ease',
                      minWidth: '200px',
                      height: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Donate
                  </button>
                </Link>
                <Link
                  to="/sponsor-a-girl"
                  style={{
                    textDecoration: 'none',
                    flex: '0 1 auto',
                  }}
                >
                  <button
                    className="hero-button"
                    style={{
                      padding: '0.75rem 2.5rem',
                      fontSize: '1.1rem',
                      background: '#d32f2f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                      transition: 'all 0.3s ease',
                      minWidth: '200px',
                      height: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Sponsor a Girl
                  </button>
                </Link>
              </div>
            </div>
          </div>
      </div>
      {/* Media query for stacking hero buttons on mobile */}
      <style>{`
        .hero-button:hover {
          background: #b71c1c !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
        }
        
        @media (max-width: 768px) {
          .hero-flex-stack {
            position: static !important;
            display: flex !important;
            flex-direction: column !important;
            width: 100vw !important;
            height: auto !important;
          }
          .hero-title-bottom {
            position: absolute !important;
            left: 50% !important;
            bottom: 0 !important;
            transform: translateX(-50%) !important;
            width: 95vw !important;
            max-width: 95vw !important;
            border-radius: 14px !important;
            background: #000 !important;
            opacity: 1 !important;
            z-index: 21 !important;
            padding: 1.2rem 1rem !important;
            min-height: auto !important;
          }
          .hero-title-bottom h1 {
            font-size: 1.5rem !important;
          }
          .hero-title-bottom > div {
            font-size: 0.95rem !important;
          }
          .hero-buttons-row {
            flex-direction: column !important;
            gap: 1rem !important;
            align-items: center !important;
            margin-top: 1rem !important;
          }
          .hero-buttons-row a {
            width: 100% !important;
            max-width: 280px !important;
          }
          .hero-button {
            width: 100% !important;
            min-width: auto !important;
            font-size: 1rem !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-title-bottom {
            top: calc(50% - 280px) !important;
            bottom: auto !important;
            transform: translate(-50%, -50%) !important;
            width: 70% !important;
            max-width: 650px !important;
            padding: 1.3rem 1.8rem !important;
          }
          .hero-buttons-row {
            gap: 1.2rem !important;
          }
          .hero-button {
            min-width: 180px !important;
            padding: 0.7rem 2rem !important;
          }
        }
        
        @media (min-width: 1025px) {
          .hero-title-bottom {
            top: calc(50% - 300px) !important;
            bottom: auto !important;
            transform: translate(-50%, -50%) !important;
            width: 60% !important;
            max-width: 700px !important;
          }
        }
      `}</style>
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