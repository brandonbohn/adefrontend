
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../home.css';

const SocialMediaSection: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/content')
            .then(res => {
                const data = res.data as { sectionsData?: { socialSection?: any } };
                setData(data.sectionsData?.socialSection || null);
                setLoading(false);
            })
            .catch(() => {
                setError('Unable to load social media section. Please try again later.');
                setLoading(false);
            });
    }, []);

    const linkStyle = (color: string) => ({
        color,
        textDecoration: 'none',
        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
        padding: '10px 20px',
        border: `2px solid ${color}`,
        borderRadius: '25px',
        transition: 'all 0.3s ease',
        display: 'inline-block',
        minWidth: '120px'
    });

    if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
    if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
    if (!data) return <div>No social section found.</div>;

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
            gap: '20px',
        }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem', color: '#333' }}>
                Social Media
            </h2>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {data.links.map((link: any, idx: number) => (
                    <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle('#a31515')}
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default SocialMediaSection;
