import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface Program {
  _id: string;
  name: string;
  description: string;
  location: string;
  status: string;
}

const SafeguardingProgramDetail: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) return;
    
    axios.get(`${API_BASE_URL}/api/programs/${programId}`)
      .then(res => {
        setProgram(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load program:', err);
        setError('Failed to load program');
        setLoading(false);
      });
  }, [programId]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading program...</div>;
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!program) return <div style={{ padding: '2rem', textAlign: 'center' }}>Program not found</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link 
        to="/safeguarding" 
        style={{ 
          color: '#a31515', 
          textDecoration: 'none', 
          fontSize: '1rem',
          marginBottom: '1.5rem',
          display: 'inline-block'
        }}
      >
        ← Back to Programs
      </Link>

      <h1 style={{ color: '#fff', marginBottom: '1rem', fontSize: '2.5rem' }}>
        {program.name}
      </h1>
      
      <p style={{ color: '#ccc', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        {program.description}
      </p>

      <div style={{ 
        background: '#111', 
        border: '1px solid #222', 
        borderRadius: '8px', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
          Program Actions
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <Link 
            to={`/safeguarding/program/${programId}/add-incident`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: '#1a1a1a',
              border: '2px solid #a31515',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#a31515';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>➕</div>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                Add an Incident
              </h3>
              <p style={{ color: '#ccc', fontSize: '0.95rem' }}>
                Report a new safeguarding incident for this program
              </p>
            </div>
          </Link>

          <Link 
            to={`/safeguarding/program/${programId}/track-incidents`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: '#1a1a1a',
              border: '2px solid #ffd700',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffd700';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                Track Incidents
              </h3>
              <p style={{ color: '#ccc', fontSize: '0.95rem' }}>
                View and track the status of all incidents
              </p>
            </div>
          </Link>

          <Link 
            to={`/safeguarding/program/${programId}/review-incidents`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: '#1a1a1a',
              border: '2px solid #4ade80',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#4ade80';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                Review and Assign Incidents
              </h3>
              <p style={{ color: '#ccc', fontSize: '0.95rem' }}>
                Review incidents and assign to team members
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        flexWrap: 'wrap',
        marginTop: '1rem'
      }}>
        <span style={{ 
          background: '#1a1a1a', 
          color: '#ffd700', 
          padding: '0.5rem 1rem', 
          borderRadius: '4px', 
          fontSize: '0.9rem' 
        }}>
          📍 Location: {program.location}
        </span>
        <span style={{ 
          background: program.status === 'active' ? '#1a3d1a' : '#3d1a1a', 
          color: program.status === 'active' ? '#4ade80' : '#f87171', 
          padding: '0.5rem 1rem', 
          borderRadius: '4px', 
          fontSize: '0.9rem' 
        }}>
          Status: {program.status}
        </span>
      </div>
    </div>
  );
};

export default SafeguardingProgramDetail;
