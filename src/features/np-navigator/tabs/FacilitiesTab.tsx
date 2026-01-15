import { Wifi, ChevronRight } from "lucide-react";

export function FacilitiesTab() {
  const groups = ["GymWerkz", "Maker's Academy", "The Ngee Ann Shop", "Gen AI Hub"];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-200">
        <div className="w-20 h-20 bg-np-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Wifi className="w-10 h-10 text-np-navy" />
        </div>
        <h3 className="font-bold text-xl mb-2 text-np-navy">All Campus Facilities</h3>
        <p className="text-slate-600">
          Browse facility categories, check hours, and see live availability (prototype placeholder).
        </p>
      </div>

      <div className="grid gap-3">
        {groups.map((g) => (
          <button
            key={g}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between hover:border-np-gold/50 transition"
          >
            <span className="font-semibold text-slate-900">{g}</span>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
