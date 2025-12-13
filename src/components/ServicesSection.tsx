import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import '../home.css';

const ServicesSection: React.FC = () => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios.get(`${API_BASE_URL}/api/content`)
			.then(res => {
				setData(res.data.sectionsData?.servicesSection || null);
				setLoading(false);
			})
			.catch(() => {
				setError('Unable to load services section. Please try again later.');
				setLoading(false);
			});
	}, []);

	if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
	if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
	if (!data) return null;

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
		}}>
			<h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem', color: '#333' }}>
				{data.title}
			</h2>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{(data.items || []).map((service: string, idx: number) => (
					<li key={idx} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#555', marginBottom: '0.5rem' }}>
						{service}
					</li>
				))}
			</ul>
		</section>
	);
};

export default ServicesSection;
