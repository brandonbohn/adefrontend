import React from 'react';
import type { clientdata } from '../types';
import '../home.css';

interface ServicesSectionProps {
	data: clientdata;
	customStyle?: React.CSSProperties;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ data, customStyle }) => {
	const servicesSection = data.sectionsData?.servicesSection;
	if (!servicesSection) return null;
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
			<h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem', color: '#333' }}>
				{servicesSection.title}
			</h2>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{(servicesSection.items || []).map((service: string, idx: number) => (
					<li key={idx} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#555', marginBottom: '0.5rem' }}>
						{service}
					</li>
				))}
			</ul>
		</section>
	);
};

export default ServicesSection;
