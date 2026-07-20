import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface Incident {
  _id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  incidentDate: string;
  reportedBy: string;
  location: string;
  createdAt: string;
}

const TrackIncidents: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');

  useEffect(() => {
    fetchIncidents();
  }, [programId]);

  const fetchIncidents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/incidents?programId=${programId}`);
      setIncidents(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load incidents:', err);
      setError('Failed to load incidents');
      setLoading(false);
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    if (filter === 'all') return true;
    return incident.status === filter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#f87171';
      case 'high': return '#fb923c';
      case 'medium': return '#fbbf24';
      case 'low': return '#4ade80';
      default: return '#ccc';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#f87171';
      case 'in-progress': return '#fbbf24';
      case 'resolved': return '#4ade80';
      default: return '#ccc';
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(`/safeguarding/program/${programId}`)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#a31515',
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          padding: 0
        }}
      >
        ← Back to Program
      </button>

      <h1 style={{ color: '#fff', marginBottom: '2rem', fontSize: '2.5rem' }}>
        Track Incidents
      </h1>

      {error && (
        <div style={{ 
          background: '#3d1a1a', 
          border: '1px solid #f87171', 
          color: '#f87171', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1.5rem' 
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ color: '#fff', marginRight: '1rem', fontSize: '0.95rem' }}>
          Filter by Status:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          style={{
            padding: '0.5rem 1rem',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '0.95rem'
          }}
        >
          <option value="all">All Incidents</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading incidents...</div>
      ) : filteredIncidents.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: '#111', 
          borderRadius: '8px',
          border: '1px solid #222'
        }}>
          <p style={{ color: '#ccc', fontSize: '1.1rem' }}>No incidents found.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredIncidents.map(incident => (
            <div
              key={incident._id}
              style={{
                background: '#111',
                border: '1px solid #222',
                borderRadius: '8px',
                padding: '1.5rem',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#333'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#222'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: 0 }}>
                  {incident.title}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ 
                    background: '#1a1a1a', 
                    color: getSeverityColor(incident.severity), 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '4px', 
                    fontSize: '0.85rem',
                    textTransform: 'capitalize'
                  }}>
                    {incident.severity}
                  </span>
                  <span style={{ 
                    background: '#1a1a1a', 
                    color: getStatusColor(incident.status), 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '4px', 
                    fontSize: '0.85rem',
                    textTransform: 'capitalize'
                  }}>
                    {incident.status}
                  </span>
                </div>
              </div>

              <p style={{ color: '#ccc', marginBottom: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {incident.description}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                <span style={{ color: '#999' }}>
                  📅 {new Date(incident.incidentDate).toLocaleDateString()}
                </span>
                <span style={{ color: '#999' }}>
                  👤 {incident.reportedBy}
                </span>
                {incident.location && (
                  <span style={{ color: '#999' }}>
                    📍 {incident.location}
                  </span>
                )}
                <span style={{ color: '#999' }}>
                  🕐 Reported: {new Date(incident.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackIncidents;
