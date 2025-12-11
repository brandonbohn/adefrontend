
import React from "react";



interface WhatWeDoSectionProps {
    data: any;
    customStyle?: React.CSSProperties;
}

const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({ data, customStyle = {} }) => {
    if (!data) return <div>No What We Do section found.</div>;
    return (
        <section style={{ margin: "2rem 0", padding: "2rem", background: "#111", borderRadius: "18px", color: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", maxWidth: "1200px", width: "100%" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#fff" }}>{data.title}</h2>
            <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff" }}>Education</h3>
                <p>{data.education}</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff" }}>{data.lifeSupport.title}</h3>
                <ul>
                    {(data.lifeSupport.items || []).map((item: string, idx: number) => (
                        <li key={idx} style={{ color: "#fff" }}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff" }}>{data.mentorship.title}</h3>
                <p>{data.mentorship.description}</p>
            </div>
        </section>
    );
};

export default WhatWeDoSection;
