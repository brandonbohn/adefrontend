import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface PortalSection {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

interface QuickStats {
  activePrograms: number;
  totalDonors: number;
  activeVolunteers: number;
  pendingInquiries: number;
}

const EmployeePortal: React.FC = () => {
  const navigate = useNavigate();
  const [employeeEmail, setEmployeeEmail] = useState<string | null>(null);
  const [portalSections, setPortalSections] = useState<PortalSection[]>([]);
  const [quickStats, setQuickStats] = useState<QuickStats>({
    activePrograms: 0,
    totalDonors: 0,
    activeVolunteers: 0,
    pendingInquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('employeeAuthenticated');
    const email = localStorage.getItem('employeeEmail');
    
    if (!isAuthenticated) {
      navigate('/employee-login');
      return;
    }
    
    setEmployeeEmail(email);
    fetchPortalData();
  }, [navigate]);

  const fetchPortalData = async () => {
    try {
      // Fetch portal sections configuration from backend
      const sectionsResponse = await axios.get(`${API_BASE_URL}/api/donor-system-content`);
      const portalConfig = sectionsResponse.data?.employeePortal?.sections || getDefaultSections();
      setPortalSections(portalConfig);

      // Fetch quick stats from backend
      const [programsRes, donorsRes, volunteersRes, contactsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/programs`),
        axios.get(`${API_BASE_URL}/api/donors`),
        axios.get(`${API_BASE_URL}/api/volunteers`),
        axios.get(`${API_BASE_URL}/api/contacts`)
      ]);

      setQuickStats({
        activePrograms: Array.isArray(programsRes.data) ? programsRes.data.filter((p: any) => p.status === 'active').length : 0,
        totalDonors: Array.isArray(donorsRes.data) ? donorsRes.data.length : 0,
        activeVolunteers: Array.isArray(volunteersRes.data) ? volunteersRes.data.length : 0,
        pendingInquiries: Array.isArray(contactsRes.data) ? contactsRes.data.length : 0
      });
    } catch (error) {
      console.error('Failed to fetch portal data:', error);
      // Fallback to default sections
      setPortalSections(getDefaultSections());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultSections = (): PortalSection[] => [
    {
      title: 'Safeguarding Programs',
      description: 'Manage safeguarding programs, incidents, and reports',
      icon: '🛡️',
      link: '/employee-portal/safeguarding',
      color: '#a31515'
    },
    {
      title: 'Donor Management',
      description: 'View and manage donor information and contributions',
      icon: '💰',
      link: '/admin/donors',
      color: '#2d8f2d'
    },
    {
      title: 'Volunteer Management',
      description: 'Manage volunteer profiles and assignments',
      icon: '👥',
      link: '/admin/volunteers',
      color: '#1a5fb4'
    },
    {
      title: 'Contact Management',
      description: 'Review and respond to contact inquiries',
      icon: '📧',
      link: '/admin/contacts',
      color: '#e6a700'
    },
    {
      title: 'Blog Posts',
      description: 'Create and manage blog content',
      icon: '📝',
      link: '/admin/blog',
      color: '#9c27b0'
    },
    {
      title: 'Team Management',
      description: 'Manage team members and organizational structure',
      icon: '🏢',
      link: '/meet-the-teams',
      color: '#0097a7'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Header */}
      <div style={{
        background: '#111',
        borderBottom: '1px solid #222',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.75rem', marginBottom: '0.25rem' }}>
            Employee Portal
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            ADE Community Based Organization
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#ccc', fontSize: '0.9rem' }}>
            {employeeEmail}
          </span>
          <button
        
            style={{
              padding: '0.5rem 1.25rem',
              background: '#a31515',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#d32f2f'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#a31515'}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Welcome to the Employee Portal
          </h2>
          <p style={{ color: '#888', fontSize: '1rem' }}>
            Access management tools and organizational resources
          </p>
        </div>

        {/* Portal Sections Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {portalSections.map((section, index) => (
            <Link
              key={index}
              to={section.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  background: '#111',
                  border: '1px solid #222',
                  borderRadius: '8px',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = section.color;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${section.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#222';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem'
                }}>
                  {section.icon}
                </div>
                <h3 style={{
                  color: '#fff',
                  fontSize: '1.25rem',
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}>
                  {section.title}
                </h3>
                <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {section.description}
                </p>
                <div style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: section.color,
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}>
                  Access Section
                  <span style={{ fontSize: '1.2rem' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div style={{
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Active Programs
            </div>
            <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 600 }}>
              3
            </div>
          </div>
          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Total Donors
            </div>
            <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 600 }}>
              127
            </div>
          </div>
          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Active Volunteers
            </div>
            <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 600 }}>
              45
            </div>
          </div>
          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Pending Inquiries
            </div>
            <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 600 }}>
              8
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePortal;
