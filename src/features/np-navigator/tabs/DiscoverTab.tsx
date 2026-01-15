import type { Places } from "../types";
import { DiscoverCard } from "../cards/DiscoverCard";
import { Camera, Info } from "lucide-react";

export function DiscoverTab(props: {
  places: Record<string, Places>;
  onOpenThenNow: (placeId: string) => void;
}) {
  const items = Object.entries(props.places);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5 border border-np-navy/15 bg-np-navy/5">
        <h2 className="font-bold text-lg flex items-center gap-2 text-np-navy">
          <Camera className="w-5 h-5 text-np-gold" />
          Campus Through Time
        </h2>
        <p className="text-sm text-slate-700 mt-2">
          Discover the stories behind places you pass every day—then compare how they look now.
        </p>
      </div>

      <div className="space-y-4">
        {items.map(([id, b]) => (
          <DiscoverCard
            key={id}
            placeId={id}
            place={b}
            onOpenThenNow={() => props.onOpenThenNow(id)}
          />
        ))}
      </div>

      <div className="bg-np-gold/15 border border-np-gold/30 rounded-2xl p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-np-navy">
          <Info className="w-4 h-4 text-np-navy" />
          Pro Tip
        </h3>
        <p className="text-sm text-slate-700">
          When you navigate somewhere later, you can surface quick “Did You Know?” facts along the route.
        </p>
      </div>
    </div>
  );
}
