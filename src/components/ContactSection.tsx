
import React from 'react';
import '../home.css';

interface ContactSectionProps {
    data: {
        title: string;
        instructions: string;
        // Add more fields as needed
    };
    customStyle?: React.CSSProperties;
}

const ContactSection: React.FC<ContactSectionProps> = ({ data, customStyle = {} }) => {
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
            ...customStyle 
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
