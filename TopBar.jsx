import React from "react";

export default function TopBar() {
  return (
    <header style={styles.container}>
      <div style={styles.left}>
        <div style={styles.logo}>UBC</div>
        <div>
          <div style={styles.title}>UBC Schedule Builder</div>
          <div style={styles.subtitle}>
            Search courses and generate conflict-free schedules
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <span style={styles.badge}>Beta</span>
      </div>
    </header>
  );
}

const styles = {
  container: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background:
      "linear-gradient(135deg, rgba(79,70,229,0.98), rgba(129,140,248,0.95))",
    color: "#f9fafb",
    boxShadow: "0 12px 30px rgba(15,23,42,0.35)",
    borderBottom: "1px solid rgba(129,140,248,0.6)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logo: {
    width: "36px",
    height: "36px",
    borderRadius: "12px",
    backgroundColor: "rgba(15,23,42,0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "14px",
    letterSpacing: "0.06em",
    boxShadow: "0 6px 16px rgba(15,23,42,0.6)",
  },

  title: {
    fontSize: "18px",
    fontWeight: 700,
    letterSpacing: "0.02em",
  },

  subtitle: {
    fontSize: "13px",
    opacity: 0.9,
    marginTop: "2px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  badge: {
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(248,250,252,0.7)",
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    backgroundColor: "rgba(15,23,42,0.35)",
  },
};
