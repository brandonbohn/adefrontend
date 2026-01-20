import React from 'react';

const founders = [
  {
    name: 'Adriano Situma',
    role: 'Visionary leader & co-founder',
    image: '/adriano.jpeg',
  },
  {
    name: 'Daniel Ogweno',
    role: 'Community mentor & co-founder',
    image: '/Daniel.jpeg',
  },
];

const FoundersCard: React.FC = () => (
  <section style={{ margin: '2.5rem auto 1.5rem auto', maxWidth: 1100, width: '100%' }}>
    <h2 style={{ color: '#fff', background: '#a31515', borderRadius: 12, padding: '1rem 2rem', fontWeight: 700, fontSize: '2rem', marginBottom: '0', textAlign: 'center', letterSpacing: '1px' }}>Our Founders</h2>
    <div style={{ background: '#111', borderRadius: 12, padding: '2rem', marginTop: '0', marginBottom: '2rem' }}>
      <div style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        {founders.map((founder) => (
          <div key={founder.name} style={{ textAlign: 'center' }}>
            <img src={founder.image} alt={founder.name} style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', marginBottom: '1rem' }} loading="lazy" />
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>{founder.name}</div>
            <div style={{ color: '#ccc', fontSize: '1rem' }}>{founder.role}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FoundersCard;
