import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImagePath, getImageIdByName } from '../imageRegistry';
import LazyImage from './LazyImage';
import { Link, useSearchParams } from 'react-router-dom';

interface Girl {
  _id?: string;
  name: string;
  age: string;
  dream: string;
  description: string;
  sentenceInTheirWords?: string;
  situation: string;
  image?: number;
  status?: string;
}

import { API_BASE_URL } from '../config';

const GirlsList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'monthly-21';
  const [data, setData] = useState<any>({ girls: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/sponsored-girls`)
      .then(res => {
        setData({ girls: Array.isArray(res.data?.girls) ? res.data.girls : [] });
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load sponsored girls');
        setData({ girls: [] });
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading girls...</div>;
  if (error && (!data || !Array.isArray(data.girls) || data.girls.length === 0)) return <div>{error}</div>;

  if (!data || !Array.isArray(data.girls) || data.girls.length === 0) return <div>No girls found.</div>;

  return (
    <div style={{ 
      width: '100%',
      padding: '0',
      margin: '0'
    }}>
      {/* First row - 3 cards */}
      <div style={{ 
        display: 'grid', 
        gap: '0', 
        gridTemplateColumns: 'repeat(3, 1fr)',
        marginBottom: '0'
      }}>
        {data.girls.slice(0, 3).map((girl: Girl, idx: number) => {
          // Handle both string paths from backend and number IDs
          let imageSrc = '';
          if (typeof girl.image === 'string') {
            imageSrc = girl.image; // Backend sends path like "/talia.jpeg"
          } else if (typeof girl.image === 'number') {
            imageSrc = getImagePath(girl.image); // Use registry for number IDs
          } else {
            // Fallback to name-based matching
            const imageId = getImageIdByName(girl.name);
            imageSrc = imageId ? getImagePath(imageId) : '';
          }
          
          const girlId = encodeURIComponent(girl._id || `${girl.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${idx + 1}`);
          const sponsorHref = `/sponsorship-form?plan=${encodeURIComponent(selectedPlan)}&girl=${encodeURIComponent(girl.name)}&girlId=${girlId}`;

          return (
          <div
            key={idx}
            style={{
              background: '#111',
              borderRadius: 0,
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
              border: '1px solid #222',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '700px'
            }}
          >
            <Link to={sponsorHref} style={{ textDecoration: 'none' }}>
            <div style={{
              width: '100%',
              height: '320px',
              background: '#222',
              borderRadius: 8,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#eee',
              fontSize: '0.9rem',
              overflow: 'hidden'
            }}>
              {imageSrc ? (
                <LazyImage 
                  src={imageSrc} 
                  alt={girl.name}
                  width="100%"
                  height="100%"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                />
              ) : (
                'Photo Coming Soon'
              )}
            </div>
            </Link>
            <h3 style={{ margin: 0, marginBottom: '1rem', fontSize: '1.5rem', color: '#fff' }}>
              {girl.name} <span style={{ fontWeight: 400, color: '#ccc' }}>({girl.age})</span>
            </h3>
            
            <div style={{ margin: '1rem 0', color: '#eee', lineHeight: '1.8', flex: 1 }}>
              <p style={{ margin: '0.75rem 0', fontSize: '1rem' }}>
                <strong style={{ color: '#ffd700' }}>Dream:</strong> {girl.dream}
              </p>
              <p style={{ margin: '0.75rem 0', fontSize: '1rem' }}>{girl.description}</p>
              
              <div style={{
                background: '#1a1a1a',
                padding: '1rem',
                borderRadius: 6,
                borderLeft: '3px solid #a31515',
                margin: '1rem 0',
                fontStyle: 'italic',
                color: '#ddd',
                fontSize: '0.95rem'
              }}>
                "{girl.sentenceInTheirWords || 'No quote available'}"
              </div>
              
              <p style={{ 
                margin: '1rem 0', 
                color: '#ccc',
                fontSize: '0.95rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid #333'
              }}>
                <strong>Situation:</strong> {girl.situation}
              </p>
            </div>
            
            <Link to={sponsorHref} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#a31515',
                color: '#fff',
                padding: '1rem',
                borderRadius: 6,
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: 600,
                marginTop: 'auto',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#8a1212'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#a31515'}
              >
                Yes, I want to sponsor her
              </div>
            </Link>
          </div>
          );
        })}
      </div>
      
      {/* Second row - 2 cards centered */}
      {data.girls.length > 3 && (
        <div style={{ 
          display: 'flex',
          gap: '0',
          justifyContent: 'center',
          width: '100%',
          margin: '0'
        }}>
          {data.girls.slice(3, 5).map((girl: Girl, idx: number) => {
            // Handle both string paths from backend and number IDs
            let imageSrc = '';
            if (typeof girl.image === 'string') {
              imageSrc = girl.image; // Backend sends path like "/talia.jpeg"
            } else if (typeof girl.image === 'number') {
              imageSrc = getImagePath(girl.image); // Use registry for number IDs
            } else {
              // Fallback to name-based matching
              const imageId = getImageIdByName(girl.name);
              imageSrc = imageId ? getImagePath(imageId) : '';
            }
            
            const girlId = encodeURIComponent(girl._id || `${girl.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${idx + 4}`);
            const sponsorHref = `/sponsorship-form?plan=${encodeURIComponent(selectedPlan)}&girl=${encodeURIComponent(girl.name)}&girlId=${girlId}`;

            return (
            <div
              key={idx + 3}
              style={{
                background: '#111',
                borderRadius: 0,
                padding: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                border: '1px solid #222',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '700px',
                flex: '1 1 0'
              }}
            >
              <Link to={sponsorHref} style={{ textDecoration: 'none' }}>
              <div style={{
                width: '100%',
                height: '320px',
                background: '#222',
                borderRadius: 8,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#eee',
                fontSize: '0.9rem',
                overflow: 'hidden'
              }}>
                {imageSrc ? (
                  <img 
                    src={imageSrc} 
                    alt={girl.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                    loading="lazy"
                  />
                ) : (
                  'Photo Coming Soon'
                )}
              </div>
              </Link>
              <h3 style={{ margin: 0, marginBottom: '1rem', fontSize: '1.5rem', color: '#fff' }}>
                {girl.name} <span style={{ fontWeight: 400, color: '#ccc' }}>({girl.age})</span>
              </h3>
              
              <div style={{ margin: '1rem 0', color: '#eee', lineHeight: '1.8', flex: 1 }}>
                <p style={{ margin: '0.75rem 0', fontSize: '1rem' }}>
                  <strong style={{ color: '#ffd700' }}>Dream:</strong> {girl.dream}
                </p>
                <p style={{ margin: '0.75rem 0', fontSize: '1rem' }}>{girl.description}</p>
                
                <div style={{
                  background: '#1a1a1a',
                  padding: '1rem',
                  borderRadius: 6,
                  borderLeft: '3px solid #a31515',
                  margin: '1rem 0',
                  fontStyle: 'italic',
                  color: '#ddd',
                  fontSize: '0.95rem'
                }}>
                  "{girl.sentenceInTheirWords || 'No quote available'}"
                </div>
                
                <p style={{ 
                  margin: '1rem 0', 
                  color: '#ccc',
                  fontSize: '0.95rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #333'
                }}>
                  <strong>Situation:</strong> {girl.situation}
                </p>
              </div>
              
              <Link to={sponsorHref} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#a31515',
                  color: '#fff',
                  padding: '1rem',
                  borderRadius: 6,
                  textAlign: 'center',
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginTop: 'auto',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#8a1212'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#a31515'}
                >
                  Yes, I want to sponsor her
                </div>
              </Link>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GirlsList;
