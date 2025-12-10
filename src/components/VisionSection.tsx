
import React, { useEffect, useState } from "react";
import axios from "axios";

const VisionSection = ({ id = 1 }: { id?: number }) => {
  const [vision, setVision] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/webbuilder/${id}`)
      .then(res => {
        const data = res.data as { sectionsData?: { visionSection?: any } };
        setVision(data.sectionsData?.visionSection || null);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load vision section");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!vision) return <div>No vision section found.</div>;

  return (
    <section style={vision.boxStyle || { margin: "2rem 0", padding: "2rem", background: "#111", borderRadius: "18px", color: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", maxWidth: "1200px", width: "100%" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#fff" }}>{vision.title}</h2>
      <p>{vision.description}</p>
    </section>
  );
};

export default VisionSection;
