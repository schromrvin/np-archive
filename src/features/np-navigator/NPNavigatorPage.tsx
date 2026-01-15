import React, { useMemo, useState } from "react";
import type { TabId } from "./types";
import { liveDataMock } from "./data/liveData.mock";
import { placesMock } from "./data/places.mock";
// import { AppHeader } from "./components/AppHeader";
import { TopTabs } from "./components/TopTabs";
import { BottomCta } from "./components/BottomCta";
import { NowTab } from "./tabs/NowTab";
import { DiscoverTab } from "./tabs/DiscoverTab";
import { MapTab } from "./tabs/MapTab";
import { FacilitiesTab } from "./tabs/FacilitiesTab";
import { ThenNowModal } from "./modals/ThenNowModal";

export function NPNavigator() {
  const [activeTab, setActiveTab] = useState<TabId>("now");
  const [selectedPlaceId, setselectedPlaceId] = useState<string | null>(null);

  const selectedPlace = useMemo(
    () => (selectedPlaceId ? placesMock[selectedPlaceId] : null),
    [selectedPlaceId]
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <TopTabs activeTab={activeTab} onChange={setActiveTab} />

      {
        <div className="p-4 max-w-4xl mx-auto">
          {activeTab === "now" && <NowTab liveData={liveDataMock} />}
          {activeTab === "discover" && (
            <DiscoverTab
              places={placesMock}
              onOpenThenNow={setselectedPlaceId}
            />
          )}
          {activeTab === "map" && <MapTab />}
          {activeTab === "facilities" && <FacilitiesTab />}
        </div>
      }

      <ThenNowModal
        open={!!selectedPlace}
        places={selectedPlace}
        onClose={() => setselectedPlaceId(null)}
      />
    </div>
  );
}
