

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import ImageComponent from '../components/ImageComponent';


const Contact = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/content`)
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load contact content. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;

  // Fallbacks for missing backend data
  const leftImages = content?.contactLeftImages || [
    { id: 14, alt: 'Green Team' },
    { id: 18, alt: 'Team and Coaches' },
    { id: 23, alt: 'Two Girls' }
  ];
  const rightImages = content?.contactRightImages || [
    { id: 21, alt: 'Team Photo on Field' },
    { id: 24, alt: 'White Team' },
    { id: 17, alt: 'Success Story' }
  ];
  const contactTitle = content?.contactTitle || 'Contact Us';
  const contactFormFields = content?.contactFormFields || [
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

  // Initialize dynamic form state whenever backend fields change
  useEffect(() => {
    const next: Record<string, string> = {};
    contactFormFields.forEach((f: any) => {
      next[f.id] = formData[f.id] ?? '';
    });
    setFormData(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const handleFieldChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitSuccess(false);
    setSubmitError('');
    setFormErrors({});

    // Basic validation: require name, email, message (if present)
    const requiredIds = ['name', 'email', 'message'];
    const presentRequired = contactFormFields
      .filter((f: any) => requiredIds.includes(f.id))
      .map((f: any) => f.id);
    const nextErrors: Record<string, string> = {};
    presentRequired.forEach((id: string) => {
      const val = (formData[id] || '').trim();
      if (!val) {
        nextErrors[id] = 'This field is required';
      }
    });
    if (presentRequired.includes('email')) {
      const email = (formData['email'] || '').trim();
      const emailOk = /.+@.+\..+/.test(email);
      if (email && !emailOk) {
        nextErrors['email'] = 'Please enter a valid email';
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      setSubmitLoading(false);
      setSubmitError('Please fix the errors below.');
      return;
    }
    try {
      await axios.post('https://adebackend.onrender.com/api/contacts', {
        ...formData,
      });
      setSubmitSuccess(true);
      setSubmitLoading(false);
      // clear only non-selects by default
      const cleared: Record<string, string> = {};
      contactFormFields.forEach((f: any) => {
        cleared[f.id] = f.type === 'select' ? formData[f.id] ?? '' : '';
      });
      setFormData(cleared);
    } catch (err: any) {
      setSubmitLoading(false);
      setSubmitError('Failed to send message. Please try again.');
    }
  };

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
        {submitSuccess && (
          <div style={{ background: '#4caf50', color: '#fff', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem' }}>
            Thank you! We will get back to you soon.
          </div>
        )}
        {submitError && (
          <div style={{ background: '#f44336', color: '#fff', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem' }}>
            {submitError}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          {contactFormFields.map((field: any, idx: number) => (
            <div key={field.id} style={{ marginBottom: '1rem' }}>
              <label htmlFor={field.id} style={{ display: 'block', marginBottom: 4, color: 'var(--text-on-dark)' }}>{field.label}</label>
              {field.type === 'select' ? (
                <select id={field.id} name={field.id} value={formData[field.id] ?? ''} onChange={(e) => handleFieldChange(field.id, e.target.value)} aria-invalid={!!formErrors[field.id]} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }}>
                  {field.options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea id={field.id} name={field.id} rows={4} value={formData[field.id] ?? ''} onChange={(e) => handleFieldChange(field.id, e.target.value)} aria-invalid={!!formErrors[field.id]} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
              ) : (
                <input id={field.id} name={field.id} type={field.type} value={formData[field.id] ?? ''} onChange={(e) => handleFieldChange(field.id, e.target.value)} aria-invalid={!!formErrors[field.id]} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
              )}
              {formErrors[field.id] && (
                <div style={{ marginTop: 6, color: '#ffdddd', fontSize: '0.9rem' }}>{formErrors[field.id]}</div>
              )}
            </div>
          ))}
          <button type="submit" disabled={submitLoading} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '0.75rem 1.5rem', fontWeight: 600, cursor: submitLoading ? 'not-allowed' : 'pointer', opacity: submitLoading ? 0.8 : 1 }}>{submitLoading ? 'Sending…' : 'Send'}</button>
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
