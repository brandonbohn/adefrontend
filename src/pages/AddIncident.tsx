import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AddIncident: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'low',
    incidentDate: '',
    reportedBy: '',
    location: '',
    involvedParties: '',
    immediateAction: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${API_BASE_URL}/api/incidents`, {
        ...formData,
        programId,
        status: 'open',
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => {
        navigate(`/safeguarding/program/${programId}`);
      }, 2000);
    } catch (err) {
      console.error('Failed to create incident:', err);
      setError('Failed to create incident. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ color: '#4ade80', marginBottom: '1rem', fontSize: '2rem' }}>Incident Reported Successfully</h2>
        <p style={{ color: '#ccc' }}>Redirecting to program details...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
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
        Add New Incident
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Incident Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Severity *
          </label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '1rem'
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Incident Date *
          </label>
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Reported By *
          </label>
          <input
            type="text"
            name="reportedBy"
            value={formData.reportedBy}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Involved Parties
          </label>
          <input
            type="text"
            name="involvedParties"
            value={formData.involvedParties}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Immediate Action Taken
          </label>
          <textarea
            name="immediateAction"
            value={formData.immediateAction}
            onChange={handleChange}
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#666' : '#a31515',
            color: '#fff',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#8a1212')}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#a31515')}
        >
          {loading ? 'Submitting...' : 'Submit Incident'}
        </button>
      </form>
    </div>
  );
};

export default AddIncident;
