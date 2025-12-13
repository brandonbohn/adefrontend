

import React from 'react';
import '../home.css';

interface AboutSectionProps {
    about: any;
    whatWeDo: any;
    vision: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about, whatWeDo, vision }) => {
    if (!about || !whatWeDo || !vision) return <div>No about section data found.</div>;

    const defaultBoxStyle = {
        background: '#000',
        color: '#fff',
        borderRadius: 12,
        padding: '1.5rem',
        marginBottom: '1.5rem',
    };

    return (
        <section style={{
            margin: '20px auto',
            maxWidth: '1200px',
            width: '100%',
            boxSizing: 'border-box',
            boxShadow: 'none',
            ...(about.boxStyle ? about.boxStyle : defaultBoxStyle)
        }}>
            <div className="about-section-flex" style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'center',
                width: '100%',
                gap: '15px'
            }}>
                {/* About Column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 300, flex: 1, background: '#a31515', borderRadius: 12, padding: '1.5rem', boxShadow: '0 4px 16px rgba(163,21,21,0.18)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{about.title || "Who We Are"}</h3>
                    <p style={{ marginBottom: 12 }}>{about.intro || about.description || "Learn more about our organization and values."}</p>
                </div>
                {/* WhatWeDo Column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 300, flex: 1, background: '#a31515', borderRadius: 12, padding: '1.5rem', boxShadow: '0 4px 16px rgba(163,21,21,0.18)' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: 8 }}>{whatWeDo?.title || "What We Do"}</h3>
                    <p style={{ color: '#fff', marginBottom: 12 }}>{whatWeDo?.intro || "Our programs uplift and transform lives in Kibera."}</p>
                    {Array.isArray(whatWeDo?.sections) && whatWeDo.sections.length > 0 ? (
                        <ul style={{ paddingLeft: 20, textAlign: 'left' }}>
                            {whatWeDo.sections.map((s: any, i: number) => (
                                <li key={i} style={{ marginBottom: 8 }}>
                                    <strong>{s.heading}:</strong> {s.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div style={{ color: '#ccc', fontSize: '1rem' }}>No program details available.</div>
                    )}
                </div>
                {/* Vision Column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 300, flex: 1, background: '#a31515', borderRadius: 12, padding: '1.5rem', boxShadow: '0 4px 16px rgba(163,21,21,0.18)' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: 8 }}>{vision?.title || "Our Vision"}</h3>
                    <p>{vision?.description || "We envision a global community that harnesses sports for transformative change."}</p>
                </div>
            </div>
                        <style>{`
                                @media (max-width: 900px) {
                                    .about-section-flex {
                                        flex-direction: column !important;
                                        gap: 1.2rem !important;
                                    }
                                }
                        `}</style>
        </section>
    );
};

export default AboutSection;
