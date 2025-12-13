import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import '../home.css';

const ContactSection: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/content`)
            .then(res => {
                const data = res.data as { sectionsData?: { contactSection?: any } };
                setData(data.sectionsData?.contactSection || null);
                setLoading(false);
            })
            .catch(() => {
                setError('Unable to load contact section. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
    if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
    if (!data) return <div>No contact section found.</div>;

    return (
        <section className="box" style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '20px',
            margin: '20px auto',
            maxWidth: '90vw',
            width: '100%',
            boxSizing: 'border-box',
        }}>
            <div style={{ 
                width: '100%', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <h2 style={{ 
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                    marginBottom: '1rem',
                    color: '#333'
                }}>
                    {data.title}
                </h2>
                <p style={{ 
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
                    marginBottom: '2rem',
                    color: '#666'
                }}>
                    {data.instructions}
                </p>
                {/* Add more contact details as needed */}
            </div>
        </section>
    );
};

export default ContactSection;
