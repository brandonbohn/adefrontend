import React from 'react';

const DonateTerms: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1.25rem', lineHeight: 1.6 }}>
      <h1>Donation Terms</h1>
      <p>
        By donating to ADE FC you acknowledge that donations are used to support the programs
        described on this site. Donations are generally final. If you believe there was an error
        in processing or you need a refund, please contact us at <a href="mailto:brandonbohn@barebohnzconsulting.com">brandonbohn@barebohnzconsulting.com</a>.
      </p>

      <h2>Receipts</h2>
      <p>
        Receipts will be issued if an email or contact information is provided during donation.
      </p>

      <h2>Payment Providers</h2>
      <p>
        Payments are processed by third-party providers (e.g., Stripe, M-Pesa). ADE FC does not store full
        payment card details on its servers; payment processors handle card data and are responsible for
        PCI compliance.
      </p>

      <p style={{ fontStyle: 'italic', color: '#666', marginTop: '1rem' }}>
        This page provides general terms for donors. It does not substitute legal advice.
      </p>
    </div>
  );
};

export default DonateTerms;
