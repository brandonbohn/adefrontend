import React from 'react';
import ImageComponent from '../components/ImageComponent';

const teamPhotos = [
  { id: 14, caption: 'Green Team' },
  { id: 10, caption: 'Blue Team' },
  { id: 24, caption: 'White Team' },
  { id: 1, caption: 'Main Team Photo' },
  { id: 18, caption: 'Team and Coaches' },
  { id: 19, caption: 'Team Huddle' },
  { id: 20, caption: 'Team Mix' },
  { id: 21, caption: 'Team Photo on Field' },
];

const MeetTheTeams = () => (
  <section style={{ maxWidth: '1100px', margin: '2rem auto', padding: '1rem' }}>
    <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '2rem', color: '#a31515' }}>Meet the Teams</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
      {teamPhotos.map(photo => (
        <div key={photo.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageComponent id={photo.id} alt={photo.caption} width={300} height={300} customStyle={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 12 }} />
          <div style={{ marginTop: '1rem', fontWeight: 600, color: '#333', textAlign: 'center' }}>{photo.caption}</div>
        </div>
      ))}
    </div>
  </section>
);

export default MeetTheTeams;
