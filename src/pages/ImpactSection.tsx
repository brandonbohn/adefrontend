
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import '../home.css';

const ImpactSection: React.FC = () => {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/content`)
            .then(res => {
                setContent(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Unable to load impact section content. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
    if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
    if (!content) return null;

    const impact = content.impact || { title: 'Our Impact', description: '' };

    return (
        <section className="custom-box" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '20px',
            margin: '20px auto',
            maxWidth: '90vw',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', textAlign: 'center', marginBottom: '2rem' }}>
                {impact.title}
            </h2>
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', textAlign: 'center', marginBottom: '1rem' }}>
                {impact.description}
            </p>
        </section>
    );
};

export default ImpactSection;