import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1.25rem', lineHeight: 1.6 }}>
      <h1>Privacy Policy</h1>
      <p>
        ADE FC ("we", "us") collects only the personal information necessary to process donations and to
        contact supporters. We do not sell personal data. Donations are processed by third-party
        payment providers and payment details are handled directly by those providers.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Contact information you provide (name, email)</li>
        <li>Donation records (amount, date) required for receipts and accounting</li>
        <li>Optional preferences such as newsletter subscription</li>
      </ul>

      <h2>How we use your information</h2>
      <p>
        We use information to process donations, send receipts, and provide program updates. We may
        share information with trusted third-party payment processors and service providers necessary
        to administer donations and communications.
      </p>

      <h2>Your rights</h2>
      <p>
        You may contact us to request access, correction or deletion of your personal data. Contact: <a href="mailto:brandonbohn@barebohnzconsulting.com">brandonbohn@barebohnzconsulting.com</a>.
      </p>

      <p style={{ fontStyle: 'italic', color: '#666', marginTop: '1rem' }}>
        This is a minimal privacy notice for the site. It is not legal advice. If you handle significant donor data or operate across jurisdictions, consult a lawyer.
      </p>
    </div>
  );
};

export default Privacy;
