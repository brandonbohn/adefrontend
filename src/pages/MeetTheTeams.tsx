import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
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
    axios.get(`${API_BASE_URL}/api/content`)
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


  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
  if (!teamGallery || teamGallery.length === 0) return <div>No team photos found.</div>;

  return (
    <section style={{ maxWidth: '1100px', margin: '2rem auto', padding: '1rem' }}>
      <div style={{ background: '#a31515', borderRadius: 20, padding: '2.5rem 2rem 2rem 2rem', boxShadow: '0 4px 24px rgba(163,21,21,0.12)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div className="hide-on-mobile" style={{ background: '#000', color: '#fff', borderRadius: 12, padding: '1rem 2.5rem', fontSize: '2.2rem', fontWeight: 700, textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>
            Meet the Teams
          </div>
          <div className="show-on-mobile" style={{ background: '#000', color: '#fff', borderRadius: 12, padding: '0.7rem 1.2rem', fontSize: '1.3rem', fontWeight: 700, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', margin: '0 auto', display: 'none' }}>
            Meet the Teams
          </div>
        </div>
        <div className="team-gallery-grid">
          {teamGallery.map((photo, idx) => (
            <div key={idx} className="team-photo-cell">
              <div className="team-photo-img-wrap">
                <ImageComponent id={photo.id} src={photo.src} alt={photo.alt} width={150} height={150} customStyle={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 10 }} />
              </div>
              <div className="team-photo-caption hide-on-mobile">{photo.alt}</div>
            </div>
          ))}
        </div>
      <style>{`
        @media (max-width: 700px) {
          .show-on-mobile {
            display: block !important;
          }
        }
        @media (min-width: 701px) {
          .show-on-mobile {
            display: none !important;
          }
        }
        @media (max-width: 700px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
        .team-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .team-photo-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .team-photo-img-wrap {
          background: #000;
          border-radius: 12px;
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        .team-photo-caption {
          margin-top: 0.5rem;
          font-weight: 600;
          color: #fff;
          text-align: center;
          font-size: 1rem;
        }
        @media (max-width: 900px) {
          .team-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.2rem !important;
          }
        }
        @media (max-width: 600px) {
          .team-gallery-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.2rem !important;
            justify-items: center !important;
          }
          .team-photo-img-wrap {
            width: 140px !important;
            height: 140px !important;
          }
          .team-photo-caption {
            font-size: 0.85rem;
          }
        }
        @media (max-width: 400px) {
          .team-gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      </div>
    </section>
  );
};

export default MeetTheTeams;
