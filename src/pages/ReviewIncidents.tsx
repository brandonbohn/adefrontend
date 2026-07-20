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
  assignedTo?: string;
  createdAt: string;
}

interface TeamMember {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const ReviewIncidents: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [assignmentLoading, setAssignmentLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [programId]);

  const fetchData = async () => {
    try {
      const [incidentsRes, teamRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/incidents?programId=${programId}&status=open`),
        axios.get(`${API_BASE_URL}/api/team-members`)
      ]);
      setIncidents(Array.isArray(incidentsRes.data) ? incidentsRes.data : []);
      setTeamMembers(Array.isArray(teamRes.data) ? teamRes.data : []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedIncident || !selectedAssignee) return;
    
    setAssignmentLoading(true);
    try {
      await axios.patch(`${API_BASE_URL}/api/incidents/${selectedIncident._id}`, {
        assignedTo: selectedAssignee,
        status: 'in-progress'
      });
      
      // Refresh data and close modal
      await fetchData();
      setSelectedIncident(null);
      setSelectedAssignee('');
      setAssignmentLoading(false);
    } catch (err) {
      console.error('Failed to assign incident:', err);
      setError('Failed to assign incident');
      setAssignmentLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#f87171';
      case 'high': return '#fb923c';
      case 'medium': return '#fbbf24';
      case 'low': return '#4ade80';
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
        Review and Assign Incidents
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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading incidents...</div>
      ) : incidents.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: '#111', 
          borderRadius: '8px',
          border: '1px solid #222'
        }}>
          <p style={{ color: '#ccc', fontSize: '1.1rem' }}>No open incidents to review.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {incidents.map(incident => (
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
              </div>

              <p style={{ color: '#ccc', marginBottom: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {incident.description}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <span style={{ color: '#999' }}>
                  📅 {new Date(incident.incidentDate).toLocaleDateString()}
                </span>
                <span style={{ color: '#999' }}>
                  👤 {incident.reportedBy}
                </span>
                <span style={{ color: '#999' }}>
                  🕐 Reported: {new Date(incident.createdAt).toLocaleDateString()}
                </span>
              </div>

              {incident.assignedTo ? (
                <div style={{ 
                  background: '#1a3d1a', 
                  color: '#4ade80', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '4px', 
                  fontSize: '0.9rem',
                  display: 'inline-block'
                }}>
                  Assigned to: {teamMembers.find(m => m._id === incident.assignedTo)?.name || incident.assignedTo}
                </div>
              ) : (
                <button
                  onClick={() => setSelectedIncident(incident)}
                  style={{
                    background: '#a31515',
                    color: '#fff',
                    padding: '0.5rem 1.5rem',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#8a1212'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#a31515'}
                >
                  Assign to Team Member
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Assignment Modal */}
      {selectedIncident && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h2 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem' }}>
              Assign Incident
            </h2>
            <p style={{ color: '#ccc', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Assign "{selectedIncident.title}" to a team member:
            </p>

            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}
            >
              <option value="">Select a team member...</option>
              {teamMembers.map(member => (
                <option key={member._id} value={member._id}>
                  {member.name} ({member.role})
                </option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setSelectedIncident(null);
                  setSelectedAssignee('');
                }}
                style={{
                  background: '#333',
                  color: '#fff',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedAssignee || assignmentLoading}
                style={{
                  background: !selectedAssignee || assignmentLoading ? '#666' : '#a31515',
                  color: '#fff',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  cursor: !selectedAssignee || assignmentLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {assignmentLoading ? 'Assigning...' : 'Assign'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewIncidents;
