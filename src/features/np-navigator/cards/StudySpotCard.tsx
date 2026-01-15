import type { StudySpot } from "../types";
import { Navigation } from "lucide-react";

function occupancyBadge(occupancy: number) {
  if (occupancy < 50) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (occupancy < 80) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

export function StudySpotCard(props: { spot: StudySpot; bestNow?: boolean; onNavigate?: () => void }) {
  const { spot } = props;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-np-gold/40 transition">
      <div className="flex justify-between items-start gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-slate-900 truncate">{spot.name}</h4>

            {props.bestNow && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-np-gold/20 text-np-navy border border-np-gold/40">
                Best now
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-1">{spot.location}</p>

          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-slate-600">
            {spot.quiet && (
              <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
                🤫 Quiet
              </span>
            )}
            {spot.chargingPorts && (
              <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
                ⚡ Charding Ports
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
              📶 {spot.wifi}
            </span>
          </div>
        </div>

        <span
          className={[
            "px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap border",
            occupancyBadge(spot.occupancy),
          ].join(" ")}
        >
          {spot.occupancy}% Full
        </span>
      </div>

      <button
        onClick={props.onNavigate}
        className="w-full bg-np-navy text-white py-2.5 rounded-xl font-semibold hover:brightness-110 transition flex items-center justify-center gap-2"
      >
        <Navigation className="w-4 h-4 text-np-gold" />
        Navigate There
      </button>
    </div>
  );
}
