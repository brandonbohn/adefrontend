
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../home.css';

const Foundersection = ({ id = 1, customStyle = {} }: { id?: number; customStyle?: React.CSSProperties }) => {
	const [founders, setFounders] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		axios.get(`/api/webbuilder/${id}`)
			.then(res => {
				setFounders(res.data.sectionsData?.foundersSection || null);
			})
			.catch(() => setError('Failed to load founders section'))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!founders) return <div>No founders section found.</div>;

	return (
		<div style={{ margin: '2.5rem auto 1.5rem auto', maxWidth: 1100, width: '100%', ...customStyle }}>
			<div className="red-box">
				{founders.title}
			</div>
			<section style={{
				background: '#000',
				color: '#fff',
				borderRadius: 12,
				padding: '1.5rem',
				boxSizing: 'border-box'
			}}>
				<h2 style={{ fontSize: '26px', textAlign: 'center', margin: '0 0 1.5rem 0', fontWeight: 700, color: '#fff' }}>
					Our Founders
				</h2>
				<div style={{ fontSize: '1rem' }}>
					{(founders.FounderBios ? founders.FounderBios.split('\n') : []).map((bio: string, idx: number) => (
						<div key={idx} style={{ marginBottom: '1rem' }}>{bio}</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Foundersection;
