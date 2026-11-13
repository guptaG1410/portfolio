import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07080d",
          color: "#f4f5f8",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        GG
      </div>
    ),
    { ...size },
  );
}
