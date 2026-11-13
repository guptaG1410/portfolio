import { ImageResponse } from "next/og";

export const alt = "Govind Gupta, Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080d",
          color: "#f4f5f8",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: "#9adfff" }}>GG</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#9a9bb0" }}>SOFTWARE ENGINEER</div>
          <div style={{ display: "flex", fontSize: 84, letterSpacing: -2, marginTop: 12 }}>Govind Gupta</div>
          <div style={{ display: "flex", fontSize: 32, color: "#c4c5d4", marginTop: 18 }}>
            Building scalable systems. Engineering intelligent solutions.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#9adfff" }}>New Delhi · Full-stack · Backend · Cloud · AI</div>
      </div>
    ),
    { ...size },
  );
}
