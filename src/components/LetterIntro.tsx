import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const STEP2: Record<string, gsap.TweenVars> = {
  // “Pop out” layout (still near envelope) - still need adjustment of positions
  "#item-polaroid": { x: -80, y: -120, scale: 1.0, rotate: -10, autoAlpha: 1 },
  "#item-letter": { x: 40, y: -150, scale: 1.05, rotate: 6, autoAlpha: 1 },
  "#item-stamp": { x: 160, y: -110, scale: 1.0, rotate: 10, autoAlpha: 1 },
  "#item-college": { x: -10, y: -20, scale: 1.0, rotate: 0, autoAlpha: 1 },
};

const STEP3: Record<string, gsap.TweenVars> = {
  "#item-polaroid": { x: 59, y: -85, rotate: -4, scale: 1.09, autoAlpha: 1 },
  "#item-letter": { x: 90, y: -15, rotate: 3, scale: 1.3, autoAlpha: 1 },
  "#item-stamp": { x: -230, y: -60, rotate: 3, scale: 0.9, autoAlpha: 1 },
  "#item-college": { x: -60, y: 20, rotate: 0, scale: 1.2, autoAlpha: 1 },
};

export function LetterIntro() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const imagePath = import.meta.env.BASE_URL + "assets/letter-animation";

  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const ctx = gsap.context(() => {
      gsap.set(window, { scrollTo: 0 });
      gsap.set("#env-closed", { autoAlpha: 1 });
      gsap.set("#env-semi", { autoAlpha: 0 });
      gsap.set("#env-open", { autoAlpha: 0 });

      gsap.set(".item", {
        autoAlpha: 0,
        x: 0,
        y: 55,
        rotate: 0,
        transformOrigin: "50% 50%",
      });

      const pinST = ScrollTrigger.create({
        trigger: "#intro",
        start: "top top",
        end: "+=99999",
        pin: true,
        pinSpacing: false,
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      // ===== Step 2 : open envelope + pop contents out (together) =====
      tl.addLabel("step2")
        .to("#env-closed", { autoAlpha: 0, duration: 0.9 }, "step2")
        .to("#env-semi", { autoAlpha: 1, duration: 0.9 }, "step2")
        .to("#env-open", { autoAlpha: 0.35, duration: 0.9 }, "step2")
        .to(
          ".item",
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            clearProps: "rotate",
          },
          "step2"
        );

      tl.addLabel("step2", "step2+=0.9");

      Object.entries(STEP2).forEach(([selector, vars]) => {
        tl.to(
          selector,
          { ...vars, duration: 0.9, ease: "power3.inOut" },
          "step2"
        );
      });

      // ===== Step 3 : envelopes disappear + contents settle + scroll follows =====
      tl.addLabel("step3");

      const THROW = {
        contentsY: -150,
        contentsScale: 1.25,
      };

      // how far from the top you want the collage to sit after the scroll
      const CONTENTS_OFFSET_Y = 250 - THROW.contentsY;

      tl.to(
        ["#env-semi", "#env-open"],
        { autoAlpha: 0, duration: 0.6 },
        "step3"
      );

      // Move + scale the collage group
      tl.to(
        "#contents",
        {
          y: THROW.contentsY,
          scale: THROW.contentsScale,
          duration: 0.9,
          ease: "sine.inOut",
        },
        "step3"
      );

      // Apply final per-item layout
      Object.entries(STEP3).forEach(([selector, vars]) => {
        tl.to(
          selector,
          { ...vars, duration: 0.9, ease: "sine.inOut" },
          "step3"
        );
      });

      // Scroll camera to match
      tl.to(
        window,
        {
          scrollTo: { y: "#contents", offsetY: CONTENTS_OFFSET_Y },
          duration: 0.9,
          ease: "sine.inOut",
        },
        "step3"
      );

      // End: unpin + hand over to page content
      tl.add(() => {
        pinST.kill();
        requestAnimationFrame(() => {
          window.dispatchEvent(new CustomEvent("np:introComplete"));
        });
      }, "step3+=0.05");

      // Click to start
      const onClick = () => tl.play();
      const closed = document.getElementById("env-closed");
      closed?.addEventListener("click", onClick);

      return () => {
        closed?.removeEventListener("click", onClick);
        pinST.kill();
        tl.kill();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      id="letter-scene"
      className="relative h-screen w-full overflow-visible flex items-center justify-center bg-white"
    >
      {/* Envelopes */}
      <img
        id="env-closed"
        src={`${imagePath}/envelop_close.png`}
        className="absolute z-30 w-[520px] max-w-[90vw] cursor-pointer select-none"
        draggable={false}
        alt="Closed envelope"
      />
      <img
        id="env-semi"
        src={`${imagePath}/envelop_semi_open.png`}
        className="absolute z-30 w-[520px] max-w-[90vw] select-none opacity-0"
        draggable={false}
        alt="Semi-open envelope"
      />
      <img
        id="env-open"
        src={`${imagePath}/envelop_open.png`}
        className="absolute z-30 w-[520px] max-w-[90vw] select-none opacity-0"
        draggable={false}
        alt="Open envelope"
      />

      {/* Contents group */}
      <div
        id="contents"
        className="absolute z-20 w-[860px] max-w-[92vw] pointer-events-none"
      >
        <div id="mouth" className="relative mx-auto h-[260px] w-[560px] ">
          <div id="collage" className="relative h-[420px]">
            <img
              id="item-polaroid"
              className="item absolute left-[9%] top-[23%] w-[210px] rotate-[-10deg] select-none"
              draggable={false}
              src={`${imagePath}/polariod.png`}
              alt=""
            />
            <img
              id="item-letter"
              className="item absolute z-40 left-[43%] top-[19%] w-[280px] rotate-[6deg] select-none"
              draggable={false}
              src={`${imagePath}/invitation_letter.png`}
              alt=""
            />
            <img
              id="item-stamp"
              className="item absolute left-[35%] top-[24%] w-[150px] select-none"
              draggable={false}
              src={`${imagePath}/NPstamp.png`}
              alt=""
            />
            <img
              id="item-college"
              className="item absolute left-[25%] top-[50%] w-[220px] select-none"
              draggable={false}
              src={`${imagePath}/ngeeann_college.png`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
