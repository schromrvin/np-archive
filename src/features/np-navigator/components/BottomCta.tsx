import React from "react";

export function BottomCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t z-40">
      <div className="max-w-4xl mx-auto p-4">
        <button
          className={["w-full max-w-md mx-auto block","bg-np-navy text-white",
            "py-3 rounded-2xl font-bold",
            "hover:brightness-110 active:scale-[0.99] transition", "shadow-sm"].join(" ")}
        >
          <span className="mr-2">🎯</span>
          Where do you need to go?
          <span className="ml-2 text-np-gold">•</span>
        </button>
        <p className="text-center text-xs text-slate-500 mt-2">
          Tip: Use <span className="font-semibold text-np-navy">Discover</span> for Then & Now.
        </p>
      </div>
    </div>
  );
}