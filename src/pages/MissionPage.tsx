
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../home.css';

const MissionPage: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/content')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load mission content. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
  if (!content) return null;

  const mission = content.ourMission || content.mission || { title: 'Our Mission', description: '' };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '60vh', overflow: 'hidden', background: '#000' }}>
      <video
        src={require('../../public/soccervideo.mp4')}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '60vh', objectFit: 'cover', filter: 'brightness(0.7)' }}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', paddingTop: '2.5rem', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ background: '#000', color: '#fff', borderRadius: 16, padding: '2rem 3rem', maxWidth: 700, width: '90%', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', textAlign: 'center', pointerEvents: 'auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>{mission.title}</h1>
          <p style={{ fontSize: '1.3rem', color: '#ccc', lineHeight: '1.7' }}>{mission.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;
