import React, { useEffect, useState } from "react";
import axios from "axios";

const VisionSection: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/content')
            .then(res => {
                const data = res.data as { sectionsData?: { visionSection?: any } };
                setData(data.sectionsData?.visionSection || null);
                setLoading(false);
            })
            .catch(() => {
                setError('Unable to load vision section. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
    if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
    if (!data) return <div>No vision section found.</div>;

    return (
        <section style={data.boxStyle || { margin: "2rem 0", padding: "2rem", background: "#111", borderRadius: "18px", color: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", maxWidth: "1200px", width: "100%" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#fff" }}>{data.title}</h2>
            <p>{data.description}</p>
        </section>
    );
};

export default VisionSection;
