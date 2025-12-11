
import React from "react";

type VisionSectionData = {
    title: string;
    description: string;
    boxStyle?: React.CSSProperties;
};

type VisionSectionProps = {
    data?: VisionSectionData;
};

const VisionSection: React.FC<VisionSectionProps> = ({ data }) => {
    if (!data) return <div>No vision section found.</div>;
    return (
        <section style={data.boxStyle || { margin: "2rem 0", padding: "2rem", background: "#111", borderRadius: "18px", color: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", maxWidth: "1200px", width: "100%" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#fff" }}>{data.title}</h2>
            <p>{data.description}</p>
        </section>
    );
};

export default VisionSection;
