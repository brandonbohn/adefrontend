
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../home.css';

const AboutSection = ({ id = 1, customStyle = {} }: { id?: number; customStyle?: React.CSSProperties }) => {
	const [about, setAbout] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		axios.get(`/api/webbuilder/${id}`)
			.then(res => {
				setAbout(res.data.sectionsData?.aboutSection || null);
			})
			.catch(() => setError('Failed to load about section'))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!about) return <div>No about section found.</div>;

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
				{about.title || 'About Us'}
			</h2>
			<p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#555' }}>
				{about.intro || about.description || 'Learn more about our company and values.'}
			</p>
		</section>
	);
};

export default AboutSection;
