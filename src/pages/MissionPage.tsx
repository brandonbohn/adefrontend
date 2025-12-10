import React from 'react';
import { client } from '../client';
import type { clientdata } from '../types';
import '../home.css';

const MissionPage: React.FC = () => {
  // Assuming only one client entry for now
  const data: clientdata = client[0];
  const mission = data.sectionsData?.ourMission;

  if (!mission) return <div>No mission data found.</div>;

  return (
    <div className="dark-card" style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '32px',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '2.5rem', color: 'var(--text-on-dark)', marginBottom: '1.5rem' }}>
        {mission.title || 'Our Mission'}
      </h1>
      <p style={{ fontSize: '1.3rem', color: 'var(--muted)', lineHeight: '1.7' }}>
        {mission.description || 'No mission description provided.'}
      </p>
    </div>
  );
};

export default MissionPage;
