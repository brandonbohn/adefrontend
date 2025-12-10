import React from 'react';
import type { clientdata } from '../types';
import ImageComponent from '../components/ImageComponent';
import '../home.css';

interface AboutSectionProps {
    data: clientdata;
    customStyle?: React.CSSProperties;
}

function AboutSection({ data, customStyle }: AboutSectionProps) {
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
            <div style={{ width: '100%', margin: '2.5rem auto 0 auto', maxWidth: 1100 }}>
                <div style={{ background: '#a31515', color: '#fff', borderRadius: 12, padding: '2rem', marginBottom: '2rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 600 }}>
                    Meet the Teams
                    <div style={{ fontSize: '1rem', fontWeight: 400, marginTop: '1rem', color: '#fff' }}>
                        Get to know our squads, coaches, and the spirit that drives ADE FC. Each team brings their own energy, talent, and dreams to the pitch!
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                    {/* Team photos gallery from data */}
                    {data.sectionsData?.aboutSection?.teamGallery?.map((img: { src: string; alt: string }, idx: number) => (
                        <img
                            key={idx}
                            src={img.src}
                            alt={img.alt}
                            style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 12 }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
