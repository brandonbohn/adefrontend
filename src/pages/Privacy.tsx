
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Privacy: React.FC = () => {
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
        setError('Unable to load privacy policy. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
  if (!content) return null;

  const privacy = content.privacy || {
    title: 'Privacy Policy',
    intro: 'ADE FC ("we", "us") collects only the personal information necessary to process donations and to contact supporters. We do not sell personal data. Donations are processed by third-party payment providers and payment details are handled directly by those providers.',
    whatWeCollect: [
      'Contact information you provide (name, email)',
      'Donation records (amount, date) required for receipts and accounting',
      'Optional preferences such as newsletter subscription'
    ],
    howWeUse: 'We use information to process donations, send receipts, and provide program updates. We may share information with trusted third-party payment processors and service providers necessary to administer donations and communications.',
    rights: 'You may contact us to request access, correction or deletion of your personal data. Contact: ',
    contactEmail: 'brandonbohn@barebohnzconsulting.com',
    disclaimer: 'This is a minimal privacy notice for the site. It is not legal advice. If you handle significant donor data or operate across jurisdictions, consult a lawyer.'
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1.25rem', lineHeight: 1.6 }}>
      <h1>{privacy.title}</h1>
      <p>{privacy.intro}</p>

      <h2>What we collect</h2>
      <ul>
        {privacy.whatWeCollect.map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h2>How we use your information</h2>
      <p>{privacy.howWeUse}</p>

      <h2>Your rights</h2>
      <p>
        {privacy.rights}
        <a href={`mailto:${privacy.contactEmail}`}>{privacy.contactEmail}</a>.
      </p>

      <p style={{ fontStyle: 'italic', color: '#666', marginTop: '1rem' }}>{privacy.disclaimer}</p>
    </div>
  );
};

export default Privacy;
