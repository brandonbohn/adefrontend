import React, { useEffect, useState } from 'react';
import { getImagePath } from '../imageRegistry';

interface Girl {
  name: string;
  age: string;
  dream: string;
  description: string;
  situation: string;
  image?: number;
}

const GirlsList: React.FC = () => {
  const [girls, setGirls] = useState<Girl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3002/Backend/json/adedata.json')
      .then(res => res.json())
      .then(data => {
        const girlsData = data[0]?.sectionsData?.girlsSection?.girls || [];
        setGirls(girlsData);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load girls list.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading girls...</div>;
  if (error) return <div style={{ color: '#a31515' }}>{error}</div>;
  if (!girls.length) return <div>No girls found.</div>;

  return (
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      {girls.map((girl, idx) => (
        <div
          key={idx}
          style={{
            background: '#111',
            borderRadius: 12,
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
            border: '1px solid #222',
            color: '#fff'
          }}
        >
          <div style={{
            width: '100%',
            height: '220px',
            background: '#222',
            borderRadius: 8,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#eee',
            fontSize: '0.9rem',
            overflow: 'hidden'
          }}>
            {girl.image ? (
              <img 
                src={getImagePath(girl.image)} 
                alt={girl.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
              />
            ) : (
              'Photo Coming Soon'
            )}
          </div>
          <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.3rem', color: '#fff' }}>
            {girl.name} <span style={{ fontWeight: 400, color: '#ccc' }}>({girl.age})</span>
          </h3>
          <p style={{ margin: '0.5rem 0', color: '#eee' }}><strong>Dream:</strong> {girl.dream}</p>
          <p style={{ margin: '0.5rem 0', color: '#eee' }}>{girl.description}</p>
          <div style={{
            background: '#a31515',
            color: '#fff',
            padding: '0.5rem',
            borderRadius: 6,
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            {typeof girl.situation === 'string' && girl.situation.toLowerCase().includes('sponsor')
              ? '✓ Fully Sponsored'
              : 'Waiting for Sponsor'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GirlsList;
