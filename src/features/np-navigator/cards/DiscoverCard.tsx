import type { Places } from "../types";
import { Calendar, ChevronRight, History } from "lucide-react";

export function DiscoverCard(props: {
  placeId: string;
  place: Places;
  onOpenThenNow: () => void;
}) {
  const b = props.place;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-np-gold/40 hover:shadow-md transition">
      <div className="flex gap-4 p-4">
        <img
          src={b.presentImage}
          className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
          alt={b.name}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg text-slate-900 mb-1 leading-snug">{b.name}</h3>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-np-gold/20 text-np-navy border border-np-gold/40 whitespace-nowrap">
              Then & Now
            </span>
          </div>

          <p className="text-sm text-slate-600 mb-2">{b.currentUse}</p>

          <div className="flex items-center gap-2 text-xs text-np-navy mb-3">
            <Calendar className="w-3 h-3 text-np-gold" />
            <span>Built {b.yearBuilt}</span>
          </div>

          <p className="text-xs text-slate-800 bg-np-gold/15 border border-np-gold/30 rounded-lg px-2 py-1 inline-block">
            💡 {b.funFact}
          </p>
        </div>
      </div>

      <button
        onClick={props.onOpenThenNow}
        className="w-full bg-np-navy text-white py-3 font-semibold hover:brightness-110 transition flex items-center justify-center gap-2"
      >
        <History className="w-4 h-4 text-np-gold" />
        See Then & Now
        <ChevronRight className="w-4 h-4 text-np-gold" />
      </button>
    </div>
  );
}
