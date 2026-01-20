import React from 'react';
import '../home.css';
import { getImagePath } from '../imageRegistry';

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
        <span className="red-box-caption">Our Founders</span>
      </div>
      <section style={{
        background: '#000',
        color: '#fff',
        borderRadius: 12,
        padding: '1.5rem',
        boxSizing: 'border-box'
      }}>
        <div className="founders-grid">
          {data.founders.map((founder, idx) => {
            // Use image registry for number IDs, string paths as-is
            const imageSrc = typeof founder.image === 'number' 
              ? getImagePath(founder.image) 
              : founder.image || '';
            
            return (
            <div key={idx} className="founder-card">
              {imageSrc ? (
                <img src={imageSrc} alt={founder.name} className="founder-img" />
              ) : (
                <div className="founder-img" style={{ background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>No Photo</div>
              )}
              <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 4 }}>{founder.name}</div>
              <div style={{ color: '#ccc', fontSize: '1rem', marginBottom: 8 }}>{founder.role}</div>
              <div style={{ fontSize: '1rem', color: '#eee' }}>{founder.bio}</div>
            </div>
            );
          })}
        </div>
      </section>
      <style>{`
        @media (max-width: 700px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
        @media (max-width: 700px) {
          .red-box-caption {
            display: none !important;
          }
          .founders-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.2rem !important;
            justify-items: center !important;
          }
          .founder-card {
            width: 100% !important;
            max-width: 100% !important;
            background: #111;
            border-radius: 10px;
            padding: 1.5rem;
            text-align: center;
            box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          }
          .founder-img {
            width: 150px !important;
            height: 150px !important;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
            margin-left: auto;
            margin-right: auto;
            display: block;
          }
        }
        @media (min-width: 701px) {
          .founders-grid {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 2rem !important;
            justify-content: center !important;
            align-items: flex-start !important;
          }
          .founder-card {
            min-width: 260px !important;
            max-width: 340px !important;
            flex: 1 1 260px !important;
            background: #111;
            border-radius: 10px;
            padding: 1.5rem;
            text-align: center;
            box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          }
          .founder-img {
            width: 120px !important;
            height: 120px !important;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
            margin-left: auto;
            margin-right: auto;
            display: block;
          }
        }
      `}</style>
      <style>{`
        @media (max-width: 700px) {
          .red-box {
            display: none !important;
          }
          .founders-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1.2rem !important;
            justify-items: center !important;
          }
          .founders-grid > div {
            min-width: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
        @media (min-width: 701px) {
          .founders-grid {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 2rem !important;
            justify-content: center !important;
            align-items: flex-start !important;
          }
          .founders-grid > div {
            min-width: 260px !important;
            max-width: 340px !important;
            flex: 1 1 260px !important;
          }
        }
      `}</style>
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
