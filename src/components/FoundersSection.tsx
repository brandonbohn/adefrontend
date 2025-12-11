
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../home.css';

interface Founder {
	image?: string | number;
	name: string;
	role: string;
	bio: string;
}

const Foundersection: React.FC<{ customStyle?: React.CSSProperties }> = ({ customStyle = {} }) => {
	const [data, setData] = useState<{ title?: string; founders: Founder[] } | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios.get('http://localhost:3000/api/content')
			.then(res => {
				console.log('FoundersSection backend data:', res.data);
				setData(res.data.foundersSection || null);
				setLoading(false);
			})
			.catch(() => {
				setError('Unable to load founders section.');
				setLoading(false);
			});
	}, []);

	if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading Founders...</div>;
	if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
	if (!data || !Array.isArray(data.founders) || data.founders.length === 0) return <div>No founders section found.</div>;
	return (
		<div style={{ margin: '2.5rem auto 1.5rem auto', maxWidth: 1100, width: '100%', ...customStyle }}>
			<div className="red-box">
				{'Our Founders'}
			</div>
			<section style={{
				background: '#000',
				color: '#fff',
				borderRadius: 12,
				padding: '1.5rem',
				boxSizing: 'border-box'
			}}>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'flex-start' }}>
					{data.founders.map((founder, idx) => (
						<div key={idx} style={{ flex: '1 1 260px', minWidth: 260, maxWidth: 340, background: '#111', borderRadius: 10, padding: '1.5rem', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>
							{founder.image ? (
								<img src={`/${founder.image}.jpeg`} alt={founder.name} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
							) : (
								<div style={{ width: 120, height: 120, borderRadius: '50%', background: '#222', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>No Photo</div>
							)}
							<div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 4 }}>{founder.name}</div>
							<div style={{ color: '#ccc', fontSize: '1rem', marginBottom: 8 }}>{founder.role}</div>
							<div style={{ fontSize: '1rem', color: '#eee' }}>{founder.bio}</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Foundersection;
