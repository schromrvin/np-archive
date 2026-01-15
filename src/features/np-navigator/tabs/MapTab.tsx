// src/pages/navigator/MapTab.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, ImageOverlay, Marker, useMap } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, X } from "lucide-react";

import { DestinationMarker } from "./map/DestinationMarker";
import { CurrentLocationMarker, EnsureCurrentLocationMarkerCSS } from "./map/CurrentLocationMarker";

import { findPlace, suggestPlaces, type Place } from "./map/places";

// ====== MAP CONFIG (CRS.Simple image coords) ======
type ImgPoint = [number, number]; // [y, x]

// IMPORTANT: set to your real map image pixel size
const IMG_WIDTH = 1024;
const IMG_HEIGHT = 1024;

const bounds: L.LatLngBoundsExpression = [
  [0, 0],
  [IMG_HEIGHT, IMG_WIDTH],
];

// User position
const USER_POINT: ImgPoint = [690, 455];
// Destination position
const DEST_POINT: [number, number] = [310, 510];

// Default camera settings
const DEFAULT_ZOOM = -0.1;
const FOCUS_ZOOM = 0.4;

// Image paths (use forward slashes)
const MAP_BASE = "src/assets/map-navigator-base.png"; // no route
const MAP_ROUTE = "src/assets/map-navigator-route.png"; // has blue route baked in

// Demo: only show “route + destination” for this place
const ROUTE_PLACE_ID = "potato-corner";

// Simple fake walking time for demo (you can tune later)
const DEMO_WALK_MIN = 6;
const DEMO_WALK_M = 420;

function FocusControls({
  userPoint,
  onReset,
}: {
  userPoint: ImgPoint;
  onReset: () => void;
}) {
  const map = useMap();

  const recenter = () => {
    map.flyTo(userPoint, DEFAULT_ZOOM, { duration: 0.6, easeLinearity: 0.25 });
  };

  return (
    <>
      <button
        onClick={recenter}
        className="absolute bottom-5 right-5 z-[1000] bg-np-navy text-white px-4 py-2 rounded-xl shadow-lg"
      >
        You are here
      </button>

      <button
        onClick={onReset}
        className="absolute bottom-5 left-5 z-[1000] bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-xl shadow-lg border border-slate-200 hover:bg-white"
      >
        Reset
      </button>
    </>
  );
}

export function MapTab() {
  // ====== SEARCH STATE ======
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState<string | null>(null);

  const [destination, setDestination] = useState<Place | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  // ====== LEAFLET ======
  const mapRef = useRef<LeafletMap | null>(null);

  // Suggestions list
  const suggestions = useMemo(() => {
    if (!showSuggestions) return [];
    const q = query.trim();
    if (!q) return [];
    return suggestPlaces(q, 6);
  }, [query, showSuggestions]);

  // Show route image only after a successful search to the demo place
  const showRouteImage = destination?.id === ROUTE_PLACE_ID;

  // ====== DROPDOWN OUTSIDE CLICK ======
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  // ====== MAP INIT / TAB LAYOUT FIX ======
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const rAF = requestAnimationFrame(() => {
      map.invalidateSize();
      map.setView(USER_POINT, DEFAULT_ZOOM, { animate: false });
    });

    return () => cancelAnimationFrame(rAF);
  }, []);

  // ====== HELPERS ======
  function closeSuggestions() {
    setShowSuggestions(false);
  }

  function focusOnPoint(p: ImgPoint, zoom = FOCUS_ZOOM) {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo(p, zoom, { duration: 0.7, easeLinearity: 0.25 });
  }

  function applyDestination(p: Place) {
    setDestination(p);
    setNotFound(null);
    closeSuggestions();

    // Move camera to target
    focusOnPoint(p.point, FOCUS_ZOOM);
  }

  function runSearch() {
    const q = query.trim();
    if (!q) {
      setNotFound("Type a place name to search within NP.");
      setDestination(null);
      closeSuggestions();
      return;
    }

    const hit = findPlace(q);
    if (!hit) {
      setNotFound(
        "Hmm… only locations in NP can be found. Try ‘Makan Place’ or ‘Library’."
      );
      setDestination(null);
      closeSuggestions();
      return;
    }

    applyDestination(hit);
  }

  function selectSuggestion(p: Place) {
    setQuery(p.name);
    applyDestination(p);
  }

  function resetAll() {
    setDestination(null);
    setNotFound(null);
    setQuery("");
    closeSuggestions();

    const map = mapRef.current;
    if (map) map.flyTo(USER_POINT, DEFAULT_ZOOM, { duration: 0.6 });
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div ref={searchWrapRef} className="relative flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setNotFound(null);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runSearch();
                if (e.key === "Escape") closeSuggestions();
              }}
              placeholder="Search places in NP… (e.g., Library, Makan Place, Potato Corner)"
              className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-np-gold/40 focus:border-np-gold/40 outline-none"
            />

            {!!query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setNotFound(null);
                  setDestination(null);
                  setShowSuggestions(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                {suggestions.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => selectSuggestion(s)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate">
                        {s.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {s.category.toUpperCase()}
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-np-gold/20 text-np-navy border border-np-gold/40 shrink-0">
                      NP
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={runSearch}
            className="px-5 rounded-xl font-semibold bg-np-navy text-white hover:brightness-110 transition"
          >
            Search
          </button>
        </div>

        {notFound && (
          <div className="mt-3 bg-np-gold/15 border border-np-gold/30 rounded-xl p-3 text-center">
            <p className="text-sm text-slate-800">{notFound}</p>
          </div>
        )}

        {destination?.id === ROUTE_PLACE_ID && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-xl font-extrabold text-np-navy">
                {DEMO_WALK_MIN} min
              </div>
              <div className="text-xs text-slate-600">Walk time</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-xl font-extrabold text-np-navy">
                {DEMO_WALK_M} m
              </div>
              <div className="text-xs text-slate-600">Distance</div>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="relative h-[600px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
        <MapContainer
          ref={mapRef}
          crs={L.CRS.Simple}
          bounds={bounds}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          zoom={DEFAULT_ZOOM}
          center={USER_POINT}
          minZoom={-2}
          maxZoom={2}
          zoomControl
          style={{ height: "100%", width: "100%" }}
        >
          <EnsureCurrentLocationMarkerCSS />
          <ImageOverlay
            url={showRouteImage ? MAP_ROUTE : MAP_BASE}
            bounds={bounds}
          />
            <CurrentLocationMarker point={USER_POINT} />

          {showRouteImage && <DestinationMarker point={DEST_POINT}  />}

          <FocusControls userPoint={USER_POINT} onReset={resetAll} />
        </MapContainer>

        {/* Small header chip showing selected destination */}
        {destination && (
          <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur border border-slate-200 rounded-xl shadow px-3 py-2">
            <div className="text-xs text-slate-500">Destination</div>
            <div className="font-semibold text-slate-900">
              {destination.name}
            </div>
            {destination.id !== ROUTE_PLACE_ID && (
              <div className="text-xs text-slate-500 mt-0.5">
                Demo route is only available for Potato Corner right now.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
