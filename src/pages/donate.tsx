
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { getImagePath, getImageById } from '../imageRegistry';

const heroBg = '/onthefield.jpeg'; // Example image from public folder


const Donate: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState('paypal');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: ''
  });
  const [donationSubmitLoading, setDonationSubmitLoading] = useState(false);
  const [donationSubmitSuccess, setDonationSubmitSuccess] = useState(false);
  const [donationSubmitError, setDonationSubmitError] = useState('');
  const [donationFormErrors, setDonationFormErrors] = useState<Record<string, string>>({});
  const [lastDonationSummary, setLastDonationSummary] = useState<{ name: string; amount: string; currency: string } | null>(null);
  const [volunteerData, setVolunteerData] = useState<any>(null);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    interests: [] as string[],
    otherInterest: '',
    basedIn: '',
    availability: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Exchange rate: 1 USD = 130 KES (approximate)
  const USD_TO_KES = 130;
  
  const formatAmount = (amount: number) => {
    if (selectedCurrency === 'KES') {
      return `KSh ${Math.round(amount * USD_TO_KES).toLocaleString()}`;
    }
    return `$${amount}`;
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/content/section/donateSection`)
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load donation content. Please try again later.');
        setLoading(false);
      });
    
    // Fetch volunteer opportunities
    axios.get(`${API_BASE_URL}/api/volunteers`)
      .then(res => {
        setVolunteerData(res.data);
      })
      .catch(err => {
        console.error('Failed to load volunteer data:', err);
      });
  }, []);


  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#f8f3f3'}}>{error}</div>;

  // Fallbacks for missing backend data (used during loading or if backend is unavailable)
  const paymentMethods = content?.paymentMethods || [
    { key: 'paypal', label: 'PayPal', link: 'https://www.paypal.com/donate' },
    { key: 'flutterwave', label: 'Flutterwave', link: 'https://flutterwave.com/donate' },
    { key: 'mpesa', label: 'M-Pesa', link: 'https://www.safaricom.co.ke/mpesa' }
  ];
  const heroTitle = content?.heroTitle || 'Give a Girl in Kibera a Fighting Chance';
  const heroSubtitle = content?.heroSubtitle || 'Education • Nutrition • Opportunity';
  // Button/CTA configs from backend, fallback to defaults
  const donateCta = content?.donateCta || 'Help provide school fees, food, and essentials';
  const volunteerCta = content?.volunteerCta || 'Share your time, skills, or expertise';
  const sponsorCta = content?.sponsorCta || "Change one girl's entire future";
  // Button configs (labels, links, visibility)
  const donateButton = content?.donateButton || { label: 'Give Now', link: '#donate', visible: true };
  const volunteerButton = content?.volunteerButton || { label: 'Get Involved', link: '#volunteer', visible: true };
  const sponsorButton = content?.sponsorButton || { label: 'Sponsor', link: '/sponsor-a-girl', visible: true };
  // Main donation action buttons (e.g., Donate Now, Pay with M-Pesa)
  const mainDonateButtons = content?.mainDonateButtons || [
    { label: 'Donate Now', link: '#', visible: true },
    { label: 'Pay with M-Pesa', link: '#', visible: true }
  ];
  const impactExamples = content?.impactExamples || [
    { amount: 25, desc: 'School uniform for one girl' },
    { amount: 50, desc: 'One month of meals' },
    { amount: 100, desc: 'Term’s school fees' },
    { amount: 250, desc: 'Full term of school + nutrition' }
  ];
  const donationProvides = content?.donationProvides || [
    'School fees and uniforms',
    'Daily meals and nutrition',
    'Sanitary products and dignity',
    'Books and school supplies',
    'Safe transportation',
    'Football training and mentorship'
  ];
  const trustBullets = content?.trustBullets || [
    '100% of sponsorships fund girl support',
    'Transparent reporting on all spending',
    'Tax-deductible receipts (if applicable)',
    'Secure payment processing',
    'Cancel anytime'
  ];
  
  // Dynamic volunteer data from backend
  const volunteerOpportunities = volunteerData?.opportunities || [
    { icon: '🏃', title: 'Coaching', description: 'Lead football training' },
    { icon: '📚', title: 'Tutoring', description: 'Academic support' },
    { icon: '🤝', title: 'Mentorship', description: 'Life skills & guidance' },
    { icon: '🍲', title: 'Nutrition', description: 'Help with meal programs' },
    { icon: '🎨', title: 'Marketing', description: 'Tell our story' },
    { icon: '📊', title: 'Operations', description: 'Admin support' }
  ];
  
  const volunteerInterestOptions = volunteerData?.interestOptions || [
    'Football coaching',
    'Academic tutoring',
    'Mentorship/life skills',
    'Nutrition/meal programs',
    'Marketing/storytelling',
    'Operations/admin',
    'Fundraising'
  ];
  
  const locationOptions = volunteerData?.locationOptions || [
    'Nairobi/Kenya',
    'Remote/International'
  ];
  
  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);
    
    try {
      await axios.post(`${API_BASE_URL}/api/volunteers`, {
        ...volunteerForm,
        interests: [...volunteerForm.interests, volunteerForm.otherInterest].filter(Boolean)
      });
      
      setSubmitSuccess(true);
      setVolunteerForm({
        name: '',
        email: '',
        phone: '',
        location: '',
        interests: [],
        otherInterest: '',
        basedIn: '',
        availability: ''
      });
    } catch (err) {
      setSubmitError('Failed to submit form. Please try again.');
    }
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSubmitLoading(true);
    setDonationSubmitSuccess(false);
    setDonationSubmitError('');
    setDonationFormErrors({});
    setLastDonationSummary(null);

    const nextErrors: Record<string, string> = {};
    const name = donationForm.name.trim();
    const email = donationForm.email.trim();
    const amountValue = parseFloat(donationForm.amount);

    if (!name) nextErrors.name = 'Name is required.';
    if (!email) {
      nextErrors.email = 'Email is required.';
    } else if (!/.+@.+\..+/.test(email)) {
      nextErrors.email = 'Please enter a valid email.';
    }
    if (!donationForm.amount.trim() || Number.isNaN(amountValue) || amountValue <= 0) {
      nextErrors.amount = 'Please enter a valid amount.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setDonationFormErrors(nextErrors);
      setDonationSubmitLoading(false);
      setDonationSubmitError('Please fix the errors below.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/donors`, {
        name,
        email,
        phone: donationForm.phone.trim(),
        amount: amountValue,
        currency: selectedCurrency,
        paymentMethod: selectedPayment,
        message: donationForm.message.trim(),
        source: 'website'
      });

      const paymentUrl =
        response.data?.paymentUrl ||
        response.data?.redirectUrl ||
        response.data?.paymentLink ||
        response.data?.redirectURL;
      const fallbackLink = paymentMethods.find((m: any) => m.key === selectedPayment)?.link;
      const paymentLink = paymentUrl || fallbackLink;
      const shouldRedirect =
        response.data === true ||
        response.data?.success === true ||
        response.data?.ok === true ||
        response.data?.redirect === true ||
        response.data?.status === 'success' ||
        (response.status >= 200 && response.status < 300);

      if (shouldRedirect && paymentLink) {
        setDonationSubmitSuccess(true);
        setLastDonationSummary({ name, amount: donationForm.amount, currency: selectedCurrency });
        setDonationSubmitLoading(false);
        setDonationForm({
          name: '',
          email: '',
          phone: '',
          amount: '',
          message: ''
        });
        setTimeout(() => {
          window.location.replace(paymentLink);
        }, 300);
        return;
      }

      setDonationSubmitSuccess(true);
      setLastDonationSummary({ name, amount: donationForm.amount, currency: selectedCurrency });
      setDonationSubmitLoading(false);
      setDonationForm({
        name: '',
        email: '',
        phone: '',
        amount: '',
        message: ''
      });
    } catch (err) {
      setDonationSubmitLoading(false);
      setDonationSubmitError('Failed to submit donation. Please try again.');
    }
  };
  
  const handleCheckboxChange = (interest: string) => {
    setVolunteerForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };
  
  // Volunteer section
  const volunteerTitle = content?.volunteer?.title || 'Volunteer Your Time & Skills 👥';
  const volunteerSubtitle = content?.volunteer?.subtitle || 'Help us reach more girls in Kibera:';
  const volunteerOpportunitiesFromBackend = content?.volunteer?.opportunities || volunteerOpportunities;
  
  // Payment methods - not in donateSection, keep as is for now
  const paymentMethods = [
    { key: 'paypal', label: 'PayPal', link: 'https://www.paypal.com/donate' },
    { key: 'flutterwave', label: 'Flutterwave', link: 'https://flutterwave.com/donate' },
    { key: 'mpesa', label: 'M-Pesa', link: 'https://www.safaricom.co.ke/mpesa' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          width: '100%',
          minHeight: '350px',
          background: `url(${heroBg}) center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '3rem 1rem',
          color: '#23272a',
          backgroundColor: '#fff',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '2rem 3rem', borderRadius: '12px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center', letterSpacing: '-1px', color: '#ffffff', margin: 0 }}>
            {heroTitle}
          </h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 500, textAlign: 'center', marginBottom: 0, color: '#ffffff', marginTop: '1rem' }}>
            {heroSubtitle}
          </h2>
        </div>
      </section>

      {/* Three-Column Call to Action (below hero) */}
      {/* Three-Column Call to Action (white background) */}
      <section
        className="cta-boxes-section"
        style={{
          width: '95%',
          maxWidth: 1400,
          margin: '2.5rem auto 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'stretch',
          padding: '0 1rem',
        }}
      >
        {/* Donate */}
        <div className="cta-box" style={{ flex: '1 1 350px', minWidth: 300, background: '#111', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #222', minHeight: '320px' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#d32f2f' }}>{ctaItems[0]?.icon || '💰'}</span>
          <h3 style={{ color: '#d32f2f', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.35rem' }}>{ctaItems[0]?.title || 'DONATE'}</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.05rem', flex: '1' }}>{ctaItems[0]?.description || 'Help provide school fees, food, and essentials'}</p>
          <a href="#donate" style={{ textDecoration: 'none', width: '100%' }}>
            <button style={{ background: '#d32f2f', color: '#fff', padding: '0.85rem 2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1.05rem', width: '100%' }}>{ctaItems[0]?.button || 'Give Now'}</button>
          </a>
        </div>
        {/* Volunteer */}
        <div className="cta-box" style={{ flex: '1 1 350px', minWidth: 300, background: '#111', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #222', minHeight: '320px' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#388e3c' }}>{ctaItems[1]?.icon || '👥'}</span>
          <h3 style={{ color: '#388e3c', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.35rem' }}>{ctaItems[1]?.title || 'VOLUNTEER'}</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.05rem', flex: '1' }}>{ctaItems[1]?.description || 'Share your time, skills, or expertise'}</p>
          <a href="#volunteer" style={{ textDecoration: 'none', width: '100%' }}>
            <button style={{ background: '#d32f2f', color: '#fff', padding: '0.85rem 2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1.05rem', width: '100%' }}>{ctaItems[1]?.button || 'Get Involved'}</button>
          </a>
        </div>
        {/* Sponsor */}
        <div className="cta-box" style={{ flex: '1 1 350px', minWidth: 300, background: '#111', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #222', minHeight: '320px' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#e91e63' }}>{ctaItems[2]?.icon || '💝'}</span>
          <h3 style={{ color: '#e91e63', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.35rem' }}>{ctaItems[2]?.title || 'SPONSOR'}</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.05rem', flex: '1' }}>{ctaItems[2]?.description || 'Change one girl\'s entire future'}</p>
          <a href={ctaItems[2]?.link || '/sponsor-a-girl'} style={{ textDecoration: 'none', width: '100%' }}>
            <button style={{ background: '#d32f2f', color: '#fff', padding: '0.85rem 2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1.05rem', width: '100%' }}>{ctaItems[2]?.button || 'Sponsor'}</button>
          </a>
        </div>
      </section>

      {/* Spacer section for layout, if needed */}
      <section style={{ height: 24, background: '#fff' }}></section>

      {/* Trust & Transparency Section */}
  {/* Removed duplicate Trust & Transparency section. Only side-by-side layout remains. */}

      {/* Side-by-side Trust & Reality Sections */}
      <section style={{ width: '95%', maxWidth: 1400, margin: '2.5rem auto', display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center', padding: '0 1rem' }}>
        {/* Trust & Transparency Section */}
        <div className="trust-section" style={{ width: '100%' }}>
          {/* Card */}
          <div style={{ background: '#23272a', borderRadius: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.18)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 420 }}>
            {/* Image Grid - 4 images in a row on desktop, 2x2 on mobile */}
            <div className="donate-image-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '1rem', 
              width: '100%',
              marginBottom: '1.5rem'
            }}>
              {[1, 2, 3, 4].map(id => (
                <img
                  key={id}
                  src={getImagePath(id)}
                  alt={getImageById(id)?.alt || 'ADEFC'}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={120}
                  style={{ 
                    width: '100%', 
                    height: '120px', 
                    objectFit: 'cover', 
                    borderRadius: 8
                  }}
                />
              ))}
            </div>
            <h2 style={{ color: '#fff', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>{trustTitle}</h2>
            <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.1rem' }}><em>{trustCommitment}</em></p>
            <ul style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', lineHeight: 1.7, listStyle: 'disc', paddingLeft: 24, textAlign: 'left' }}>
              {trustBullets.map((item: string, idx: number) => (
                <li key={idx} style={{ color: '#d32f2f', fontWeight: 'bold' }}><span style={{ color: '#d32f2f', fontWeight: 'bold' }}>✓</span> {item}</li>
              ))}
            </ul>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <a href={content?.trust?.contactLink || '/contact'} style={{ textDecoration: 'none' }}>
                <button style={{ background: '#fff', color: '#23272a', padding: '0.85rem 2rem', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '1.1rem' }}>{content?.trust?.contactButton || 'Contact Us'}</button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Reality Check Section */}
        <div className="reality-section" style={{ width: '100%' }}>
          {/* Card */}
          <div style={{ background: '#23272a', borderRadius: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.18)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 420 }}>
            {/* Image Grid - 4 images in a row on desktop, 2x2 on mobile */}
            <div className="donate-image-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '1rem', 
              width: '100%',
              marginBottom: '1.5rem'
            }}>
              {[6, 7, 8, 9].map(id => (
                <img
                  key={id}
                  src={getImagePath(id)}
                  alt={getImageById(id)?.alt || 'ADEFC'}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={120}
                  style={{ 
                    width: '100%', 
                    height: '120px', 
                    objectFit: 'cover', 
                    borderRadius: 8
                  }}
                />
              ))}
            </div>
            <h2 style={{ color: '#fff', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>{realityTitle}</h2>
            <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.1rem' }}><em>{realitySubtitle}</em></p>
            <ul style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', lineHeight: 1.7, listStyle: 'disc', paddingLeft: 24, textAlign: 'left' }}>
              {realityBullets.map((item: string, idx: number) => (
                <li key={idx} style={{ color: '#d32f2f', fontWeight: 'bold' }}>{item}</li>
              ))}
            </ul>
            <p style={{ textAlign: 'center', color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>
              {realityFooter}
            </p>
          </div>
        </div>
      </section>
      
      {/* Responsive styles for image grid */}
      <style>{`
        @media (max-width: 768px) {
          .donate-image-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          .donate-image-grid img {
            height: 180px !important;
          }
          .volunteer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .volunteer-checkbox-grid {
            grid-template-columns: 1fr !important;
          }
          .volunteer-form {
            padding: 1.5rem !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .donate-image-grid img {
            height: 220px !important;
          }
          .volunteer-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
  <section id="donate" style={{ width: '95%', maxWidth: 1400, margin: '2.5rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', padding: '2.5rem 1.5rem', border: '1px solid #f5f5f5' }}>
  <h2 style={{ color: '#d32f2f', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>{donationTitle}</h2>
  
        <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#d32f2f', fontSize: '1.1rem' }}>
          <em>{donationSubtitle}</em><br />
          {donationDescription}
        </p>
        <ul style={{ marginBottom: '1.5rem', color: '#d32f2f', fontSize: '1.2rem', lineHeight: 1.8, listStyle: 'none', paddingLeft: 0, textAlign: 'center', maxWidth: 800, margin: '0 auto 1.5rem' }}>
          {donationProvides.map((item: string, idx: number) => (
            <li key={idx} style={{ color: '#d32f2f', fontWeight: 'bold', marginBottom: '0.5rem' }}>• {item}</li>
          ))}
        </ul>

          {/* Donation Form */}
        <form onSubmit={handleDonationSubmit} style={{ maxWidth: 860, margin: '0 auto 2.5rem', background: '#23272a', borderRadius: 12, padding: '2.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.18)', border: '2px solid #fff' }}>
          <h3 style={{ color: '#d32f2f', textAlign: 'center', marginBottom: '1rem', fontSize: '1.4rem' }}>Donation Details</h3>

            {donationSubmitSuccess && (
              <div style={{ background: '#4caf50', color: '#fff', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem', textAlign: 'center' }}>
                Thank you{lastDonationSummary?.name ? `, ${lastDonationSummary.name}` : ''}! We’ve recorded your {lastDonationSummary?.currency} {lastDonationSummary?.amount} gift. Please complete payment below.
              </div>
            )}

            {donationSubmitError && (
              <div style={{ background: '#f44336', color: '#fff', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem', textAlign: 'center' }}>
                {donationSubmitError}
              </div>
            )}

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <label style={{ color: '#fff', display: 'block', marginBottom: 6, fontSize: '1.1rem' }}>Full Name</label>
                <input
                  type="text"
                  value={donationForm.name}
                  onChange={(e) => setDonationForm({ ...donationForm, name: e.target.value })}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: 8, border: '1px solid #444', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }}
                />
                {donationFormErrors.name && (
                  <div style={{ marginTop: 6, color: '#ffdddd', fontSize: '0.9rem' }}>{donationFormErrors.name}</div>
                )}
              </div>

              <div>
                <label style={{ color: '#fff', display: 'block', marginBottom: 6, fontSize: '1.1rem' }}>Email</label>
                <input
                  type="email"
                  value={donationForm.email}
                  onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: 8, border: '1px solid #444', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }}
                />
                {donationFormErrors.email && (
                  <div style={{ marginTop: 6, color: '#ffdddd', fontSize: '0.9rem' }}>{donationFormErrors.email}</div>
                )}
              </div>

              <div>
                <label style={{ color: '#fff', display: 'block', marginBottom: 6, fontSize: '1.1rem' }}>Phone (optional)</label>
                <input
                  type="tel"
                  value={donationForm.phone}
                  onChange={(e) => setDonationForm({ ...donationForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: 8, border: '1px solid #444', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }}
                />
              </div>

              <div>
                <label style={{ color: '#fff', display: 'block', marginBottom: 6, fontSize: '1.1rem' }}>
                  Donation Amount ({selectedCurrency})
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}>
                    {selectedCurrency === 'KES' ? 'KSh' : '$'}
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={donationForm.amount}
                    onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                    placeholder={selectedCurrency === 'KES' ? 'e.g. 1000' : 'e.g. 25'}
                    style={{ flex: 1, padding: '0.85rem', borderRadius: 8, border: '1px solid #444', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }}
                  />
                </div>
                {donationFormErrors.amount && (
                  <div style={{ marginTop: 6, color: '#ffdddd', fontSize: '0.9rem' }}>{donationFormErrors.amount}</div>
                )}
              </div>

              <div>
                <label style={{ color: '#fff', display: 'block', marginBottom: 6, fontSize: '1.1rem' }}>Message (optional)</label>
                <textarea
                  rows={3}
                  value={donationForm.message}
                  onChange={(e) => setDonationForm({ ...donationForm, message: e.target.value })}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: 8, border: '1px solid #444', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }}
                />
              </div>
            </div>

            {/* Currency Selector */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <label htmlFor="currency" style={{ fontWeight: 500, marginRight: 8, color: '#fff', fontSize: '1.1rem' }}>Currency:</label>
              <select 
                id="currency" 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid #444', width: 140, background: '#111', color: '#fff', fontSize: '1.05rem' }}
              >
                <option value="USD">USD ($)</option>
                <option value="KES">KES (KSh)</option>
              </select>
            </div>
            
            {/* Payment Method Selector */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <div style={{ fontWeight: 600, marginBottom: 12, color: '#fff', fontSize: '1.1rem' }}>Choose Payment Method:</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {paymentMethods.map((method: any) => (
                  <button
                    key={method.key}
                    type="button"
                    onClick={() => setSelectedPayment(method.key)}
                    style={{
                      background: selectedPayment === method.key ? '#d32f2f' : '#fff',
                      color: selectedPayment === method.key ? '#fff' : '#d32f2f',
                      border: selectedPayment === method.key ? '2px solid #d32f2f' : '1px solid #ffd6c2',
                      fontWeight: 700,
                      borderRadius: 8,
                      padding: '0.85rem 1.6rem',
                      boxShadow: selectedPayment === method.key ? '0 2px 8px rgba(211,47,47,0.15)' : 'none',
                      cursor: 'pointer',
                      fontSize: '1.05rem'
                    }}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'center', color: '#fff', fontSize: '1.05rem' }}>
              Selected payment method: <strong>{paymentMethods.find((m: any) => m.key === selectedPayment)?.label || '—'}</strong>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                type="submit"
                disabled={donationSubmitLoading}
                style={{ background: '#d32f2f', color: '#fff', padding: '0.85rem 2rem', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '1.05rem', cursor: donationSubmitLoading ? 'not-allowed' : 'pointer', width: '100%', maxWidth: 320 }}
              >
                {donationSubmitLoading ? 'Submitting…' : 'Submit Donation'}
              </button>
            </div>
          </form>
      </section>

      {/* VOLUNTEER SECTION - DYNAMIC */}
      <section id="volunteer" style={{ width: '95%', maxWidth: 1400, margin: '2.5rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 1.5rem' }}>
        <h2 style={{ color: '#d32f2f', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>
          {volunteerTitle}
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#d32f2f', fontSize: '1.1rem' }}>
          <em>{volunteerSubtitle}</em>
        </p>
        
        {/* Opportunities Grid - DYNAMIC */}
        <div className="volunteer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          {volunteerOpportunitiesFromBackend.map((opportunity: any, idx: number) => (
            <div key={idx} style={{ background: '#23272a', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
              <span style={{ fontSize: '2rem', color: '#fff' }}>{opportunity.icon}</span><br />
              <strong style={{ color: '#fff' }}>{opportunity.title}</strong><br />
              <span style={{ color: '#fff' }}>{opportunity.description}</span>
            </div>
          ))}
        </div> 
        
        {/* Volunteer Interest Form - DYNAMIC with Backend Submission */}
        <form onSubmit={handleVolunteerSubmit} className="volunteer-form" style={{ background: '#23272a', borderRadius: 12, padding: '2.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.18)', maxWidth: 860, margin: '0 auto', width: '100%', border: '2px solid #fff' }}>
          <h3 style={{ color: '#d32f2f', marginBottom: '1rem', textAlign: 'center', fontSize: '1.4rem' }}>Volunteer Interest Form:</h3>
          
          {submitSuccess && (
            <div style={{ background: '#4caf50', color: '#fff', padding: '1rem', borderRadius: 8, marginBottom: '1rem', textAlign: 'center' }}>
              Thank you! We'll be in touch soon.
            </div>
          )}
          
          {submitError && (
            <div style={{ background: '#f44336', color: '#fff', padding: '1rem', borderRadius: 8, marginBottom: '1rem', textAlign: 'center' }}>
              {submitError}
            </div>
          )}
          
          <div style={{ marginBottom: '1rem' }}>
            <input 
              type="text" 
              placeholder="Name" 
              value={volunteerForm.name}
              onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
              required
              style={{ width: '100%', padding: '0.85rem', borderRadius: 8, border: '1px solid #444', marginBottom: '0.75rem', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={volunteerForm.email}
              onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
              required
              style={{ width: '100%', padding: '0.85rem', borderRadius: 8, border: '1px solid #444', marginBottom: '0.75rem', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }} 
            />
            <input 
              type="text" 
              placeholder="Phone" 
              value={volunteerForm.phone}
              onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
              style={{ width: '100%', padding: '0.85rem', borderRadius: 8, border: '1px solid #444', marginBottom: '0.75rem', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }} 
            />
            <input 
              type="text" 
              placeholder="Location" 
              value={volunteerForm.location}
              onChange={(e) => setVolunteerForm({...volunteerForm, location: e.target.value})}
              style={{ width: '100%', padding: '0.85rem', borderRadius: 8, border: '1px solid #444', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }} 
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 600, color: '#fff', display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>I can help with:</label>
            <div className="volunteer-checkbox-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: '#fff' }}>
              {volunteerInterestOptions.map((option: string, idx: number) => (
                <label key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={volunteerForm.interests.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    style={{ marginRight: '0.5rem', width: 18, height: 18 }} 
                  /> {option}
                </label>
              ))}
              <label style={{ display: 'flex', alignItems: 'center' }}>
                Other: 
                <input 
                  type="text" 
                  value={volunteerForm.otherInterest}
                  onChange={(e) => setVolunteerForm({...volunteerForm, otherInterest: e.target.value})}
                  style={{ borderRadius: 6, border: '1px solid #444', padding: '0.5rem', marginLeft: '0.5rem', flex: 1, background: '#111', color: '#fff', fontSize: '1.05rem' }} 
                />
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 600, color: '#fff', display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>I'm based in:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {locationOptions.map((location: string, idx: number) => (
                <label key={idx} style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="radio" 
                    name="basedIn" 
                    value={location}
                    checked={volunteerForm.basedIn === location}
                    onChange={(e) => setVolunteerForm({...volunteerForm, basedIn: e.target.value})}
                    style={{ marginRight: '0.5rem', width: 18, height: 18 }} 
                  /> {location}
                </label>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 600, color: '#fff', display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Availability:</label>
            <input 
              type="text" 
              placeholder="e.g. weekends, evenings" 
              value={volunteerForm.availability}
              onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
              style={{ width: '100%', padding: '0.85rem', borderRadius: 8, border: '1px solid #444', background: '#111', color: '#fff', boxSizing: 'border-box', fontSize: '1.05rem' }} 
            />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ background: '#d32f2f', color: '#fff', padding: '1rem 2.25rem', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '1.15rem', cursor: 'pointer', width: '100%', maxWidth: '340px' }}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Donate;
