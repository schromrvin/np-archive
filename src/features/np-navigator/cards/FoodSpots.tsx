import type { FoodSpots } from "../types";

function crowdBadge(level: FoodSpots["crowdLevel"]) {
  if (level === "Low") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (level === "Medium") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

export function FoodSpotsCard(props: { canteen: FoodSpots }) {
  const c = props.canteen;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-np-gold/40 transition">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-slate-900">{c.name}</h4>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-np-gold/20 text-np-navy border border-np-gold/40">
              Food
            </span>
          </div>

          <p className="text-sm text-slate-600 mt-1">⏱️ Wait: {c.waitTime}</p>
          <p className="text-xs text-slate-500 mt-1">Peak: {c.peakHours}</p>
          <p className="text-xs text-np-navy mt-2">{c.popular}</p>
        </div>

        <span className={["px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap border", crowdBadge(c.crowdLevel)].join(" ")}>
          {c.crowdLevel}
        </span>
      </div>
    </div>
  );
}
