import React from "react";

export default function TopBar() {
  return (
    <header style={styles.bar}>
      <div style={styles.left}>
        <img
          src="https://ires.ubc.ca/files/2019/10/ubc-logo.png"
          alt="UBC Logo"
          style={styles.logo}
        />

        {/* Tight OptiSchedule title */}
        <div style={styles.titleWrapper}>
          <span style={styles.brandMain}>Opti</span>
          <span style={styles.brandSub}>Schedule</span>
        </div>
      </div>

      <div style={styles.right}>
        <button style={styles.button}>
          Build your personalized schedule
        </button>
      </div>
    </header>
  );
}

const styles = {
  bar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "8px 24px",
    background: "linear-gradient(135deg, #dfffe0, #c7f3ff)", // soft 3D gradient
    color: "#333",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",             // deeper shadow
    backdropFilter: "blur(8px)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  logo: {
    height: "45px",
    width: "auto",
    objectFit: "contain",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",       // logo shadow
  },

  titleWrapper: {
    display: "flex",
    alignItems: "baseline",
    gap: 4,
  },

  brandMain: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#3B82F6",
    lineHeight: 1,
    textShadow: "0 1px 2px rgba(0,0,0,0.25)",                // subtle 3D text
  },

  brandSub: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#16A34A",
    marginTop: "4px",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
  },

  right: {
    display: "flex",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#ffffff",
    color: "#333",
    padding: "6px 16px",
    borderRadius: "999px",
    border: "1px solid #d4d4d4",
    fontSize: "13px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",                 // 3D pill button
    transform: "translateY(0)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
};
