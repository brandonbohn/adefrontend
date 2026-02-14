import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/DonationError.css';

const DonationError: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<{
    error: string;
    message: string;
    cancelled: boolean;
  }>({
    error: 'unknown',
    message: 'An error occurred processing your donation',
    cancelled: false
  });

  useEffect(() => {
    const error = searchParams.get('error');
    const cancelled = searchParams.get('cancelled');
    const errorType = error || 'payment_failed';
    const isCancelled = cancelled === 'true';

    let message = '';
    let displayError = error || 'Payment Failed';

    if (isCancelled) {
      displayError = 'Payment Cancelled';
      message = 'You cancelled the donation process. No charge was made to your account.';
    } else if (errorType === 'capture_failed') {
      displayError = 'Payment Could Not Be Processed';
      message = 'We were unable to complete the payment capture. Please try again.';
    } else if (errorType === 'invalid_amount') {
      displayError = 'Invalid Donation Amount';
      message = 'The donation amount is invalid. Please enter a valid amount.';
    } else if (errorType === 'network_error') {
      displayError = 'Network Error';
      message = 'There was a network issue. Please check your connection and try again.';
    } else if (errorType === 'timeout') {
      displayError = 'Request Timeout';
      message = 'The request took too long. Please try again.';
    } else {
      message = 'Something went wrong while processing your donation. Please try again or contact us for assistance.';
    }

    setErrorDetails({
      error: displayError,
      message,
      cancelled: isCancelled
    });
  }, [searchParams]);

  return (
    <div className="donation-error-container">
      <div className="donation-error-content">
        {/* Error Header */}
        <div className="error-header">
          <div className="error-icon">✕</div>
          <h1>{errorDetails.error}</h1>
          <p className="error-subtitle">
            {errorDetails.cancelled ? 'Your donation was not processed' : 'Please try again'}
          </p>
        </div>

        {/* Error Message Box */}
        <div className="error-message-box">
          <p>{errorDetails.message}</p>
        </div>

        {/* Troubleshooting Section */}
        <div className="troubleshooting-box">
          <h3>Having Trouble?</h3>
          <ul className="troubleshooting-steps">
            <li>✓ Check your internet connection</li>
            <li>✓ Verify your payment method details</li>
            <li>✓ Ensure you have sufficient funds</li>
            <li>✓ Disable any browser extensions blocking payments</li>
            <li>✓ Try again in a few moments</li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="support-box">
          <h3>Still Need Help?</h3>
          <p>
            If you continue to experience issues, please contact our support team:
            <br />
            <strong>Email:</strong> info@adekiberafoundation.org
            <br />
            <strong>Hours:</strong> Monday - Friday, 9AM - 5PM EAT
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="error-actions">
          <a href="/donate" className="btn btn-primary">
            Try Again
          </a>
          <a href="/" className="btn btn-secondary">
            Return to Home
          </a>
        </div>

        {/* Security Note */}
        <div className="security-note">
          <p>
            💳 <strong>Your payment information is secure.</strong> If you were charged, you will receive a 
            refund within 3-5 business days. No funds were transferred if you cancelled the payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationError;
