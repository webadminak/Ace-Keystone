import React, { useEffect, useMemo, useRef } from "react";
import lottie from "lottie-web";
import gsap from "gsap";
import animationDataDesktop from "../data/Scene-4 (5).json";
import animationDataMobile from "../data/Scene-6 (1).json";
import "./Lottieflow.module.css";

const PIN_OFFSET = 6; // px from viewport top where the block "stops"
const MAX_TWEEN_DURATION = 1.1; // cap tween time for snappy feel

const LottieFlow = () => {
  const wrapperRef = useRef(null);
  const pinBlockRef = useRef(null);
  const containerRef = useRef(null);

  const animRef = useRef(null);
  const tweenRef = useRef(null);

  // control refs
  const isAnimatingRef = useRef(false);
  const stepRef = useRef(0);

  // autoplay refs
  const autoplayTimerRef = useRef(null);
  const autoplayStartTimeoutRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 430;
  const animationData = isMobile ? animationDataMobile : animationDataDesktop;

  // frames per step (kept exactly as you provided)
  const framesDesktop = [0, 60, 145, 265, 325, 400, 480, 499];
  const framesMobile = [0, 80, 155, 230, 289, 369, 455, 489];
  const frames = useMemo(() => (isMobile ? framesMobile : framesDesktop), [isMobile]);
  const totalSteps = frames.length;

  const animateToStep = (nextIndex) => {
    const target = Math.max(0, Math.min(totalSteps - 1, nextIndex));
    if (!animRef.current) return;
    if (target === stepRef.current) return;

    if (tweenRef.current) tweenRef.current.kill();
    isAnimatingRef.current = true;

    const start = Math.round(animRef.current.currentFrame || 0);
    const end = frames[target];
    const distance = Math.abs(end - start);
    const baseSpeed = isMobile ? 20 : 120;
    const duration = Math.min(MAX_TWEEN_DURATION, Math.max(0.18, distance / baseSpeed));

    const f = { v: start };
    tweenRef.current = gsap.to(f, {
      v: end,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (animRef.current) animRef.current.goToAndStop(Math.round(f.v), true);
      },
      onComplete: () => {
        if (animRef.current) animRef.current.goToAndStop(end, true);
        stepRef.current = target;
        isAnimatingRef.current = false;
      },
    });
  };

  useEffect(() => {
    // Initialize Lottie
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData,
    });

    // expose for debugging if you still rely on it elsewhere
    window.__lottie_anim = animRef.current;
    window.__lottie_frames = frames;

    // apply immediate container-level performance hints (in case DOMLoaded is delayed)
    if (containerRef.current) {
      containerRef.current.style.willChange = "transform, opacity";
      containerRef.current.style.transform = "translateZ(0)";
      containerRef.current.style.backfaceVisibility = "hidden";
      containerRef.current.style.WebkitBackfaceVisibility = "hidden";
      containerRef.current.style.contain = "paint";
      containerRef.current.style.touchAction = "auto"; // preserve normal scrolling
    }

    // adjust inserted SVG sizing for responsiveness and promote to compositor
    const onDomLoaded = () => {
      const svg = containerRef.current?.querySelector("svg");
      if (svg) {
        if (window.innerWidth <= 1440) {
          svg.style.width = "100%";
          svg.style.height = "auto";
          svg.style.maxWidth = "1200px";
        } else {
          svg.style.width = "1600px";
          svg.style.height = "auto";
          svg.style.maxWidth = "100%";
        }

        // Performance tweaks: promote to compositor and reduce repaint during scroll
        svg.style.willChange = "transform, opacity";
        svg.style.transform = "translateZ(0)";
        svg.style.backfaceVisibility = "hidden";
        svg.style.WebkitBackfaceVisibility = "hidden";
        svg.style.contain = "paint";

        // make sure the svg doesn't unexpectedly intercept pointer events
        svg.style.pointerEvents = "auto";
      }

      // re-apply the same hints to container (defensive)
      if (containerRef.current) {
        containerRef.current.style.willChange = "transform, opacity";
        containerRef.current.style.transform = "translateZ(0)";
        containerRef.current.style.backfaceVisibility = "hidden";
        containerRef.current.style.WebkitBackfaceVisibility = "hidden";
        containerRef.current.style.contain = "paint";
        containerRef.current.style.touchAction = "auto";
      }
    };
    animRef.current.addEventListener && animRef.current.addEventListener("DOMLoaded", onDomLoaded);

    // start at collapsed frame
    animRef.current.goToAndStop(frames[0], true);
    stepRef.current = 0;

    // --- Autoplay: advance one step every 500ms until last step ---
    const runAutoplay = () => {
      // clear any existing interval (safety)
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }

      autoplayTimerRef.current = setInterval(() => {
        // don't queue a step while tweening
        if (isAnimatingRef.current) return;

        const next = Math.min(totalSteps - 1, stepRef.current + 1);
        if (next === stepRef.current) {
          // reached the end — stop interval and leave final frame visible
          clearInterval(autoplayTimerRef.current);
          autoplayTimerRef.current = null;
          return;
        }

        animateToStep(next);
      }, 300);
    };

    // start slightly after mount so layout has settled
    autoplayStartTimeoutRef.current = setTimeout(runAutoplay, 220);

    // cleanup
    return () => {
      // remove DOMLoaded listener if present
      try {
        animRef.current?.removeEventListener && animRef.current.removeEventListener("DOMLoaded", onDomLoaded);
      } catch (e) {}

      // clear autoplay timers
      if (autoplayStartTimeoutRef.current) {
        clearTimeout(autoplayStartTimeoutRef.current);
        autoplayStartTimeoutRef.current = null;
      }
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }

      // kill any GSAP tween and destroy lottie
      tweenRef.current?.kill();
      try {
        animRef.current?.destroy && animRef.current.destroy();
      } catch (e) {}

      // cleanup window debug handles if you want (optional)
      try { delete window.__lottie_anim; } catch {}
      try { delete window.__lottie_frames; } catch {}
    };
  }, [animationData, frames, isMobile, totalSteps]);

  // Render — sticky remains visual only; there is NO scroll-intercept logic anymore
  return (
    <section ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <div
        ref={pinBlockRef}
        style={{
          position: "sticky",
          top: `${PIN_OFFSET}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 20,
          zIndex: 2,
        }}
      >
        <h2
          style={{
            marginBottom: 10,
            fontSize: 22,
            fontWeight: "bold",
            padding: 20,
            textTransform: "none",
          }}
        >
          Customer Journey
        </h2>

        <div
          ref={containerRef}
          className="lottie-diagram"
          style={{
            margin: "0 auto",
            touchAction: "auto", // allow normal touch / scroll interactions
          }}
        />
      </div>

      {/* spacer so the section has breathing room */}
      <div style={{ height: "20vh" }} />
    </section>
  );
};

export default LottieFlow;
