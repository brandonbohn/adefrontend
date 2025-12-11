import React from 'react';
import { useNavigate } from 'react-router-dom';

const SponsorAGirl: React.FC = () => {
  const navigate = useNavigate();
  const goToGirlsList = () => navigate('/sponsored-girls');
  return (
    <section style={{ width: '100%', maxWidth: 900, margin: '2.5rem auto', background: '#fff2fa', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 1.5rem' }}>
      <h2 style={{ color: '#c2185b', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>Sponsor a Girl’s Education & Future 💝</h2>
      <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#a62f5b', fontSize: '1.1rem' }}>
        <em>Change one girl’s entire trajectory.<br />Give her what she needs to escape poverty.</em>
      </p>
      <ul style={{ marginBottom: '1.5rem', color: '#a62f5b', fontSize: '1rem', lineHeight: 1.7 }}>
        <li>Complete school fees for the year</li>
        <li>School uniform and supplies</li>
        <li>Daily nutritious meals</li>
        <li>Sanitary products</li>
        <li>Football training and equipment</li>
        <li>Mentorship and life skills</li>
        <li>Medical support when needed</li>
      </ul>
      <h3 style={{ color: '#c2185b', marginBottom: '1rem', textAlign: 'center' }}>Sponsorship Tiers</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
  <div style={{ background: '#000', color: '#fff', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>
          <strong>Basic Support - $250/year</strong><br />School fees + meals<br />
          <button style={{ background: '#c2185b', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1rem', marginTop: '1rem' }}>Sponsor a Girl</button>
        </div>
  <div style={{ background: '#000', color: '#fff', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>
          <strong>Full Support - $500/year</strong><br />Complete package<br />
          <button style={{ background: '#c2185b', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1rem', marginTop: '1rem' }}>Sponsor a Girl</button>
        </div>
  <div style={{ background: '#000', color: '#fff', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.12)' }}>
          <strong>Premium - $1,000/year</strong><br />Full support + tutoring<br />
          <button style={{ background: '#c2185b', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1rem', marginTop: '1rem' }}>Sponsor a Girl</button>
        </div>
      </div>
  <div style={{ background: '#000', color: '#fff', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.12)', marginBottom: '1.5rem' }}>
        <strong>Can’t commit annually?</strong><br />Monthly sponsorship available: Starting at $21/month<br />
        <button style={{ background: '#c2185b', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1rem', marginTop: '1rem' }}>Become a Sponsor</button>
      </div>
      <div style={{ background: '#fff8f2', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', marginBottom: '1.5rem', color: '#d32f2f', fontWeight: 600 }}>
        ⚠️ URGENT: 15 girls currently waiting for sponsors to continue their education<br />
        <button
          onClick={goToGirlsList}
          style={{
            color: '#fff',
            background: '#c2185b',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '1.1rem',
            padding: '0.7rem 1.5rem',
            marginTop: '0.5rem',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          Meet the Girls Today
        </button>
      </div>
      <div style={{ color: '#a62f5b', textAlign: 'center', fontSize: '1rem', marginBottom: '1.5rem' }}>
        <strong>You’ll Receive:</strong><br />
        Profile of your sponsored girl<br />Quarterly progress updates<br />School reports and photos<br />Direct communication opportunity<br />Annual visit option (if in Kenya)
      </div>
    </section>
  );
};

export default SponsorAGirl;
