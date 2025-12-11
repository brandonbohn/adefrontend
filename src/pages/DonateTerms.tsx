
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonateTerms: React.FC = () => {
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
        setError('Unable to load donation terms. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
  if (!content) return null;

  const donateTerms = content.donateTerms || {
    title: 'Donation Terms',
    intro: 'By donating to ADE FC you acknowledge that donations are used to support the programs described on this site. Donations are generally final. If you believe there was an error in processing or you need a refund, please contact us at ',
    contactEmail: 'brandonbohn@barebohnzconsulting.com',
    receipts: 'Receipts will be issued if an email or contact information is provided during donation.',
    paymentProviders: 'Payments are processed by third-party providers (e.g., Stripe, M-Pesa). ADE FC does not store full payment card details on its servers; payment processors handle card data and are responsible for PCI compliance.',
    disclaimer: 'This page provides general terms for donors. It does not substitute legal advice.'
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1.25rem', lineHeight: 1.6 }}>
      <h1>{donateTerms.title}</h1>
      <p>
        {donateTerms.intro}
        <a href={`mailto:${donateTerms.contactEmail}`}>{donateTerms.contactEmail}</a>.
      </p>

      <h2>Receipts</h2>
      <p>{donateTerms.receipts}</p>

      <h2>Payment Providers</h2>
      <p>{donateTerms.paymentProviders}</p>

      <p style={{ fontStyle: 'italic', color: '#666', marginTop: '1rem' }}>{donateTerms.disclaimer}</p>
    </div>
  );
};

export default DonateTerms;
