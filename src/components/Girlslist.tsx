import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImagePath, getImageIdByName } from '../imageRegistry';

interface Girl {
  name: string;
  age: string;
  dream: string;
  description: string;
  sentenceInTheirWords?: string;
  situation: string;
  image?: number;
}

import { API_BASE_URL } from '../config';

const GirlsList: React.FC = () => {
  const [data, setData] = useState<any>(girlsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/content/section/girlsSection`)
      .then(res => {
        console.log('Backend girls data:', res.data);
        console.log('First girl data:', res.data.girls?.[0]);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Failed to load from backend, using fallback:', err.message);
        setData(girlsData); // fallback to hardcoded
        setLoading(false);
      });
  }, []);

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
        {data.girls.slice(0, 3).map((girl: any, idx: number) => {
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
            
            <div style={{
              background: '#a31515',
              color: '#fff',
              padding: '1rem',
              borderRadius: 6,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 600,
              marginTop: 'auto'
            }}>
              {typeof girl.situation === 'string' && girl.situation.toLowerCase().includes('sponsor')
                ? '✓ Fully Sponsored'
                : 'Waiting for Sponsor'}
            </div>
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
          {data.girls.slice(3, 5).map((girl: any, idx: number) => {
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
              
              <div style={{
                background: '#a31515',
                color: '#fff',
                padding: '1rem',
                borderRadius: 6,
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: 600,
                marginTop: 'auto'
              }}>
                {typeof girl.situation === 'string' && girl.situation.toLowerCase().includes('sponsor')
                  ? '✓ Fully Sponsored'
                  : 'Waiting for Sponsor'}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const girlsData = {
  title: 'Sponsored Girls',
  girls: [
    {
      name: 'Mithcell Atieno',
      age: '15',
      dream: 'become a nurse',
      description: 'She loves english and is attending Toi Junior school in grade ten',
      sentenceInTheirWords: "I'll appreciate any support for ade",
      situation: 'Her mother can barely feed her and she sometimes gets sent home from school for lack of tuition and school fees'
    },
    {
      name: 'Vivian Atieno',
      age: '16',
      dream: 'Become a nurse',
      description: 'she loves english and lives with her mother and is attending Kojongo High School form three',
      sentenceInTheirWords: 'When I grow up I want to help vulnerable girls',
      situation: 'she lost her father and lives with her mother and they live on less than a dollar a day and cant afford three meals a day'
    },
    {
      name: 'Cynthia Anyaugo',
      age: '14',
      dream: 'to become a pro footballer',
      description: 'her favorite subject is math and she goes to new hope initiative kibera living with her Mother',
      sentenceInTheirWords: 'I wish to play internationally',
      situation: 'Lost a parent; sponsorship ensures continued education.'
    },
    {
      name: 'Cindy Adhiambo',
      age: '15',
      dream: 'Become a Doctor',
      description: 'Loves playing football and tries to help her grandma who supports her the best she can',
      sentenceInTheirWords: 'ADE CBO has helped us in to many ways',
      situation: 'Lives with her grandma who cant afford to do a serious job to feed the family'
    }
  ]
};

export default GirlsList;
