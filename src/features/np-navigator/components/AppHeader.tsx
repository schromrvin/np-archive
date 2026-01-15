import React from "react";
import { MapPin } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-gradient-to-r from-np-navy to-np-blue text-white">
      <div className="max-w-4xl mx-auto px-4 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <MapPin className="h-5 w-5 text-np-gold" />
              </span>
              <h1 className="text-2xl font-bold tracking-tight">
                NP Navigator
              </h1>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Navigate the Ngee Ann Polytechnic campus with ease
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-np-gold" />
              NP Live
            </span>
          </div>
        </div>
      </div>

      <div className="h-1 bg-np-gold" />
    </header>
  );
}
