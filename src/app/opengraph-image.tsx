import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Digital Growth, AI & Automation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#05060a",
        backgroundImage:
          "radial-gradient(circle at 85% 0%, rgba(79,140,255,0.4), rgba(5,6,10,0) 55%), radial-gradient(circle at 0% 100%, rgba(139,92,246,0.35), rgba(5,6,10,0) 50%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "linear-gradient(135deg, #38bdf8, #4f8cff, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
            fontWeight: 700,
          }}
        >
          G
        </div>
        <div style={{ fontSize: 40, fontWeight: 700 }}>{site.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          Digital Growth. AI Innovation. Smarter Automation.
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8" }}>Websites · Digital Marketing · AI · Automation · Analytics</div>
      </div>
    </div>,
    size,
  );
}
