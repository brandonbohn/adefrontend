
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../home.css';

const ContactSection = ({ id = 1, customStyle = {} }) => {
    const [contact, setContact] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(`/api/webbuilder/${id}`)
            .then(res => {
                setContact(res.data.sectionsData?.contactSection || null);
            })
            .catch(() => setError('Failed to load contact section'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!contact) return <div>No contact section found.</div>;

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
            ...customStyle 
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '600px',
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
                    {contact.title}
                </h2>
                <p style={{ 
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
                    marginBottom: '2rem',
                    color: '#666'
                }}>
                    {contact.instructions}
                </p>
                {/* Add more contact details as needed */}
            </div>
        </section>
    );
};

export default ContactSection;
