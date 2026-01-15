import React from "react";
import { useCompareSlider } from "../hooks/useCompareSlider";

export function CompareSlider(props: {
  currentImage: string;
  pastImage: string;
  currentLabel: string;
  pastLabel: string;
}) {
  const { containerRef, sliderPos, dragStart, setSliderPos } =
    useCompareSlider(50);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg select-none bg-slate-200 cursor-ew-resize"
      onClick={onClick}
    >
      {/* NOW */}
      <div className="absolute inset-0">
        <img
          src={props.currentImage}
          className="w-full h-full object-cover"
          draggable={false}
          alt="Now"
        />
        <div className="absolute bottom-4 right-4 bg-np-navy text-white px-4 py-2 rounded-xl font-bold shadow-lg">
          {props.currentLabel}
        </div>
      </div>

      {/* THEN */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={props.pastImage}
          className="w-full h-full object-cover"
          draggable={false}
          alt="Then"
        />
        <div className="absolute bottom-4 left-4 bg-np-gold text-np-navy px-4 py-2 rounded-xl font-bold shadow-lg">
          {props.pastLabel}
        </div>
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-2xl z-10"
        style={{ left: `${sliderPos}%` }}
        onMouseDown={dragStart}
        onTouchStart={dragStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-1 h-6 bg-slate-400 rounded" />
            <div className="w-1 h-6 bg-slate-400 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
