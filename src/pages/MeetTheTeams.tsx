import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageComponent from '../components/ImageComponent';

interface MeetTheTeamsProps {
  data?: Array<{ id: number; src: string; alt: string }>;
}

const MeetTheTeams: React.FC<MeetTheTeamsProps> = ({ data: propData }) => {
  const [teamGallery, setTeamGallery] = useState<Array<{ id: number; src: string; alt: string }> | null>(propData || null);
  const [loading, setLoading] = useState(!propData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (propData) return;
    axios.get('http://localhost:3000/api/content')
      .then(res => {
        console.log('MeetTheTeams backend data:', res.data);
        // Support both array and object data contracts
        let gallery = null;
        if (Array.isArray(res.data)) {
          gallery = (res.data as any[])[0]?.sectionsData?.aboutSection?.teamGallery || null;
        } else {
          const dataObj = res.data as { sectionsData?: { aboutSection?: { teamGallery?: Array<{ id: number; src: string; alt: string }> } } };
          gallery = dataObj.sectionsData?.aboutSection?.teamGallery || null;
        }
        setTeamGallery(gallery);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load team gallery.');
        setLoading(false);
      });
  }, [propData]);

  if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading Teams...</div>;
  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
  if (!teamGallery || teamGallery.length === 0) return <div>No team photos found.</div>;

  return (
    <section style={{ maxWidth: '1100px', margin: '2rem auto', padding: '1rem' }}>
      <div style={{ background: '#a31515', borderRadius: 20, padding: '2.5rem 2rem 2rem 2rem', boxShadow: '0 4px 24px rgba(163,21,21,0.12)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ background: '#000', color: '#fff', borderRadius: 12, padding: '1rem 2.5rem', fontSize: '2.2rem', fontWeight: 700, textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>
            Meet the Teams
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {teamGallery.map((photo, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#000', borderRadius: 12, width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <ImageComponent id={photo.id} src={photo.src} alt={photo.alt} width={300} height={300} customStyle={{ width: 280, height: 280, objectFit: 'cover', borderRadius: 10 }} />
              </div>
              <div style={{ marginTop: '1rem', fontWeight: 600, color: '#fff', textAlign: 'center' }}>{photo.alt}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeams;
