import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/DonationSuccess.css';

const DonationSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [donationDetails, setDonationDetails] = useState<{
    donorId: string;
    token: string;
    payerId: string;
  } | null>(null);

  useEffect(() => {
    const donorId = searchParams.get('donorId');
    const token = searchParams.get('token');
    const payerId = searchParams.get('PayerID');

    if (donorId || token || payerId) {
      setDonationDetails({
        donorId: donorId || '',
        token: token || '',
        payerId: payerId || ''
      });
    }
  }, [searchParams]);

  return (
    <div className="donation-success-container">
      <div className="donation-success-content">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Thank You for Your Generous Donation!</h1>
          <p className="success-subtitle">Your contribution will make a real difference</p>
        </div>

        {/* Main Message Box */}
        <div className="success-message-box">
          <p>
            We deeply appreciate your compassion and support. Your donation will directly help us continue our mission to 
            empower and uplift the communities we serve. Together, we are creating lasting positive change.
          </p>
        </div>

        {/* Donation Details */}
        {donationDetails && (
          <div className="donation-details-box">
            <h3>Donation Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Transaction ID</span>
                <span className="detail-value">{donationDetails.token || 'Pending'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Donor ID</span>
                <span className="detail-value">{donationDetails.donorId?.substring(0, 12)}...</span>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Email Box */}
        <div className="confirmation-box">
          <h3>What Happens Next?</h3>
          <ul className="next-steps">
            <li>📧 You will receive a confirmation email shortly</li>
            <li>🔗 A receipt and tax documentation will be sent to you</li>
            <li>📊 Track the impact of your donation on our website</li>
            <li>💌 Stay updated with our newsletters and success stories</li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="success-actions">
          <a href="/" className="btn btn-primary">
            Return to Home
          </a>
          <a href="/donate" className="btn btn-secondary">
            Make Another Donation
          </a>
        </div>

        {/* Additional Message */}
        <div className="impact-message">
          <p>
            Questions? Contact us at <strong>info@adekiberafoundation.org</strong> or call us for more information about how your donation is making an impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
