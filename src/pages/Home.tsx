import { useEffect, useState } from "react";
import { GlassPane } from "@/components/GlassPane";

import { usePageTitle } from "@/lib/usePageTitle";
import { LetterIntro } from "@/components/LetterIntro";

export function Home() {
  usePageTitle("NP Archive | Home");

  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Hide navbar (and optionally other fixed UI) while intro is running
    document.documentElement.classList.add("intro-active");

    const onDone = () => {
      setIntroDone(true);
      document.documentElement.classList.remove("intro-active");
    };

    window.addEventListener("np:introComplete", onDone);
    return () => {
      window.removeEventListener("np:introComplete", onDone);
      document.documentElement.classList.remove("intro-active");
    };
  }, []);

  return (
    <main>
      <section id="intro">
        <LetterIntro />
      </section>

      <section
        className={[
          "min-h-screen px-6 pb-24 pt-16",
          "flex flex-col items-center justify-center space-y-8 max-w-lg mx-auto",
          "transition-opacity duration-500",
          introDone
            ? "opacity-100"
            : "opacity-0 pointer-events-none select-none",
        ].join(" ")}
      >
        <div id="contentTop" />
        <div className="text-center space-y-2">
          <GlassPane className="size-24 rounded-3xl mx-auto flex items-center justify-center p-0 mb-6 bg-white/40">
            <img
              src="/np-archive/logo.png"
              alt="NP Logo"
              className="w-16 h-16 object-contain drop-shadow-md"
            />
          </GlassPane>

          <h1 className="text-4xl font-bold text-np-navy tracking-tight">
            NP Archive
          </h1>
          <p className="text-gray-600 font-medium text-lg">
            Preserving Memories, Celebrating History.
          </p>
        </div>

        {/* Later: your interactive timeline section goes below this */}
      </section>
    </main>
  );
}
