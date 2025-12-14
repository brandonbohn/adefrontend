import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImagePath } from '../imageRegistry';

interface Girl {
  name: string;
  age: string;
  dream: string;
  description: string;
  situation: string;
  image?: number;
}

import { API_BASE_URL } from '../config';

const GirlsList: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/content/section/girlsSection`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setData(girlsData); // fallback to hardcoded
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
  if (!data || !Array.isArray(data.girls) || data.girls.length === 0) return <div>No girls found.</div>;

  return (
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      {data.girls.map((girl: any, idx: number) => (
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

export const girlsData = {
  title: 'Sponsored Girls',
  girls: [
    {
      name: 'Amina',
      age: '13',
      dream: 'Become a doctor',
      description: 'Bright and determined student excelling in science subjects.',
      situation: 'Previously at risk of dropping out due to lack of school fees.',
      image: 1
    },
    {
      name: 'Neema',
      age: '14',
      dream: 'Play professional football',
      description: 'Talented midfielder with strong leadership on the pitch.',
      situation: 'Lives with grandmother; sponsorship covers meals and equipment.',
      image: 2
    },
    {
      name: 'Joy',
      age: '12',
      dream: 'Become a teacher',
      description: 'Helps younger children with homework after practice.',
      situation: 'Struggled with attendance before receiving sanitary supplies.',
      image: 3
    },
    {
      name: 'Faith',
      age: '15',
      dream: 'Engineer designing community solutions',
      description: 'Enjoys math and building small craft projects.',
      situation: 'Lost a parent; sponsorship ensures continued education.',
      image: 4
    },
    {
      name: 'Grace',
      age: '13',
      dream: 'Nurse supporting girls health',
      description: 'Advocates for hygiene and wellness among teammates.',
      situation: 'Was missing school monthly due to lack of sanitary products.',
      image: 5
    },
    {
      name: 'Mary',
      age: '14',
      dream: 'Journalist telling community stories',
      description: 'Writes short articles about training sessions.',
      situation: 'Shared one uniform with sibling before support arrived.',
      image: 6
    },
    {
      name: 'Rose',
      age: '12',
      dream: 'Software developer',
      description: 'Curious about technology and problem solving.',
      situation: 'Nearly dropped out after family relocation; stabilized with sponsorship.',
      image: 7
    }
  ]
};

export default GirlsList;
