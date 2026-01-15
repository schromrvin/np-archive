import React, { useMemo } from "react";
import type { LiveData } from "../types";
import { StatusBanner } from "../cards/StatusBanner";
import { StudySpotCard } from "../cards/StudySpotCard";
import { FoodSpotsCard } from "../cards/FoodSpots";
import { FacilityCard } from "../cards/FacilityCard";
import { Book, Coffee, Wifi } from "lucide-react";
import { BottomCta } from "../components/BottomCta";

export function NowTab(props: { liveData: LiveData }) {
  const sortedStudySpots = useMemo(() => {
    return [...props.liveData.studySpots].sort(
      (a, b) => a.occupancy - b.occupancy
    );
  }, [props.liveData.studySpots]);

  // top 1–2 are “Best now”
  const bestNowNames = useMemo(
    () => new Set(sortedStudySpots.slice(0, 2).map((s) => s.name)),
    [sortedStudySpots]
  );

  return (
    <div className="space-y-6">
      <StatusBanner />

      {/* Study Spots */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg flex items-center gap-2 text-np-navy">
          <Book className="w-5 h-5 text-np-gold" />
          Best Study Spots Right Now
        </h3>

        <div className="space-y-3">
          {sortedStudySpots.map((spot) => (
            <StudySpotCard
              key={spot.name}
              spot={spot}
              bestNow={bestNowNames.has(spot.name)}
              onNavigate={() => {
                // hook to real navigation later
              }}
            />
          ))}
        </div>
      </section>

      {/* Food */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg flex items-center gap-2 text-np-navy">
          <Coffee className="w-5 h-5 text-np-gold" />
          Food Spots
        </h3>

        <div className="space-y-3">
          {props.liveData.foodSpots.map((c) => (
            <FoodSpotsCard key={c.name} canteen={c} />
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg flex items-center gap-2 text-np-navy">
          <Wifi className="w-5 h-5 text-np-gold" />
          Facilities Open Now
        </h3>

        <div className="space-y-3">
          {props.liveData.facilities.map((f) => (
            <FacilityCard key={f.name} facility={f} />
          ))}
        </div>
      </section>
      <BottomCta />
    </div>
  );
}
