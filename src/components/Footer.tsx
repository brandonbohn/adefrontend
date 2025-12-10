import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="dark-section" style={{
      padding: '1.25rem 1rem',
      borderTop: '2px solid rgba(211,47,47,0.12)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ minWidth: 240 }}>
          <h4 style={{ margin: 0 }}>ADE FC</h4>
          <address style={{ margin: '0.25rem 0 0.5rem 0', color: 'var(--muted)', fontStyle: 'normal' }}>
            Kibera, Nairobi
          </address>
          <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '6px' }}>© {year} ADEFC</div>
        </div>

        <nav aria-label="footer-links" style={{ minWidth: 240, textAlign: 'right' }}>
          <div style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
            <a href="/donate" style={{ color: 'var(--text-on-dark)', textDecoration: 'none', marginRight: '0.75rem' }}>Donate</a>
            <a href="/contact" style={{ color: 'var(--text-on-dark)', textDecoration: 'none', marginRight: '0.75rem' }}>Contact</a>
            <a href="/privacy" style={{ color: 'var(--text-on-dark)', textDecoration: 'none', marginRight: '0.75rem' }}>Privacy</a>
            <a href="/donate-terms" style={{ color: 'var(--text-on-dark)', textDecoration: 'none' }}>Donation Terms</a>
          </div>
          <div style={{ marginTop: '0.5rem', color: '#777', fontSize: '0.8rem' }}>
            <small>Built by Barebohnz Dev &amp; Consulting — <a href="mailto:brandonbohn@barebohnzconsulting.com" style={{ color: '#d32f2f' }}>brandonbohn@barebohnzconsulting.com</a></small>
          </div>
        </nav>
      </div>

      <style>{`
        @media (max-width: 600px) {
          footer > div { text-align: center; }
          footer > div > div { width: 100%; text-align: center !important; }
          nav[aria-label="footer-links"] { margin-top: 0.75rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
