import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImagePath, getImageIdByName } from '../imageRegistry';

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
    <div style={{ 
      display: 'grid', 
      gap: '1.5rem', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      width: '100%',
      padding: '0 1rem'
    }}>
      {data.girls.map((girl: any, idx: number) => {
        // Try to get image ID from backend data, otherwise try name-based matching
        const imageId = girl.image || getImageIdByName(girl.name);
        
        return (
        <div
          key={idx}
          style={{
            background: '#111',
            borderRadius: 12,
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
            border: '1px solid #222',
            color: '#fff',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column'
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
            {imageId ? (
              <img 
                src={getImagePath(imageId)} 
                alt={girl.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                loading="lazy"
              />
            ) : (
              'Photo Coming Soon'
            )}
          </div>
          <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.3rem', color: '#fff' }}>
            {girl.name} <span style={{ fontWeight: 400, color: '#ccc' }}>({girl.age})</span>
          </h3>
          
          <div style={{ margin: '1rem 0', color: '#eee', lineHeight: '1.6' }}>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#ffd700' }}>Dream:</strong> {girl.dream}</p>
            <p style={{ margin: '0.5rem 0' }}>{girl.description}</p>
            
            {girl.sentanceinthierwords && (
              <div style={{
                background: '#1a1a1a',
                padding: '0.75rem',
                borderRadius: 6,
                borderLeft: '3px solid #a31515',
                margin: '0.75rem 0',
                fontStyle: 'italic',
                color: '#ddd'
              }}>
                "{girl.sentanceinthierwords}"
              </div>
            )}
            
            <p style={{ 
              margin: '0.75rem 0', 
              color: '#ccc',
              fontSize: '0.95rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid #333'
            }}>
              <strong>Situation:</strong> {girl.situation}
            </p>
          </div>
          
          <div style={{
            background: '#a31515',
            color: '#fff',
            padding: '0.75rem',
            borderRadius: 6,
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginTop: '1rem'
          }}>
            {typeof girl.situation === 'string' && girl.situation.toLowerCase().includes('sponsor')
              ? '✓ Fully Sponsored'
              : 'Waiting for Sponsor'}
          </div>
        </div>
        );
      })}
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
      sentanceinthierwords: "I'll appreciate any support for ade",
      situation: 'Her mother can barely feed her and she sometimes gets sent home from school for lack of tuition and school fees'
    },
    {
      name: 'Vivian Atieno',
      age: '16',
      dream: 'Become a nurse',
      description: 'she loves english and lives with her mother and is attending Kojongo High School form three',
      sentanceinthierwords: 'When I grow up I want to help vulnerable girls',
      situation: 'she lost her father and lives with her mother and they live on less than a dollar a day and cant afford three meals a day'
    },
    {
      name: 'Cynthia Anyaugo',
      age: '14',
      dream: 'to become a pro footballer',
      description: 'her favorite subject is math and she goes to new hope initiative kibera living with her Mother',
      sentanceinthierwords: 'I wish to play internationally',
      situation: 'Lost a parent; sponsorship ensures continued education.'
    },
    {
      name: 'Cindy Adhiambo',
      age: '15',
      dream: 'Become a Doctor',
      description: 'Loves playing football and tries to help her grandma who supports her the best she can',
      sentanceinthierwords: 'ADE CBO has helped us in to many ways',
      situation: 'Lives with her grandma who cant afford to do a serious job to feed the family'
    }
  ]
};

export default GirlsList;
