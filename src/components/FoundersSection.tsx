import React from 'react';
import '../home.css';

interface Founder {
  image?: string | number;
  name: string;
  role: string;
  bio: string;
}

interface FoundersectionProps {
  data: { title?: string; founders: Founder[] } | null;
  customStyle?: React.CSSProperties;
}

const Foundersection: React.FC<FoundersectionProps> = ({ data, customStyle = {} }) => {
  if (!data || !Array.isArray(data.founders) || data.founders.length === 0) return <div>No founders section found.</div>;
  return (
    <div style={{ margin: '2.5rem auto 1.5rem auto', maxWidth: 1100, width: '100%', ...customStyle }}>
      <div className="red-box">
        {'Our Founders'}
      </div>
      <section style={{
        background: '#000',
        color: '#fff',
        borderRadius: 12,
        padding: '1.5rem',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'flex-start' }}>
          {data.founders.map((founder, idx) => (
            <div key={idx} style={{ flex: '1 1 260px', minWidth: 260, maxWidth: 340, background: '#111', borderRadius: 10, padding: '1.5rem', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>
              {founder.image ? (
                <img src={`/${founder.image}.jpeg`} alt={founder.name} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
              ) : (
                <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#222', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>No Photo</div>
              )}
              <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 4 }}>{founder.name}</div>
              <div style={{ color: '#ccc', fontSize: '1rem', marginBottom: 8 }}>{founder.role}</div>
              <div style={{ fontSize: '1rem', color: '#eee' }}>{founder.bio}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const foundersData = {
  title: 'Our People',
  founders: [
    {
      name: 'Adriano Situma',
      role: 'Visionary leader and co-founder',
      image: 31,
      bio: 'Adriano is the driving force behind ADE CBO, inspiring youth and leading the organization with passion and vision.'
    },
    {
      name: 'Daniel Ogweno',
      role: 'Community mentor and co-founder',
      image: 32,
      bio: 'Daniel is a dedicated mentor, supporting girls and youth in Kibera through education, football, and community engagement.'
    }
  ],
  sections: []
};

export default Foundersection;
