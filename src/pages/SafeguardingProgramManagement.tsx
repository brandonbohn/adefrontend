import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface Program {
  _id: string;
  name: string;
  description: string;
  location: string;
  status: string;
}

const SafeguardingProgramManagement: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch programs from backend
    axios.get(`${API_BASE_URL}/api/programs`)
      .then(res => {
        setPrograms(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load programs:', err);
        setError('Failed to load programs');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading programs...</div>;
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#fff', marginBottom: '2rem', fontSize: '2.5rem' }}>Safeguarding Program Management</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {programs.map(program => (
          <div 
            key={program._id}
            style={{
              background: '#111',
              border: '1px solid #222',
              borderRadius: '8px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#a31515';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#222';
            }}
          >
            <Link 
              to={`/safeguarding/program/${program._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: '1.5rem' }}>
                {program.name}
              </h3>
              <p style={{ color: '#ccc', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                {program.description}
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ 
                  background: '#1a1a1a', 
                  color: '#ffd700', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '4px', 
                  fontSize: '0.85rem' 
                }}>
                  {program.location}
                </span>
                <span style={{ 
                  background: program.status === 'active' ? '#1a3d1a' : '#3d1a1a', 
                  color: program.status === 'active' ? '#4ade80' : '#f87171', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '4px', 
                  fontSize: '0.85rem' 
                }}>
                  {program.status}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {programs.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: '#111', 
          borderRadius: '8px',
          border: '1px solid #222'
        }}>
          <p style={{ color: '#ccc', fontSize: '1.1rem' }}>No programs found. Contact administrator to add programs.</p>
        </div>
      )}
    </div>
  );
};

export default SafeguardingProgramManagement;
