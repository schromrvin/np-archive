import { X, Calendar, Star } from "lucide-react";
import type { Places } from "../types";
import { CompareSlider } from "./CompareSlider";

export function ThenNowModal(props: {
  open: boolean;
  places: Places | null;
  onClose: () => void;
}) {
  if (!props.open || !props.places) return null;
  const place = props.places;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-start justify-center pt-8">
        <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-np-navy to-[#001f4a] text-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-2xl font-bold mb-1">{place.name}</h2>
                <p className="text-white/80 text-sm mt-2">
                  Drag the slider to travel through time
                </p>
              </div>

              <button
                onClick={props.onClose}
                className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25 transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <CompareSlider
              currentImage={place.presentImage}
              pastImage={place.pastImage}
              currentLabel={place.yearNow}
              pastLabel={place.yearBuilt}
            />

            {/* Then / Now story */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-np-gold/15 border border-np-gold/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-np-navy" />
                  <h3 className="font-bold text-np-navy">
                    Then
                  </h3>
                </div>
                <p className="text-sm text-slate-700">{place.story.past}</p>
              </div>

              <div className="bg-np-navy/5 border border-np-navy/15 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-np-navy" />
                  <h3 className="font-bold text-np-navy">Now</h3>
                </div>
                <p className="text-sm text-slate-700">{place.story.present}</p>
              </div>
            </div>


            {/* Facilities */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <h3 className="font-semibold mb-3 text-np-navy">
                What's Here Now
              </h3>
              <div className="flex flex-wrap gap-2">
                {place.facilities.map((f, i) => (
                  <span
                    key={i}
                    className="bg-np-navy/5 border border-np-navy/15 px-3 py-1 rounded-full text-sm text-np-navy"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
