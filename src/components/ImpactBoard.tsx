import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface ImpactBoardProps {
    data?: any;
}

const ImpactBoard: React.FC<ImpactBoardProps> = ({ data: propData }) => {
    const [data, setData] = useState<any>(propData || null);
    const [loading, setLoading] = useState(!propData);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (propData) return;
        axios.get(`${API_BASE_URL}/api/content`)
            .then(res => {
                const data = res.data as { sectionsData?: { impactBoard?: any } };
                setData(data.sectionsData?.impactBoard || null);
                setLoading(false);
            })
            .catch(() => {
                setError('Unable to load impact board. Please try again later.');
                setLoading(false);
            });
    }, [propData]);

    if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
    if (!data) return <div>No impact board found.</div>;

    const { highlight, metrics = [] } = data;
    
    const containerStyle: React.CSSProperties = {
        margin: "2rem auto",
        padding: "0 1rem",
        background: "transparent",
        borderRadius: "0",
        color: "inherit",
        boxShadow: "none",
        maxWidth: "1200px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };

    return (
        <>
            <style>{`
                @media (min-width: 1400px) {
                    .impact-board-container {
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                }
            `}</style>
            <section className="impact-board-container" style={containerStyle}>
                {highlight && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem", width: "100%" }}>
                        <div style={{ background: "#111", padding: "1.5rem 2rem", borderRadius: 12, textAlign: "center" }}>
                            <div style={{ fontSize: "2rem" }}>{highlight.icon}</div>
                            <div style={{ fontSize: "2.25rem", fontWeight: 800 }}>{highlight.value}</div>
                            <div style={{ opacity: 0.9 }}>{highlight.label}</div>
                        </div>
                    </div>
                )}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
                    {metrics.map((m: any, i: number) => (
                        <div key={i} style={{ background: "#111", color: "#fff", padding: "1rem 1.25rem", borderRadius: 10, minWidth: 160, textAlign: "center" }}>
                            <div style={{ fontSize: "1.5rem" }}>{m.icon}</div>
                            <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>{m.value}</div>
                            <div style={{ fontSize: "0.95rem", opacity: 0.95 }}>{m.label}</div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default ImpactBoard;
