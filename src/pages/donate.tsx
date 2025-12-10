
import React from 'react';

const heroBg = '/onthefield.jpeg'; // Example image from public folder


const Donate: React.FC = () => {
  return (
    <>
      <section
        style={{
          width: '100%',
          minHeight: '350px',
          background: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroBg}) center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '3rem 1rem',
          color: '#fff',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
        }}
      >
  <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center', letterSpacing: '-1px', color: '#ff7043', textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
          Give a Girl in Kibera a Fighting Chance
        </h1>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 500, textAlign: 'center', marginBottom: 0, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
          Education &bull; Nutrition &bull; Opportunity
        </h2>
      </section>

      {/* Three-Column Call to Action (below hero) */}
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
        }}
      >
        {/* Donate */}
        <div style={{ flex: '1 1 320px', minWidth: 320, background: '#23272a', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#ff7043' }}>💰</span>
          <h3 style={{ color: '#ff7043', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.35rem' }}>DONATE</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.05rem' }}>Help provide school fees, food, and essentials</p>
          <button style={{ background: '#ff7043', color: '#23272a', padding: '0.85rem 2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1.05rem', marginTop: 'auto' }}>Give Now</button>
        </div>
        {/* Volunteer */}
        <div style={{ flex: '1 1 320px', minWidth: 320, background: '#23272a', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#7fbf7f' }}>👥</span>
          <h3 style={{ color: '#7fbf7f', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.35rem' }}>VOLUNTEER</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.05rem' }}>Share your time, skills, or expertise</p>
          <button style={{ background: '#7fbf7f', color: '#23272a', padding: '0.85rem 2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1.05rem', marginTop: 'auto' }}>Get Involved</button>
        </div>
        {/* Sponsor */}
        <div style={{ flex: '1 1 320px', minWidth: 320, background: '#23272a', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#e91e63' }}>💝</span>
          <h3 style={{ color: '#e91e63', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1.35rem' }}>SPONSOR</h3>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.05rem' }}>Change one girl's entire future</p>
          <a href="/sponsor-a-girl" style={{ textDecoration: 'none', marginTop: 'auto', width: '100%' }}>
            <button style={{ background: '#e91e63', color: '#fff', padding: '0.85rem 2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1.05rem', width: '100%' }}>Sponsor</button>
          </a>
        </div>
      </section>

      <section
       
      >
      
        
      </section>

      {/* Trust & Transparency Section */}
  {/* Removed duplicate Trust & Transparency section. Only side-by-side layout remains. */}

      {/* Side-by-side Trust & Reality Sections */}
      <section style={{ width: '100%', maxWidth: 1400, margin: '2.5rem auto', display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'stretch' }}>
        {/* Trust & Transparency */}
        <div style={{ flex: '1 1 0', background: '#23272a', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', padding: '2.5rem 1.5rem', minWidth: 320, maxWidth: 700, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>Your Money Goes Directly to the Girls</h2>
          <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.1rem' }}><em>Our Commitment:</em></p>
          <ul style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', lineHeight: 1.7 }}>
            <li><span style={{ color: '#d32f2f', fontWeight: 'bold' }}>✓</span> <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>100% of sponsorships fund girl support</span></li>
            <li><span style={{ color: '#d32f2f', fontWeight: 'bold' }}>✓</span> <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Transparent reporting on all spending</span></li>
            <li><span style={{ color: '#d32f2f', fontWeight: 'bold' }}>✓</span> <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Tax-deductible receipts (if applicable)</span></li>
            <li><span style={{ color: '#d32f2f', fontWeight: 'bold' }}>✓</span> <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Secure payment processing</span></li>
            <li><span style={{ color: '#d32f2f', fontWeight: 'bold' }}>✓</span> <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Cancel anytime</span></li>
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
          <ul style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', lineHeight: 1.7 }}>
            <li>Dropping out of school permanently</li>
            <li>Child marriage</li>
            <li>Exploitation and abuse</li>
            <li>Chronic malnutrition</li>
            <li>No path out of extreme poverty</li>
          </ul>
          <p style={{ textAlign: 'center', color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>
            Football brings them together. Your support keeps them in school, fed, and dreaming of a better future.
          </p>
        </div>
      </section>
  <section style={{ width: '100%', maxWidth: 700, margin: '2.5rem auto', background: '#23272a', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', padding: '2.5rem 1.5rem' }}>
  <h2 style={{ color: '#fff', textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem' }}>Make a Donation 💰</h2>
  <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: '#fff', fontSize: '1.1rem' }}>
          <em>In Kibera, girls face impossible choices.</em><br />
          Your donation provides:
        </p>
  <ul style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', lineHeight: 1.7 }}>
          <li>School fees and uniforms</li>
          <li>Daily meals and nutrition</li>
          <li>Sanitary products and dignity</li>
          <li>Books and school supplies</li>
          <li>Safe transportation</li>
          <li>Football training and mentorship</li>
        </ul>
        {/* Currency Selector */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <label htmlFor="currency" style={{ fontWeight: 500, marginRight: 8 }}>Currency:</label>
          <select id="currency" style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ffd6c2', width: 100 }}>
            <option value="USD">USD ($)</option>
            <option value="KES">KES (KSh)</option>
          </select>
        </div>
        {/* Donation Form */}
        <div style={{ background: '#fff8f2', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ color: '#d32f2f', marginBottom: '1rem', textAlign: 'center' }}>Make an Impact:</h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button style={{ padding: '0.7rem 1.5rem', borderRadius: 8, border: '1px solid #ffd6c2', background: '#fff', color: '#d32f2f', fontWeight: 600 }}>25</button>
            <button style={{ padding: '0.7rem 1.5rem', borderRadius: 8, border: '1px solid #ffd6c2', background: '#fff', color: '#d32f2f', fontWeight: 600 }}>50</button>
            <button style={{ padding: '0.7rem 1.5rem', borderRadius: 8, border: '1px solid #ffd6c2', background: '#fff', color: '#d32f2f', fontWeight: 600 }}>100</button>
            <button style={{ padding: '0.7rem 1.5rem', borderRadius: 8, border: '1px solid #ffd6c2', background: '#fff', color: '#d32f2f', fontWeight: 600 }}>250</button>
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
            <button style={{ background: '#009e3c', color: '#fff', padding: '0.85rem 2rem', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '1.1rem' }}>Pay with M-Pesa</button>
          </div>
        </div>
        {/* Impact Examples */}
  <div style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', textAlign: 'center' }}>
          <div><strong>25</strong> = School uniform for one girl</div>
          <div><strong>50</strong> = One month of meals</div>
          <div><strong>100</strong> = Term’s school fees</div>
          <div><strong>250</strong> = Full term of school + nutrition</div>
        </div>
  <p style={{ textAlign: 'center', color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>
          Football is how we reach them. Education and nutrition are how we change their lives.
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
            <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '0.85rem 2rem', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '1.1rem' }}>Submit</button>
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
