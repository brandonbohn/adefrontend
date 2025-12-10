
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../home.css';

const SocialMediaSection = ({ id = 1, customStyle = {} }) => {
    const [social, setSocial] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(`/api/webbuilder/${id}`)
            .then(res => {
                const data = res.data as { sectionsData?: { socialSection?: any } };
                setSocial(data.sectionsData?.socialSection || null);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load social section');
                setLoading(false);
            });
    }, [id]);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!social) return <div>No social section found.</div>;

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
            ...customStyle 
        }}>
            {/* Social links displayed without a title per design request */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '2rem',
                flexWrap: 'wrap' as const
            }}>
                {(social.links || []).map((link: { name: string; url: string }, idx: number) => (
                    <a 
                        key={idx}
                        href={link.url}
                        style={linkStyle('#4267B2')}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default SocialMediaSection;
