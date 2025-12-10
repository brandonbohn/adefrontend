import React from 'react';
import type { clientdata } from '../types';
import '../home.css';

interface ImpactSectionProps {
    data: clientdata;
    customStyle?: React.CSSProperties;
}

const ImpactSection: React.FC<ImpactSectionProps> = ({ data, customStyle }) => {
    const impact = data.sectionsData?.ourImpact;
    if (!impact) return null;
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
            boxSizing: 'border-box',
            ...customStyle
        }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', textAlign: 'center', marginBottom: '2rem' }}>
                {impact.title || 'Our Impact'}
            </h2>
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', textAlign: 'center', marginBottom: '1rem' }}>
                {impact.description}
            </p>
        </section>
    );
};

export default ImpactSection;