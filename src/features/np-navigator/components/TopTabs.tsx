import React from "react";
import { Clock, Navigation, Wifi, Camera } from "lucide-react";
import type { TabId } from "../types";

const TABS: Array<{ id: TabId; label: string; Icon: React.ComponentType<{ className?: string }> }> = [
  { id: "now", label: "Right Now", Icon: Clock },
  { id: "map", label: "Navigate", Icon: Navigation },
  { id: "facilities", label: "Facilities", Icon: Wifi },
  { id: "discover", label: "Discover", Icon: Camera },
];

export function TopTabs(props: { activeTab: TabId; onChange: (tab: TabId) => void }) {
  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-4xl mx-auto">
        <div className="flex overflow-x-auto">
          {TABS.map((t) => {
            const active = props.activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => props.onChange(t.id)}
                className={[
                  "flex-1 min-w-max px-6 py-4 font-semibold flex items-center justify-center gap-2",
                  "transition-colors relative",
                  active ? "text-np-navy" : "text-slate-500 hover:text-slate-700",
                ].join(" ")}
              >
                <t.Icon className={["w-4 h-4", active ? "text-np-navy" : "text-slate-400"].join(" ")} />
                {t.label}

                {/* NP Gold underline */}
                <span
                  className={[
                    "absolute left-4 right-4 -bottom-[1px] h-[3px] rounded-full transition-opacity",
                    active ? "bg-np-gold opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
