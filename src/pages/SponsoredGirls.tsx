import React from 'react';
import GirlsList from '../components/Girlslist';

const SponsoredGirls: React.FC = () => {
  return (
    <div style={{ margin: '2.5rem auto 1.5rem auto', maxWidth: 1100, width: '100%' }}>
      <h2 style={{ color: '#fff', background: '#111', borderRadius: 12, padding: '1rem 2rem', fontWeight: 700, fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        Sponsored Girls
      </h2>
      <GirlsList />
    </div>
  );
};

export default SponsoredGirls;
