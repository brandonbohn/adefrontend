
import React from 'react';
import '../home.css';



export interface AboutSectionData {
    title: string;
    description: string;
    intro: string;
    sections: any[];
    boxStyle: {
        background: string;
        color: string;
        borderRadius: number;
        padding: string;
        marginBottom: string;
    };
    WhatweDo: {
        title: string;
        intro: string;
        sections: { heading: string; description: string }[];
        boxStyle: {
            background: string;
            color: string;
            borderRadius: number;
            padding: string;
            marginBottom: string;
        };
        education: string;
        lifeSupport: { title: string; items: any[] };
        mentorship: { title: string; description: string; items: any[] };
    };
    visionSection: {
        title: string;
        description: string;
        boxStyle: {
            background: string;
            color: string;
            borderRadius: number;
            padding: string;
            marginBottom: string;
        };
    };
}

export interface AboutSectionProps {
    data: AboutSectionData;
    customStyle?: React.CSSProperties;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data, customStyle = {} }) => {
    // Validate backend contract
    if (!data) {
        return <div>Invalid about section data contract.</div>;
    }
    const {
        title = "",
        intro = "",
        description = "",
        boxStyle = {},
        WhatweDo = {
            title: "",
            intro: "",
            sections: [],
            boxStyle: {},
            education: "",
            lifeSupport: { title: "", items: [] },
            mentorship: { title: "", description: "", items: [] }
        },
        visionSection = {
            title: "",
            description: "",
            boxStyle: {}
        }
    } = data;
    return (
        <section style={{
            margin: '20px auto',
            maxWidth: '1200px',
            width: '100%',
            boxSizing: 'border-box',
            background: 'none',
            boxShadow: 'none',
            border: 'none',
            ...boxStyle,
            ...customStyle
        }}>
            {/* Removed big black box header as requested */}
            {/* Main About Grid */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'center',
                width: '100%',
                gap: '15px'
            }}>
                {/* About Column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 300, flex: 1, background: '#a31515', borderRadius: 12, padding: '1.5rem', boxShadow: '0 4px 16px rgba(163,21,21,0.18)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{title || "Who We Are"}</h3>
                    <p style={{ marginBottom: 12 }}>{intro || description || "Learn more about our organization and values."}</p>
                </div>
                {/* WhatWeDo Column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 300, flex: 1, background: '#a31515', borderRadius: 12, padding: '1.5rem', boxShadow: '0 4px 16px rgba(163,21,21,0.18)' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: 8 }}>{WhatweDo.title || "What We Do"}</h3>
                    <p style={{ color: '#fff', marginBottom: 12 }}>{WhatweDo.intro || "Our programs uplift and transform lives in Kibera."}</p>
                    {Array.isArray(WhatweDo.sections) && WhatweDo.sections.length > 0 ? (
                        <ul style={{ paddingLeft: 20, textAlign: 'left' }}>
                            {WhatweDo.sections.map((s, i) => (
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
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: 8 }}>{visionSection.title || "Our Vision"}</h3>
                    <p>{visionSection.description || "We envision a global community that harnesses sports for transformative change."}</p>
                </div>
            </div>
            <style>{`
                @media (max-width: 900px) {
                    .box > div { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default AboutSection;
