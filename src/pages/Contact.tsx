

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageComponent from '../components/ImageComponent';


const Contact = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://adebackend-production.up.railway.app/api/content')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load contact content. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
  if (!content) return null;

  // Fallbacks for missing backend data
  const leftImages = content.contactLeftImages || [
    { id: 14, alt: 'Green Team' },
    { id: 18, alt: 'Team and Coaches' },
    { id: 23, alt: 'Two Girls' }
  ];
  const rightImages = content.contactRightImages || [
    { id: 21, alt: 'Team Photo on Field' },
    { id: 24, alt: 'White Team' },
    { id: 17, alt: 'Success Story' }
  ];
  const contactTitle = content.contactTitle || 'Contact Us';
  const contactFormFields = content.contactFormFields || [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'organization', label: 'Organization/Company', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'phone', label: 'Phone', type: 'tel' },
    { id: 'reason', label: 'Reason for Contact', type: 'select', options: [
      { value: '', label: 'Select a reason' },
      { value: 'volunteering', label: 'Volunteering' },
      { value: 'donation', label: 'Donation' },
      { value: 'partnership', label: 'Partnership' },
      { value: 'general', label: 'General Inquiry' },
      { value: 'other', label: 'Other' }
    ] },
    { id: 'subject', label: 'Subject', type: 'text' },
    { id: 'message', label: 'Message', type: 'textarea' }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem', margin: '3rem auto', maxWidth: 1100 }}>
      {/* Left images */}
      <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        {leftImages.map((img: any, idx: number) => (
          <ImageComponent key={idx} id={img.id} alt={img.alt} width={120} height={180} customStyle={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 12 }} />
        ))}
      </div>
      {/* Contact form */}
      <div className="dark-card" style={{ flex: 1, minWidth: 320, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '2rem', background: '#a31515' }}>
        <h2 style={{ color: 'var(--text-on-dark)', marginBottom: '1rem' }}>{contactTitle}</h2>
        <form>
          {contactFormFields.map((field: any, idx: number) => (
            <div key={field.id} style={{ marginBottom: '1rem' }}>
              <label htmlFor={field.id} style={{ display: 'block', marginBottom: 4, color: 'var(--text-on-dark)' }}>{field.label}</label>
              {field.type === 'select' ? (
                <select id={field.id} name={field.id} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }}>
                  {field.options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea id={field.id} name={field.id} rows={4} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
              ) : (
                <input id={field.id} name={field.id} type={field.type} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
              )}
            </div>
          ))}
          <button type="submit" style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '0.75rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>Send</button>
        </form>
      </div>
      {/* Right images */}
      <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        {rightImages.map((img: any, idx: number) => (
          <ImageComponent key={idx} id={img.id} alt={img.alt} width={120} height={180} customStyle={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 12 }} />
        ))}
      </div>
    </div>
  );
};

export default Contact;
