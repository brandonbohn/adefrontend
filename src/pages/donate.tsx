
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const heroBg = '/onthefield.jpeg'; // Example image from public folder


const Donate: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState('paypal');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/content')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load donation content. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
  if (!content) return null;

  // Fallbacks for missing backend data
  const paymentMethods = content.paymentMethods || [
    { key: 'paypal', label: 'PayPal' },
    { key: 'flutterwave', label: 'Flutterwave' },
    { key: 'mpesa', label: 'M-Pesa' }
  ];
  const heroTitle = content.heroTitle || 'Give a Girl in Kibera a Fighting Chance';
  const heroSubtitle = content.heroSubtitle || 'Education • Nutrition • Opportunity';
  const donateCta = content.donateCta || 'Help provide school fees, food, and essentials';
  const volunteerCta = content.volunteerCta || 'Share your time, skills, or expertise';
  const sponsorCta = content.sponsorCta || "Change one girl's entire future";
  const impactExamples = content.impactExamples || [
    { amount: 25, desc: 'School uniform for one girl' },
    { amount: 50, desc: 'One month of meals' },
    { amount: 100, desc: 'Term’s school fees' },
    { amount: 250, desc: 'Full term of school + nutrition' }
  ];
  const donationProvides = content.donationProvides || [
    'School fees and uniforms',
    'Daily meals and nutrition',
    'Sanitary products and dignity',
    'Books and school supplies',
    'Safe transportation',
    'Football training and mentorship'
  ];
  const trustBullets = content.trustBullets || [
    '100% of sponsorships fund girl support',
    'Transparent reporting on all spending',
    'Tax-deductible receipts (if applicable)',
    'Secure payment processing',
    'Cancel anytime'
  ];
  const realityBullets = content.realityBullets || [
    'Dropping out of school permanently',
    'Child marriage',
    'Exploitation and abuse',
    'Chronic malnutrition',
    'No path out of extreme poverty'
  ];
  const donationIntro = content.donationIntro || 'In Kibera, girls face impossible choices.';
  const donationOutro = content.donationOutro || 'Football is how we reach them. Education and nutrition are how we change their lives.';

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
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center', letterSpacing: '-1px', color: '#d32f2f', textShadow: '0 2px 12px rgba(255,255,255,0.25)' }}>
          {heroTitle}
        </h1>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 500, textAlign: 'center', marginBottom: 0, color: '#d32f2f', textShadow: '0 1px 8px rgba(255,255,255,0.18)' }}>
          {heroSubtitle}
        </h2>
      </section>

      {/* Three-Column Call to Action (below hero) */}
      {/* Three-Column Call to Action (white background) */}
      <section
        style={{
          width: '100%',
          maxWidth: 1100,
          margin: '2.5rem auto 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'stretch',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}
      >
        {/* Donate */}
        <div style={{ flex: '1 1 320px', minWidth: 320, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #f5f5f5' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#d32f2f' }}>💰</span>
          <h3 style={{ color: '#d32f2f', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.35rem' }}>DONATE</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#23272a', fontSize: '1.05rem' }}>{donateCta}</p>
          <button style={{ background: '#d32f2f', color: '#fff', padding: '0.85rem 2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1.05rem', marginTop: 'auto' }}>Give Now</button>
        </div>
        {/* Volunteer */}
        <div style={{ flex: '1 1 320px', minWidth: 320, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #f5f5f5' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#388e3c' }}>👥</span>
          <h3 style={{ color: '#388e3c', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.35rem' }}>VOLUNTEER</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#23272a', fontSize: '1.05rem' }}>{volunteerCta}</p>
          <button style={{ background: '#388e3c', color: '#fff', padding: '0.85rem 2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1.05rem', marginTop: 'auto' }}>Get Involved</button>
        </div>
        {/* Sponsor */}
        <div style={{ flex: '1 1 320px', minWidth: 320, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #f5f5f5' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#e91e63' }}>💝</span>
          <h3 style={{ color: '#e91e63', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.35rem' }}>SPONSOR</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#23272a', fontSize: '1.05rem' }}>{sponsorCta}</p>
          <a href="/sponsor-a-girl" style={{ textDecoration: 'none', marginTop: 'auto', width: '100%' }}>
            <button style={{ background: '#e91e63', color: '#fff', padding: '0.85rem 2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1.05rem', width: '100%' }}>Sponsor</button>
          </a>
        </div>
      </section>

      {/* Spacer section for layout, if needed */}
      <section style={{ height: 24, background: '#fff' }}></section>

      {/* Trust & Transparency Section */}
  {/* Removed duplicate Trust & Transparency section. Only side-by-side layout remains. */}

      {/* Side-by-side Trust & Reality Sections */}
      <section style={{ width: '100%', maxWidth: 1400, margin: '2.5rem auto', display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'stretch' }}>
        {/* Trust & Transparency */}
        <div style={{ flex: '1 1 0', background: '#23272a', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', padding: '2.5rem 1.5rem', minWidth: 320, maxWidth: 700, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>Your Money Goes Directly to the Girls</h2>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.1rem' }}><em>Our Commitment:</em></p>
          <ul style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', lineHeight: 1.7, listStyle: 'disc', paddingLeft: 24 }}>
            {trustBullets.map((item: string, idx: number) => (
              <li key={idx} style={{ color: '#d32f2f', fontWeight: 'bold' }}><span style={{ color: '#d32f2f', fontWeight: 'bold' }}>✓</span> {item}</li>
            ))}
          </ul>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <a href="/contact" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#fff', color: '#23272a', padding: '0.85rem 2rem', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '1.1rem' }}>Contact Us</button>
            </a>
          </div>
        </div>
        {/* Reality Check */}
        <div style={{ flex: '1 1 0', background: '#23272a', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', padding: '2.5rem 1.5rem', minWidth: 320, maxWidth: 700, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>The Reality in Kibera</h2>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.1rem' }}><em>Without support, these girls face:</em></p>
          <ul style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', lineHeight: 1.7, listStyle: 'disc', paddingLeft: 24 }}>
            {realityBullets.map((item: string, idx: number) => (
              <li key={idx} style={{ color: '#d32f2f', fontWeight: 'bold' }}>{item}</li>
            ))}
          </ul>
          <p style={{ textAlign: 'center', color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>
            Football brings them together. Your support keeps them in school, fed, and dreaming of a better future.
          </p>
        </div>
      </section>
  <section style={{ width: '100%', maxWidth: 700, margin: '2.5rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', padding: '2.5rem 1.5rem', border: '1px solid #f5f5f5' }}>
  <h2 style={{ color: '#d32f2f', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>Make a Donation 💰</h2>
  <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#23272a', fontSize: '1.1rem' }}>
          <em>{donationIntro}</em><br />
          Your donation provides:
        </p>
  <ul style={{ marginBottom: '1.5rem', color: '#23272a', fontSize: '1rem', lineHeight: 1.7, listStyle: 'disc', paddingLeft: 24 }}>
    {donationProvides.map((item: string, idx: number) => (
      <li key={idx} style={{ color: '#d32f2f', fontWeight: 'bold' }}>{item}</li>
    ))}
  </ul>
        {/* Currency Selector */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <label htmlFor="currency" style={{ fontWeight: 500, marginRight: 8 }}>Currency:</label>
          <select id="currency" style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ffd6c2', width: 100 }}>
            <option value="USD">USD ($)</option>
            <option value="KES">KES (KSh)</option>
          </select>
        </div>
        {/* Payment Method Selector */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 8, color: '#d32f2f' }}>Choose Payment Method:</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
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
                  padding: '0.7rem 1.5rem',
                  boxShadow: selectedPayment === method.key ? '0 2px 8px rgba(211,47,47,0.15)' : 'none',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: '#f9f9f9', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #f5f5f5' }}>
          <h3 style={{ color: '#d32f2f', marginBottom: '1rem', textAlign: 'center' }}>Make an Impact:</h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {impactExamples.map((ex: any, idx: number) => (
              <button key={idx} style={{ padding: '0.7rem 1.5rem', borderRadius: 8, border: 'none', background: '#d32f2f', color: '#fff', fontWeight: 600 }}>{ex.amount}</button>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <label htmlFor="customAmount" style={{ marginRight: 8, fontWeight: 500 }}>Custom Amount:</label>
            <input id="customAmount" type="number" min="1" placeholder="Amount" style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ffd6c2', width: 120 }} />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500, marginRight: 8 }}>Frequency:</span>
            <label style={{ marginRight: 12 }}><input type="radio" name="frequency" defaultChecked /> One-time</label>
            <label><input type="radio" name="frequency" /> Monthly</label>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button style={{ background: '#d32f2f', color: '#fff', padding: '0.85rem 2rem', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '1.1rem', marginRight: 10 }}>Donate Now</button>
            <button style={{ background: '#d32f2f', color: '#fff', padding: '0.85rem 2rem', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '1.1rem' }}>Pay with M-Pesa</button>
          </div>
        </div>
        {/* Impact Examples */}
        <div style={{ marginBottom: '1.5rem', color: '#d32f2f', fontSize: '1rem', textAlign: 'center', fontWeight: 700 }}>
          {impactExamples.map((ex: any, idx: number) => (
            <div key={idx}><strong>{ex.amount}</strong> = {ex.desc}</div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: '#23272a', fontWeight: 500, fontSize: '1.1rem' }}>
          {donationOutro}
        </p>
      </section>
      {/* Volunteer Section */}
  <section style={{ width: '100%', maxWidth: 900, margin: '2.5rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 1.5rem' }}>
  <h2 style={{ color: '#d32f2f', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>Volunteer Your Time & Skills 👥</h2>
  <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#d32f2f', fontSize: '1.1rem' }}>
          <em>Help us reach more girls in Kibera:</em>
        </p>
        {/* Opportunities Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#23272a', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
            <span style={{ fontSize: '2rem', color: '#fff' }}>🏃</span><br />
            <strong style={{ color: '#fff' }}>Coaching</strong><br /><span style={{ color: '#fff' }}>Lead football training</span>
          </div>
          <div style={{ background: '#23272a', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
            <span style={{ fontSize: '2rem', color: '#fff' }}>📚</span><br />
            <strong style={{ color: '#fff' }}>Tutoring</strong><br /><span style={{ color: '#fff' }}>Academic support</span>
          </div>
          <div style={{ background: '#23272a', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
            <span style={{ fontSize: '2rem', color: '#fff' }}>🤝</span><br />
            <strong style={{ color: '#fff' }}>Mentorship</strong><br /><span style={{ color: '#fff' }}>Life skills & guidance</span>
          </div>
          <div style={{ background: '#23272a', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
            <span style={{ fontSize: '2rem', color: '#fff' }}>🍲</span><br />
            <strong style={{ color: '#fff' }}>Nutrition</strong><br /><span style={{ color: '#fff' }}>Help with meal programs</span>
          </div>
          <div style={{ background: '#23272a', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
            <span style={{ fontSize: '2rem', color: '#fff' }}>🎨</span><br />
            <strong style={{ color: '#fff' }}>Marketing</strong><br /><span style={{ color: '#fff' }}>Tell our story</span>
          </div>
          <div style={{ background: '#23272a', borderRadius: 12, padding: '1.25rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
            <span style={{ fontSize: '2rem', color: '#fff' }}>📊</span><br />
            <strong style={{ color: '#fff' }}>Operations</strong><br /><span style={{ color: '#fff' }}>Admin support</span>
          </div>
        </div> 
      
        {/* Volunteer Interest Form */}
        <form style={{ background: '#fff', borderRadius: 12, padding: '2rem', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', maxWidth: 600, margin: '0 auto' }}>
          <h3 style={{ color: '#1976d2', marginBottom: '1rem', textAlign: 'center' }}>Volunteer Interest Form:</h3>
          <div style={{ marginBottom: '1rem' }}>
            <input type="text" placeholder="Name" style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #b3c6e6', marginBottom: '0.5rem' }} />
            <input type="email" placeholder="Email" style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #b3c6e6', marginBottom: '0.5rem' }} />
            <input type="text" placeholder="Phone" style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #b3c6e6', marginBottom: '0.5rem' }} />
            <input type="text" placeholder="Location" style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #b3c6e6' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 500 }}>I can help with:</label><br />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <label><input type="checkbox" /> Football coaching</label>
              <label><input type="checkbox" /> Academic tutoring</label>
              <label><input type="checkbox" /> Mentorship/life skills</label>
              <label><input type="checkbox" /> Nutrition/meal programs</label>
              <label><input type="checkbox" /> Marketing/storytelling</label>
              <label><input type="checkbox" /> Operations/admin</label>
              <label><input type="checkbox" /> Fundraising</label>
              <label>Other: <input type="text" style={{ borderRadius: 6, border: '1px solid #b3c6e6', padding: '0.3rem', width: 100 }} /></label>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 500 }}>I'm based in:</label><br />
            <label style={{ marginRight: 16 }}><input type="radio" name="location" /> Nairobi/Kenya</label>
            <label><input type="radio" name="location" /> Remote/International</label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 500 }}>Availability:</label><br />
            <input type="text" placeholder="e.g. weekends, evenings" style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #b3c6e6' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ background: '#d32f2f', color: '#fff', padding: '0.85rem 2rem', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '1.1rem' }}>Submit</button>
          </div>
        </form>
      </section>


      {/* Donation Section */}
 

      {/* Three-Column Call to Action */}
      <section
        style={{
          width: '100%',
          maxWidth: 1100,
          margin: '2.5rem auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
      
       
      </section>
    </>
  );
};

export default Donate;
