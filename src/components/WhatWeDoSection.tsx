
import React, { useEffect, useState } from "react";
import axios from "axios";

const WhatWeDoSection = ({ id = 1 }: { id?: number }) => {
  const [what, setWhat] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/webbuilder/${id}`)
      .then(res => {
        setWhat(res.data.sectionsData?.WhatweDo || null);
      })
      .catch(() => setError("Failed to load What We Do section"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!what) return <div>No What We Do section found.</div>;

  return (
    <section style={{ margin: "2rem 0", padding: "2rem", background: "#111", borderRadius: "18px", color: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", maxWidth: "1200px", width: "100%" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#fff" }}>{what.title}</h2>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff" }}>Education</h3>
        <p>{what.education}</p>
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff" }}>{what.lifeSupport.title}</h3>
        <ul>
          {(what.lifeSupport.items || []).map((item: string, idx: number) => (
            <li key={idx} style={{ color: "#fff" }}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff" }}>{what.mentorship.title}</h3>
        <p>{what.mentorship.description}</p>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
