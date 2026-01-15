import { useMemo } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";

export type ImgPoint = [number, number]; // [y, x]

function createCurrentLocationIcon(label: string): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div class="np-current-wrap">
        <span class="np-current-ping"></span>
        <span class="np-current-dot">${label}</span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 24],
  });
}

const CURRENT_CSS = `
.np-current-wrap{position:relative;width:23px;height:23px;display:flex;align-items:center;justify-content:center;}
.np-current-ping{position:absolute;inset:0;border-radius:999px;background:rgba(248,113,113,.75);animation:npPing 1.2s ease-out infinite;}
.np-current-dot{position:relative;width:22px;height:22px;border-radius:999px;background:#ef4444;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;box-shadow:0 6px 14px rgba(0,0,0,.22);}
@keyframes npPing{0%{transform:scale(.55);opacity:.95} 100%{transform:scale(1.65);opacity:0}}
`;

// Call once anywhere in app (safe to call multiple times; it no-ops after first)
export function EnsureCurrentLocationMarkerCSS() {
  if (typeof document === "undefined") return null;

  const id = "np-current-css";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = CURRENT_CSS;
    document.head.appendChild(style);
  }
  return null;
}

export function CurrentLocationMarker({
  point,
  label = "",
}: {
  point: ImgPoint;
  label?: string;
}) {
  const icon = useMemo(() => createCurrentLocationIcon(label), [label]);
  return <Marker position={point} icon={icon} />;
}
