"use client";
import { useState } from "react";
import ScaffioDemo from "@/components/ScaffioDemo";

const PIN = "scaffio2026";

export default function Page() {
  const [unlocked, setUnlocked] = useState(false);
  const [val, setVal] = useState("");
  const [error, setError] = useState(false);

  const tryUnlock = () => {
    if (val === PIN) {
      setUnlocked(true);
    } else {
      setError(true);
      setVal("");
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!unlocked) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a1628",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
        fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44, background: "#c9a84c", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, color: "#0a1628", fontSize: 22,
          }}>S</div>
          <span style={{ color: "white", fontWeight: 800, fontSize: 26, letterSpacing: "-0.5px" }}>Scaffio</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, margin: 0 }}>
          Investor preview · Enter access code to continue
        </p>
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && tryUnlock()}
          placeholder="Access code"
          type="password"
          autoFocus
          style={{
            padding: "14px 20px",
            borderRadius: 12,
            border: "1.5px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            fontSize: 16,
            outline: "none",
            width: 260,
            textAlign: "center",
            letterSpacing: "0.1em",
          }}
        />
        {error && <p style={{ color: "#e05050", fontSize: 13, margin: 0 }}>Incorrect code — try again</p>}
        <button onClick={tryUnlock} style={{
          background: "#c9a84c", color: "#0a1628", border: "none",
          borderRadius: 12, padding: "14px 36px", fontWeight: 700,
          cursor: "pointer", fontSize: 15,
        }}>Enter demo →</button>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, margin: 0 }}>Confidential · April 2026</p>
      </div>
    );
  }

  return <ScaffioDemo />;
}
