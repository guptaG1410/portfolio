import type { ReactNode } from "react";

export function Diagram({ id }: { id: "api" | "cloud" | "ai" | "security" }) {
  if (id === "api") return <ApiDiagram />;
  if (id === "cloud") return <CloudDiagram />;
  if (id === "ai") return <AiDiagram />;
  return <SecurityDiagram />;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 360 150" className="h-36 w-full" role="img" aria-hidden="true">
      {children}
    </svg>
  );
}

function ApiDiagram() {
  return (
    <Frame>
      <path className="flow-line" d="M78 75 H150" stroke="#9adfff" strokeWidth="1.4" fill="none" />
      <path className="flow-line" d="M232 75 H268" stroke="#9adfff" strokeWidth="1.4" fill="none" />
      <rect x="16" y="52" width="62" height="46" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <rect x="150" y="46" width="82" height="58" rx="14" fill="rgba(141,123,255,0.12)" stroke="rgba(154,223,255,0.45)" />
      <rect x="268" y="22" width="74" height="28" rx="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
      <rect x="268" y="61" width="74" height="28" rx="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
      <rect x="268" y="100" width="74" height="28" rx="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
      <text x="47" y="79" textAnchor="middle" fill="#c4c5d4" fontSize="11">Client</text>
      <text x="191" y="79" textAnchor="middle" fill="#f4f5f8" fontSize="11">Gateway</text>
      <text x="305" y="40" textAnchor="middle" fill="#9a9bb0" fontSize="10">Service</text>
      <text x="305" y="79" textAnchor="middle" fill="#9a9bb0" fontSize="10">Service</text>
      <text x="305" y="118" textAnchor="middle" fill="#9a9bb0" fontSize="10">Service</text>
    </Frame>
  );
}

function CloudDiagram() {
  const layers = ["CI/CD", "Kubernetes", "Docker", "AWS"];
  return (
    <Frame>
      {layers.map((layer, index) => (
        <g key={layer} transform={`translate(${28 + index * 10} ${22 + index * 28})`}>
          <rect width={220 - index * 8} height="26" rx="8" fill="rgba(255,255,255,0.03)" stroke={index === 1 ? "rgba(154,223,255,0.55)" : "rgba(255,255,255,0.14)"} />
          <text x="14" y="17" fill="#c4c5d4" fontSize="11">{layer}</text>
        </g>
      ))}
    </Frame>
  );
}

function AiDiagram() {
  const nodes = [
    { x: 18, label: "Docs" },
    { x: 102, label: "Chunks" },
    { x: 186, label: "Vectors" },
    { x: 270, label: "Model" },
  ];
  return (
    <Frame>
      <path className="flow-line" d="M78 68 H102 M162 68 H186 M246 68 H270" stroke="#9adfff" strokeWidth="1.4" fill="none" />
      {nodes.map((node) => (
        <g key={node.label}>
          <rect x={node.x} y="44" width="72" height="48" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
          <text x={node.x + 36} y="72" textAnchor="middle" fill="#f4f5f8" fontSize="11">{node.label}</text>
        </g>
      ))}
    </Frame>
  );
}

function SecurityDiagram() {
  return (
    <Frame>
      <path className="flow-line" d="M70 48 H150 V102 H70 V48" stroke="#9adfff" strokeWidth="1.3" fill="none" />
      <rect x="28" y="28" width="78" height="36" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <rect x="150" y="28" width="78" height="36" rx="10" fill="rgba(141,123,255,0.12)" stroke="rgba(154,223,255,0.4)" />
      <rect x="150" y="86" width="78" height="36" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <rect x="28" y="86" width="78" height="36" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
      <text x="67" y="50" textAnchor="middle" fill="#c4c5d4" fontSize="11">Identity</text>
      <text x="189" y="50" textAnchor="middle" fill="#f4f5f8" fontSize="11">Token</text>
      <text x="189" y="108" textAnchor="middle" fill="#c4c5d4" fontSize="11">Policy</text>
      <text x="67" y="108" textAnchor="middle" fill="#c4c5d4" fontSize="11">Monitor</text>
    </Frame>
  );
}
