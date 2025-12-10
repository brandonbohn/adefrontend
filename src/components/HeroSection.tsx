
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImpactBoard from './ImpactBoard';
import '../home.css';

const HeroSection = ({ id = 1, customStyle = {} }) => {
	const [hero, setHero] = useState<any>(null);
	const [impact, setImpact] = useState<any>(null);
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
	const [title, setTitle] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		axios.get(`/api/webbuilder/${id}`)
			.then(res => {
				const data = res.data;
				setHero(data.sectionsData?.heroSection || null);
				setImpact(data.sectionsData?.impactBoard || null);
				setImageUrl(data.imageUrl);
				setTitle(data.title);
			})
			.catch(() => setError('Failed to load hero section'))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!hero) return <div>No hero section found.</div>;

	return (
		<section className="custom-box" style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '40px 20px',
			margin: '20px auto',
			maxWidth: '90vw',
			width: '100%',
			boxSizing: 'border-box',
			...customStyle
		}}>
			<div className="red-box">
				{hero.title || title}
			</div>
			{impact && (
				<ImpactBoard data={impact} />
			)}
			<p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', marginBottom: '2rem' }}>
				{hero.subtitle || 'Welcome to our website!'}
			</p>
			{imageUrl && (
				<img
					src={imageUrl}
					alt={hero.title || title}
					style={{ maxWidth: '100%', borderRadius: '20px', cursor: 'pointer' }}
					onClick={() => window.open(imageUrl, '_blank', 'noopener,noreferrer')}
				/>
			)}
		</section>
	);
};

export default HeroSection;
