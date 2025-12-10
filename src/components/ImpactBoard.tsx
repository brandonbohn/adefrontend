
import React, { useEffect, useState } from "react";
import axios from "axios";

const ImpactBoard = ({ id = 1 }: { id?: number }) => {
  const [impact, setImpact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/webbuilder/${id}`)
      .then(res => {
        setImpact(res.data.sectionsData?.impactBoard || null);
      })
      .catch(() => setError("Failed to load impact board"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!impact) return <div>No impact board found.</div>;
  const { highlight, metrics = [] } = impact;
  return (
    <section style={{ margin: "2rem 0", padding: "0", background: "transparent", borderRadius: "0", color: "inherit", boxShadow: "none", maxWidth: "1200px", width: "100%" }}>
      {highlight && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
          <div style={{ background: "#111", padding: "1.5rem 2rem", borderRadius: 12, textAlign: "center" }}>
            <div style={{ fontSize: "2rem" }}>{highlight.icon}</div>
            <div style={{ fontSize: "2.25rem", fontWeight: 800 }}>{highlight.value}</div>
            <div style={{ opacity: 0.9 }}>{highlight.label}</div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        {metrics.map((m: any, i: number) => (
          <div key={i} style={{ background: "#111", color: "#fff", padding: "1rem 1.25rem", borderRadius: 10, minWidth: 160, textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem" }}>{m.icon}</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>{m.value}</div>
            <div style={{ fontSize: "0.95rem", opacity: 0.95 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactBoard;
