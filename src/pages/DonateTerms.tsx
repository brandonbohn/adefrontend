
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const DonateTerms: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/content`)
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load donation terms. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
  if (loading) return <div style={{ textAlign: 'center', margin: '2rem', color: '#fff' }}>Loading donation terms...</div>;

  const donateTerms = content?.donateTerms || {
    title: 'Donation Terms',
    intro: 'By donating to ADE FC you acknowledge that donations are used to support the programs described on this site. Donations are generally final. If you believe there was an error in processing or you need a refund, please contact us at ',
    contactEmail: 'brandonbohn@barebohnzconsulting.com',
    receipts: 'Receipts will be issued if an email or contact information is provided during donation.',
    paymentProviders: 'Payments are processed by third-party providers (e.g., Stripe, M-Pesa). ADE FC does not store full payment card details on its servers; payment processors handle card data and are responsible for PCI compliance.',
    disclaimer: 'This page provides general terms for donors. It does not substitute legal advice.'
  };

  return (
    <div style={{ maxWidth: 960, margin: '2rem auto', padding: '1.25rem' }}>
      <div style={{ background: '#111', color: '#fff', borderRadius: 12, padding: '2rem', lineHeight: 1.7, boxShadow: '0 14px 32px rgba(0,0,0,0.28)' }}>
        <h1>{donateTerms.title}</h1>
        <p>
          {donateTerms.intro}
          <a href={`mailto:${donateTerms.contactEmail}`} style={{ color: '#ffb3c7' }}>{donateTerms.contactEmail}</a>.
        </p>

        <h2>Receipts</h2>
        <p>{donateTerms.receipts}</p>

        <h2>Payment Providers</h2>
        <p>{donateTerms.paymentProviders}</p>

        <p style={{ fontStyle: 'italic', color: '#d5d5d5', marginTop: '1rem' }}>{donateTerms.disclaimer}</p>
      </div>
    </div>
  );
};

export default DonateTerms;
