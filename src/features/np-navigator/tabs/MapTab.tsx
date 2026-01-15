import { useEffect, useMemo, useRef } from "react";
import { MapContainer, ImageOverlay, Marker, useMap } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createYouAreHereIcon } from "./map/youAreHereIcon";

type ImgPoint = [745, 438]; // [y, x]

const IMG_WIDTH = 1100;
const IMG_HEIGHT = 1100;

const bounds: L.LatLngBoundsExpression = [
  [0, 0],
  [IMG_HEIGHT, IMG_WIDTH],
];

const USER_POINT = [745, 438];
const DEFAULT_ZOOM = -1;

function RecenterButton({ userPoint }: { userPoint: ImgPoint }) {
  const map = useMap();
  return (
    <button
      onClick={() => map.flyTo(userPoint, map.getZoom(), { duration: 1 })}
      className="absolute bottom-4 right-4 z-[1000] rounded-xl bg-np-navy text-white px-4 py-2 shadow-lg"
    >
      Center on me
    </button>
  );
}

export function NavigateMap() {
  const mapRef = useRef<LeafletMap | null>(null);
  const userIcon = useMemo(() => createYouAreHereIcon(), []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.fitBounds(bounds);
    map.setView(USER_POINT, -1, { animate: false });
  }, []);

  return (
    <div className="relative h-[600px] rounded-2xl overflow-hidden border border-slate-200">
      <MapContainer
        ref={mapRef}
        crs={L.CRS.Simple}
        bounds={bounds}
        maxBounds={bounds}
        zoom={-1}
        minZoom={-2}
        maxZoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <ImageOverlay url="public/assets/places/campus-map.png" bounds={bounds} />
        <Marker position={USER_POINT} icon={userIcon} />
        <RecenterButton userPoint={USER_POINT} />
      </MapContainer>
    </div>
  );
}
