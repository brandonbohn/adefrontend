import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const planOptions = [
  {
    key: 'monthly-21',
    label: 'Monthly Starter',
    amount: '21',
    cadence: 'monthly',
    blurb: 'A steady monthly gift that keeps a girl in school all year.',
    image: '/playingtime.jpeg'
  },
  {
    key: 'annual-250',
    label: 'Basic Support',
    amount: '250',
    cadence: 'annual',
    blurb: 'Covers school fees and essential supplies.',
    image: '/onthefield.jpeg'
  },
  {
    key: 'annual-500',
    label: 'Full Support',
    amount: '500',
    cadence: 'annual',
    blurb: 'Supports school, meals, and core essentials.',
    image: '/playingtime.jpeg'
  },
  {
    key: 'annual-1000',
    label: 'Premium',
    amount: '1000',
    cadence: 'annual',
    blurb: 'Full support plus extra mentorship and learning support.',
    image: '/onthefield.jpeg'
  }
];

const SponsorAGirl: React.FC = () => {
  const navigate = useNavigate();
  const middleTierImages = [
    { src: '/onthefield.jpeg', alt: 'Girls training on the field' },
    { src: '/playingtime.jpeg', alt: 'Girls during sponsorship program activities' }
  ];
  const renderPlanCard = (plan: (typeof planOptions)[number]) => (
    <div
      key={plan.key}
      style={{
        background: '#1d1d1d',
        border: '1px solid #333',
        borderRadius: 12,
        padding: '1.1rem',
        color: '#fff',
        minHeight: 460,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{plan.label}</div>
        <div style={{ color: '#ffcccc', fontWeight: 700, marginBottom: 8 }}>
          ${plan.amount} / {plan.cadence}
        </div>
        <div style={{ color: '#cfcfcf', fontSize: '0.92rem' }}>{plan.blurb}</div>
        <div
          style={{
            marginTop: '0.85rem',
            width: '100%',
            height: 210,
            borderRadius: 10,
            overflow: 'hidden',
            border: '1px solid #2e2e2e',
            background: '#0f0f0f'
          }}
        >
          <img
            src={plan.image}
            alt={`${plan.label} sponsorship option`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/sponsored-girls?plan=${encodeURIComponent(plan.key)}`)}
        style={{
          marginTop: '0.9rem',
          display: 'inline-block',
          background: '#a31515',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.7rem 0.9rem',
          textAlign: 'center',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Sponsor a Girl
      </button>
    </div>
  );

  const ctaLinkStyle: React.CSSProperties = {
    color: '#fff',
    background: '#c2185b',
    padding: '0.7rem 1.2rem',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 170
  };

  return (
    <section style={{ width: '100%', margin: 0, padding: 0 }}>
      <div
        style={{
          width: '100%',
          minHeight: 360,
          background: 'url(/playingtime.jpeg) center/cover no-repeat',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: 12,
            padding: '1.25rem 1.5rem',
            textAlign: 'center',
            color: '#fff',
            maxWidth: 700
          }}
        >
          <h1 style={{ margin: 0, marginBottom: '0.6rem', fontSize: '2rem', lineHeight: 1.2 }}>
            Sponsor a Girl Today to Change Her Life
          </h1>
          <p style={{ margin: 0, color: '#f2f2f2' }}>
            Choose your sponsorship level, then meet the girls waiting for support.
          </p>
        </div>
      </div>

      <div style={{ width: '100%', margin: 0, padding: '0 0 1.5rem 0' }}>
        <div
          style={{
            background: '#fff2fa',
            borderRadius: 0,
            padding: '1.5rem 0',
            boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ width: '100%', maxWidth: 1800, margin: '0 auto', padding: '0 1rem' }}>
          <div
            style={{
              margin: '0 auto 1rem',
              background: '#111',
              border: '1px solid #2c2c2c',
              borderRadius: 12,
              padding: '0.7rem 1rem',
              maxWidth: 860,
              textAlign: 'center'
            }}
          >
            <h2 style={{ margin: 0, color: '#ffcccc', fontWeight: 800, fontSize: '1.35rem', lineHeight: 1.3 }}>
              15 girls are currently waiting for sponsorship to continue their education.
            </h2>
          </div>

          </div>

          <div
            className="what-girls-get-band"
            style={{
              width: '100%',
              background: '#111',
              borderTop: '1px solid #2c2c2c',
              borderBottom: '1px solid #2c2c2c',
              padding: '1.1rem 1.5rem',
              marginBottom: '1rem',
              color: '#fff'
            }}
          >
            <div
              className="what-you-get-grid"
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.1rem',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: 260,
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: '1px solid #333'
                }}
              >
                <img
                  src="/playingtime.jpeg"
                  alt="What girls receive from sponsorship"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>

              <div>
                <h3 style={{ margin: 0, marginBottom: '0.6rem', color: '#ffcccc', fontSize: '1.25rem' }}>
                  What Girls Receive Through Sponsorship
                </h3>
                <ul style={{ margin: 0, color: '#dfdfdf', fontSize: '1rem', lineHeight: 1.75, paddingLeft: 22 }}>
                  <li>Complete school fees for the year</li>
                  <li>School uniform and supplies</li>
                  <li>Daily nutritious meals</li>
                  <li>Sanitary products</li>
                  <li>Football training and equipment</li>
                  <li>Mentorship and life skills</li>
                  <li>Medical support when needed</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: 1800, margin: '0 auto', padding: '0 1rem' }}>

          <div
            style={{
              margin: '0 auto 1rem',
              background: '#111',
              border: '1px solid #2c2c2c',
              borderRadius: 12,
              padding: '0.7rem 1rem',
              maxWidth: 420,
              textAlign: 'center'
            }}
          >
            <h2 style={{ margin: 0, color: '#ffcccc', fontWeight: 800, fontSize: '1.45rem', lineHeight: 1.2 }}>
              Sponsorship Levels
            </h2>
          </div>

          <div
            className="sponsor-grid-2x2"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '2rem',
              margin: '0 auto 1.5rem auto',
              width: '100%',
              maxWidth: 1700,
              padding: '1.25rem',
              borderRadius: 14
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {planOptions.slice(0, 2).map(renderPlanCard)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {middleTierImages.map((image) => (
                <div
                  key={image.src}
                  style={{
                    background: '#161616',
                    border: '1px solid #333',
                    borderRadius: 12,
                    padding: '0.8rem',
                    minHeight: 460,
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {planOptions.slice(2).map(renderPlanCard)}
            </div>
          </div>

          </div>

          <div
            className="what-you-get-band"
            style={{
              width: '100%',
              background: '#111',
              borderTop: '1px solid #2c2c2c',
              borderBottom: '1px solid #2c2c2c',
              padding: '1.1rem 1.5rem',
              marginBottom: '1rem',
              color: '#fff'
            }}
          >
            <div
              className="what-you-get-grid"
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.1rem',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: 260,
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: '1px solid #333'
                }}
              >
                <img
                  src="/playingtime.jpeg"
                  alt="Girl sponsorship updates"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>

              <div>
                <h3 style={{ margin: 0, marginBottom: '0.6rem', color: '#ffcccc', fontSize: '1.25rem' }}>
                  What You Get With Sponsorship
                </h3>
                <div style={{ color: '#dfdfdf', lineHeight: 1.7, fontSize: '0.98rem' }}>
                  1. A profile and picture of your sponsored girl
                  <br />
                  2. Monthly progress updates
                  <br />
                  3. School reports and photos
                  <br />
                  4. Opportunity for direct communication
                  <br />
                  5. Annual visit option when possible
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '0.9rem', color: '#111', fontWeight: 700, fontSize: '1.05rem' }}>
              Explore more ways to support the girls.
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
              <Link to="/" style={ctaLinkStyle}>
                Home
              </Link>
              <Link to="/donate" style={ctaLinkStyle}>
                Donate Today
              </Link>
              <Link to="/sponsored-girls" style={ctaLinkStyle}>
                Meet the Girls
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1300px) {
          .sponsor-grid-2x2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 900px) {
          .sponsor-grid-2x2 {
            grid-template-columns: 1fr !important;
          }
          .what-you-get-grid {
            grid-template-columns: 1fr !important;
          }
          .what-you-get-band {
            padding: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SponsorAGirl;
