import type { Facility } from "../types";

export function FacilityCard(props: { facility: Facility }) {
  const f = props.facility;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-np-gold/40 transition">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-slate-900">{f.name}</h4>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-np-gold/20 text-np-navy border border-np-gold/40">
              Open now
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-1">{f.location}</p>
          <p className="text-sm text-slate-600 mt-1">🕐 Closes at {f.closes}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-200">
            {f.status}
          </span>
        </div>
      </div>
    </div>
  );
}
