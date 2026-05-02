export default function StatsCard({ title, value }) {
  return (
    <div
      className="card"
      style={{
        padding: "16px",
        borderRadius: "12px",
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        transition: "0.2s ease",
        cursor: "default"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.10)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "#6b7280",
          fontWeight: "500"
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: 0,
          fontSize: "24px",
          fontWeight: "700",
          color: "#111827"
        }}
      >
        {value}
      </h2>
    </div>
  );
}