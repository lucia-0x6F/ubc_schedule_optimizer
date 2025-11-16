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
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "6px 20px",
    background: "#dfffe0", // light green
    color: "#333",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  logo: {
    height: "45px",   // ⭐ large logo
    width: "auto",
    objectFit: "contain",
  },

  /* Keep Opti + Schedule tight together */
  titleWrapper: {
    display: "flex",
    alignItems: "baseline",   // ⭐ aligns “Schedule” to baseline of Opti
    gap: 3,                   // ⭐ tiny gap only
  },

  brandMain: {
    fontSize: "28px",         // ⭐ larger
    fontWeight: 700,
    color: "#3B82F6",         // blue
    lineHeight: 1,
  },

  brandSub: {
    fontSize: "18px",         // ⭐ smaller than Opti
    fontWeight: 600,
    color: "#16A34A",         // green
    marginTop: "4px",         // ⭐ visually aligns with Opti
  },

  right: {
    display: "flex",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#ffffff",
    color: "#333",
    padding: "6px 14px",
    borderRadius: "999px",
    border: "1px solid #c7c7c7",
    fontSize: "13px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};
