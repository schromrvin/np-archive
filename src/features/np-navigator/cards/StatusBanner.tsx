import { TrendingUp } from "lucide-react";

function formatTime(d: Date) {
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const hh = ((h + 11) % 12) + 1;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${hh}:${m} ${ampm}`;
}

export function StatusBanner(props: { updatedAt?: Date } = {}) {
  const updatedAt = props.updatedAt ?? new Date();

  return (
    <div className="rounded-2xl p-4 border border-np-navy/15 bg-np-navy/5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-np-gold" />
          <h2 className="font-bold text-np-navy">Live Campus Status</h2>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-np-navy border border-np-gold/40">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-np-gold/70 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-np-gold" />
          </span>
          Live • {formatTime(updatedAt)}
        </div>
      </div>

      <p className="text-sm text-slate-700 mt-2">
        Best picks are ranked by current availability (lower occupancy first).
      </p>
    </div>
  );
}
