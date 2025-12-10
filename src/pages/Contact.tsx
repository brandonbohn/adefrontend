
import ImageComponent from '../components/ImageComponent';

const Contact = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem', margin: '3rem auto', maxWidth: 1100 }}>
    {/* Left images */}
    <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <ImageComponent id={14} alt="Green Team" width={120} height={180} customStyle={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 12 }} />
      <ImageComponent id={18} alt="Team and Coaches" width={120} height={180} customStyle={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 12 }} />
      <ImageComponent id={23} alt="Two Girls" width={120} height={180} customStyle={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 12 }} />
    </div>
    {/* Contact form */}
  <div className="dark-card" style={{ flex: 1, minWidth: 320, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '2rem', background: '#a31515' }}>
      <h2 style={{ color: 'var(--text-on-dark)', marginBottom: '1rem' }}>Contact Us</h2>
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: 4, color: 'var(--text-on-dark)' }}>Name</label>
          <input id="name" name="name" type="text" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="organization" style={{ display: 'block', marginBottom: 4, color: 'var(--text-on-dark)' }}>Organization/Company</label>
          <input id="organization" name="organization" type="text" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4, color: 'var(--text-on-dark)' }}>Email</label>
          <input id="email" name="email" type="email" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: 4, color: 'var(--text-on-dark)' }}>Phone</label>
          <input id="phone" name="phone" type="tel" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="reason" style={{ display: 'block', marginBottom: 4, color: 'var(--text-on-dark)' }}>Reason for Contact</label>
          <select id="reason" name="reason" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }}>
            <option value="">Select a reason</option>
            <option value="volunteering">Volunteering</option>
            <option value="donation">Donation</option>
            <option value="partnership">Partnership</option>
            <option value="general">General Inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="subject" style={{ display: 'block', marginBottom: 4, color: 'var(--text-on-dark)' }}>Subject</label>
          <input id="subject" name="subject" type="text" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: 4, color: 'var(--text-on-dark)' }}>Message</label>
          <textarea id="message" name="message" rows={4} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #232323', background: '#232323', color: '#fff', fontWeight: 600 }} />
        </div>
        <button type="submit" style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '0.75rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>Send</button>
      </form>
    </div>
    {/* Right images */}
    <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <ImageComponent id={21} alt="Team Photo on Field" width={120} height={180} customStyle={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 12 }} />
      <ImageComponent id={24} alt="White Team" width={120} height={180} customStyle={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 12 }} />
      <ImageComponent id={17} alt="Success Story" width={120} height={180} customStyle={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 12 }} />
    </div>
  </div>
);

export default Contact;
