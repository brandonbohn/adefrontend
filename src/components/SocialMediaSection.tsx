
import React from 'react';
import '../home.css';

type SocialLink = { name: string; url: string };
type SocialData = { links: SocialLink[] };

interface SocialMediaSectionProps {
    data: SocialData;
    customStyle?: React.CSSProperties;
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({ data, customStyle = {} }) => {
    if (!data) return <div>No social section found.</div>;

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
                {(data.links || []).map((link: SocialLink, idx: number) => (
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
