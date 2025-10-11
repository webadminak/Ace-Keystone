import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import loopVideo from "../img/video.mp4";

/* Dummy/imported images placeholders — replace these with your real files. */
import land1 from "../map  image/Multi-Scale Base & Topographic Mapping .jpg";
import land2 from "../map  image/Multi-Scale Base & Topographic Mapping- insite.png";
import rail1 from "../map  image/image.jpeg";
import cadastral1 from "../map  image/QGIS MAP (2).jpg";
import forestry1 from "../map  image/vegpic7.jpg";
import forestry2 from "../map  image/vegencpic2.jpg";
import forestry3 from "../map  image/WhatsApp Image 2025-09-13 at 15.12.11.jpeg";
import engineering1 from "../map  image/infra.jpg";
import gisdata1 from "../map  image/WhatsApp Image 2025-09-13 at 15.35.12.jpeg";
import positional1 from "../map  image/CANTENS2EN (1).jpg";
import imgproc1 from "../map  image/IFC_Import_with_initial_added_landscape.jpg";
import imgproc2 from "../map  image/RaeburnFarquharBowen_Image.jpg";
import terrain1 from "../map  image/DEM1.jpg";
import terrain2 from "../map  image/the-ultimate-guide-to-site-topography-and-grading-analysis.jpg";

const App = () => {
  // track viewport width for responsive inline styles
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        // restore previous behaviour when component unmounts
        window.history.scrollRestoration = prev;
      };
    }
  }, []);

  // add this near the top-level effects (just after your scrollRestoration effect)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1) Blur any element that might have been auto-focused (prevents focus-driven scroll)
    try {
      if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
      }
    } catch (e) {
      // ignore
    }

    // 2) Force-scroll to top after the browser's own restore happens.
    // We do this using RAF + setTimeout so it runs after browser restore/paint on refresh/navigation.
    const raf = requestAnimationFrame(() => {
      const t = setTimeout(() => {
        // only scroll when page isn't intentionally longer than view (defensive)
        // This will silently do nothing if the page is already at top.
        try {
          window.scrollTo({ left: 0, top: 0, behavior: "auto" });
        } catch (e) {
          window.scrollTo(0, 0);
        }
      }, 0);

      // cleanup function for timeout
      // store timeout id on raf closure so cleanup can clear it
      (wrapCleanup => {
        // noop — handled by returned cleanup below
      })(t);
    });

    // cleanup
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);


  // Simple image wrapper: reserves space, avoids partial paint, fades image in on load
  // Drop-in replacement for ImageWithFade
  const ImageWithFade = ({ src, alt = "", containerStyle = {}, imgStyle = {}, loading = "lazy" }) => {
    const [loaded, setLoaded] = React.useState(false);
    const imgRef = React.useRef(null);

    // reset loaded when src changes
    React.useEffect(() => {
      setLoaded(false);
    }, [src]);

    // onLoad handler — wait for full decode when available, then mark loaded=true
    const handleLoad = async (e) => {
      const img = e.currentTarget;
      // If browser supports decode(), wait until fully decoded — this prevents partial/striped paint
      if (img && typeof img.decode === "function") {
        try {
          await img.decode();
        } catch (err) {
          // decode may reject for some images; ignore and proceed to show
        }
      }
      // small micro-delay helps avoid micro-jank on some mobile browsers
      window.requestAnimationFrame(() => setLoaded(true));
    };

    // optional error handler: mark as loaded to remove placeholder
    const handleError = () => setLoaded(true);

    // base styles: prefer width:100% + height:auto so aspect ratio preserved
    const baseContainer = {
      backgroundColor: "#F7F1EB", // neutral skeleton color (matches your page)
      overflow: "hidden",
      display: "block",
      ...containerStyle,
    };

    const baseImg = {
      width: "100%",
      // if containerStyle defines an explicit height, make the <img> fill that height
      height: containerStyle && containerStyle.height ? "100%" : "auto",
      objectFit: "cover",
      display: "block",
      opacity: loaded ? 1 : 0,
      transition: "opacity 260ms ease, transform 260ms cubic-bezier(.2,.9,.2,1)",
      transform: loaded ? "none" : "scale(1.02)",
      willChange: "opacity, transform",
      ...imgStyle,
    };


    // small placeholder overlay (visible while image isn't decoded)
    const placeholder = {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))",
      // subtle shimmer effect via animated gradient could be added, but keep minimal
      // center a tiny loader optionally: backgroundImage: `url(data:image/svg+xml;...)`
    };

    // wrapper style ensures placeholder can be absolutely positioned
    const wrapper = {
      position: "relative",
      display: "block",
      width: baseContainer.width || "100%",
      boxSizing: "border-box",
      ...baseContainer,
    };

    return (
      <div style={wrapper} aria-busy={!loaded}>
        {/* actual image (hidden via opacity until fully decoded) */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={baseImg}
        />

        {/* placeholder overlay: visible until loaded === true */}
        {!loaded && <div aria-hidden="true" style={placeholder} />}
      </div>
    );
  };



  const AnimatedContent = ({ children, direction = "right" }) => {
    const wrapRef = useRef(null);
    const contentRef = useRef(null);
    const [, setIsAnimating] = useState(false);

    useEffect(() => {
      const wrap = wrapRef.current;
      const content = contentRef.current;
      if (!wrap || !content) return;

      // ensure stable visual background during transition
      wrap.style.background = "transparent"; // keep wrapper transparent; subContent has its own bg
      wrap.style.boxSizing = "border-box";
      wrap.style.overflow = "hidden";
      wrap.style.willChange = "height, opacity";
      wrap.style.transform = "translateZ(0)";

      content.style.willChange = "transform, opacity";
      content.style.backfaceVisibility = "hidden";
      content.style.transform = direction === "right" ? "translateX(6px)" : "translateX(-6px)";
      content.style.opacity = "0.01"; // almost invisible but not fully removed (avoids blank paint)

      // measure heights in RAF to avoid forced sync layout thrash
      const start = wrap.getBoundingClientRect().height || 0;
      // set current explicit height
      wrap.style.height = `${start}px`;

      // wait a frame then set target
      requestAnimationFrame(() => {
        const target = content.scrollHeight || content.getBoundingClientRect().height || 0;
        setIsAnimating(true);
        wrap.style.transition = "height 320ms cubic-bezier(.2,.9,.2,1), opacity 260ms ease";
        content.style.transition = "transform 320ms cubic-bezier(.2,.9,.2,1), opacity 260ms ease";

        // trigger the visual in
        wrap.style.height = `${target}px`;
        wrap.style.opacity = "1";
        content.style.transform = "translateX(0)";
        content.style.opacity = "1";

        // cleanup after transition
        const cleanup = () => {
          // clear explicit height so layout can flow naturally
          wrap.style.height = "auto";
          wrap.style.transition = "";
          content.style.transition = "";
          setIsAnimating(false);
        };
        const t = setTimeout(cleanup, 380);
        return () => clearTimeout(t);
      });

      // no explicit dependency on direction here; animation triggered by children change
    }, [children, direction]);

    // keep a stable style so wrapper never snaps to white
    const wrapStyle = {
      background: "transparent",
      boxSizing: "border-box",
      overflow: "hidden",
    };

    const contentStyle = {
      willChange: "transform, opacity",
      backfaceVisibility: "hidden",
      transform: "translateX(0)",
      opacity: 1,
    };

    return (
      <div ref={wrapRef} style={wrapStyle} aria-live="polite">
        <div ref={contentRef} style={contentStyle}>
          {children}
        </div>
      </div>
    );
  };
  // ---- end AnimatedContent replacement ----

  // ---- end replacement ----


  const SubContent = React.memo(function SubContent({ sub, images, styles }) {
    return (
      <div style={styles.subContent}>
        <h3 style={styles.heading}>{sub.title}</h3>
        <p style={styles.text}>{sub.text}</p>

        {Array.isArray(sub.bullets) && sub.bullets.length > 0 && (
          <div>
            {sub.bullets.map((b, i) => (
              <div key={i} style={styles.bullet}>• {b}</div>
            ))}
          </div>
        )}

        {Array.isArray(images) && images.length > 0 && (
          <div style={styles.imageRow}>
            {images.map((imgSrc, idx) => {
              const item = styles.imageItem(images.length) || {};
              const widthValue = item.width || "100%";
              const heightValue = imageHeights.get(imgSrc) || item.height || item.minHeight || 160;

              return (
                <ImageWithFade
                  key={idx}
                  src={imgSrc}
                  alt={`${sub.key}-${idx}`}
                  loading="lazy"
                  containerStyle={{
                    width: widthValue,
                    height: heightValue,
                    borderRadius: 8,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                    boxSizing: "border-box",
                  }}
                  imgStyle={{
                    width: "100%",
                    height: width >= 1440 ? "100%" : width <= 500 ? "auto" : "100%", 
                  }}
                />
              );
            })}

          </div>
        )}

      </div>
    );
  });

  // SectionTabs now contains a ref so we can keep the active tab centered and avoid the scroller jumping back
  const SectionTabs = React.memo(function SectionTabs({
    subs,
    activeSub,
    activeSubIndex,
    onClick,
    styles,
    collapsedWidths,
    isBelow768,
  }) {
    const rowRef = useRef(null);


    const mountedRef = useRef(false);

    useEffect(() => {
      const container = rowRef.current;
      if (!container) return;
    
      if (!mountedRef.current) { // skip first paint
        mountedRef.current = true;
        return;
      }
    
      requestAnimationFrame(() => {
        const activeEl = container.querySelector(".subtab-active");
        if (!activeEl) return;
    
        const cRect = container.getBoundingClientRect();
        const eRect = activeEl.getBoundingClientRect();
        const elLeft = (eRect.left - cRect.left) + container.scrollLeft;
        const targetLeft = elLeft - (container.clientWidth - activeEl.clientWidth) / 2;
    
        container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
      });
    }, [activeSub]);
    
    


    return (
      <div style={styles.tabRowWrap}>
        <div style={styles.tabRow} ref={rowRef} role="tablist" aria-orientation="horizontal">
          {subs.map((s, i) => {
            const isActive = s.key === activeSub;
            const distance = i - activeSubIndex;
            const clamped = Math.max(-2, Math.min(2, distance));
            const nudge = clamped === 0 ? 0 : clamped * 6;

            return (
              <div
                key={s.key}
                className={isActive ? "subtab-active" : "subtab-inactive"}
                style={{
                  ...styles.subTab(isActive),
                  transform: `translateX(${nudge}px) ${isActive ? "translateY(-2px)" : "translateY(0)"}`,
                  zIndex: isActive ? 3 : 1,
                  width: isActive ? "auto" : `${collapsedWidths[s.key]}px`,
                  maxWidth: isActive ? "none" : `${collapsedWidths[s.key]}px`,
                  justifyContent: isBelow768 ? "center" : undefined,
                  transition: "all 280ms cubic-bezier(.4,0,.2,1)", // 👈 add smooth transition
                }}
                onClick={() => onClick(s.key)}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
              >
                {isActive
                  ? s.title // full title for active
                  : s.title.split(" ").slice(0, 2).join(" ") +
                  (s.title.split(" ").length > 2 ? "..." : "")}
              </div>

            );
          })}
        </div>
      </div>
    );
  });

  const mainTabs = [
    {
      key: "opt1",
      title: "Service Offering",
      sections: [
        {
          key: "mapping-services",
          title: "Geospatial Mapping Solutions",
          description:
            "We specialize in delivering precise geospatial mapping solutions that transform complex spatial data into actionable intelligence. By leveraging advanced technologies such as satellite imagery, aerial photography, LiDAR, and field survey inputs, our mapping services cater to governments, infrastructure planners, and private organizations worldwide. Our comprehensive range of services includes: ",
          subs: [
            {
              key: "land-base",
              title: "Multi-Scale Base & Topographic Mapping",
              text:
                "We provide detailed base maps across small, medium, and large scales to support urban planning, utilities, and infrastructure development. Using high-resolution imagery and terrain data, our topographic maps ensure accurate representation of the natural and built environment.",
            },
            {
              key: "cadastral",
              title: "Property Boundaries & Parcel Mapping",
              text:
                "Our property and parcel mapping services deliver accurate delineation of land ownership and boundaries. These maps are vital for taxation, legal compliance, land administration, and urban development, ensuring precise and reliable cadastral records.",
            },
            {
              key: "rail-road",
              title: "Highway, Railway & Transit Pathway Mapping",
              text:
                "We develop corridor maps for highways, railways, and transit systems, offering essential data for transportation planning, infrastructure design, and maintenance. Our mapping solutions improve safety, optimize routes, and streamline project execution.",
            },
            {
              key: "forestry",
              title: "Agro-Forestry & Water Resource Mapping",
              text:
                "We deliver spatial mapping solutions for agricultural land, forest areas, and water resources. These maps support sustainable land management, conservation planning, and environmental monitoring, enabling informed decision-making for natural resource utilization.",
            },
            {
              key: "engineering",
              title: "Topographic & Infrastructure Mapping",
              text:
                "Our engineering-focused mapping services provide high-precision topographic and infrastructure data. From photogrammetry to 3D feature extraction, these datasets are crucial for construction, utilities, and large-scale infrastructure projects.",
            },
            {
              key: "positional",
              title: "Geospatial Data Accuracy Enhancement",
              text:
                "We refine and align spatial datasets to improve positional accuracy and ensure consistency with real-world coordinates. This service enhances the reliability of geospatial databases used in government, utilities, and enterprise applications.",
            },
            {
              key: "GIS-data",
              title: "Unified GIS Data Layer Creation",
              text:
                "We integrate and harmonize diverse datasets into a unified GIS framework. This process eliminates redundancy, enhances consistency, and delivers seamless geospatial layers that power efficient analysis, planning, and decision-making.",
            },
          ],
        },
        {
          key: "geo-terrain",
          title: "Terrain Modelling & Analysis",
          description:
            "Our team delivers high-accuracy digital terrain models and elevation datasets derived from satellite imagery, aerial photographs, LiDAR, and drone-based surveys. By integrating photogrammetry, advanced spatial analytics, and precise georeferencing, we provide terrain intelligence that supports infrastructure design, watershed management, flood-risk assessment, and large-scale engineering projects.",
          descriptionBullets: [
            "High-resolution Digital Terrain and Surface Model generation",
            "Contour and slope mapping for engineering and environmental studies",
            "3D visualization for planning and simulation",
            "Hydrological and watershed analysis for sustainable development",
          ],
        },
        {
          key: "image-processing",
          title: "Satellite & Aerial Image Processing",
          description:
            "Our geospatial team transforms raw imagery into accurate, analysis-ready data for a wide range of industries. Using satellite, aerial and drone sources, we deliver precision products that meet rigorous mapping and planning standards. Service Range Includes:",
          descriptionBullets: [
            {
              heading: "Geometrically Corrected Orthophoto Production",
              text: "High-resolution orthophotos with uniform scale and positional accuracy, ideal for base mapping, infrastructure planning and environmental monitoring.",
            },
            {
              heading: "Multi-temporal Remote Sensing Analysis",
              text: "Detection of seasonal or long-term land-cover changes through advanced time-series image analytics.",
            },
            {
              heading: "Raster & Vector Geo-referencing & Rectification",
              text: "Alignment of historical maps, scanned drawings and satellite data to authoritative coordinate systems for seamless GIS integration.",
            },
            {
              heading: "Land Use, Land Cover & Habitat Thematic Classification",
              text: "Automated and manual classification of terrain to support urban planning, forestry, agriculture and biodiversity studies.",
            },
          ],
        },

      ],
    },
    {
      key: "opt2",
      title: "Domain Expertise",
      sections: [
        {
          key: "domain-expertise",
          title: "Domain Expertise",
          description:
            "Our geospatial division works hand-in-hand with a wide spectrum of organizations—public agencies, private enterprises, and critical utilities—to deliver precise, cost-effective GIS and mapping solutions. By combining advanced spatial technologies with deep domain knowledge, we help clients plan, monitor, and manage their assets with confidence.",
          descriptionBullets: [
            {
              heading: "National & Regional Mapping Authorities",
              text: "Partnering on large-scale base mapping, cadastral surveys, and nationwide spatial data infrastructures to support planning, taxation, and governance.",
            },
            {
              heading: "Municipal and Local Government Agencies",
              text: "Providing city planners and local councils with detailed geospatial data for smart-city initiatives, zoning, transportation planning, and infrastructure maintenance.",
            },
            {
              heading: "Independent & Non-Governmental Mapping Bodies",
              text: "Supporting research groups, environmental NGOs, and non-profits with flexible data acquisition, processing, and visualization for community projects and policy studies.",
            },
            {
              heading: "Satellite and Aerial Imagery Providers",
              text: "Enhancing raw imagery with orthorectification, mosaicking, and advanced analytics to create ready-to-use spatial products.",
            },
            {
              heading: "Cartographic and Spatial Data Publishers",
              text: "Supplying publishers with clean, high-resolution datasets and thematic layers for print and digital cartographic products.",
            },
            {
              heading: "GIS Software & Solution Integrators",
              text: "Collaborating on custom application development, enterprise GIS deployments, and seamless integration with existing IT ecosystems.",
            },
            {
              heading: "Forestry and Environmental Data Organizations",
              text: "Delivering forest inventory mapping, habitat analysis, and change-detection studies to guide conservation and resource management.",
            },
            {
              heading: "Land Records, Cadastre & Revenue Departments",
              text: "Streamlining land administration by providing precise parcel boundaries, ownership layers, and revenue mapping for taxation and governance.",
            },
            {
              heading: "Oil, Gas & Energy Infrastructure Companies",
              text: "Mapping pipelines, refining corridor data, and supporting predictive maintenance for critical energy networks.",
            },
            {
              heading: "Water Supply & Distribution Boards",
              text: "Creating and maintaining detailed asset maps to optimize water distribution, detect leaks, and plan network expansions.",
            },
            {
              heading: "Stormwater and Sewerage Network Managers",
              text: "Supporting flood-risk modelling, drainage planning, and maintenance scheduling with high-accuracy underground utility data.",
            },
            {
              heading: "Power, Electrical Grid & Telecom Operators",
              text: "Delivering network inventory mapping, outage analysis, and spatial planning to ensure reliable service and infrastructure growth.",
            },
          ],
        },
      ],
    },
  ];

  // ----- State (unchanged initial activeSub) -----
  const initialMainKey = mainTabs[0].key;
  const initialSection = mainTabs[0].sections[0];
  const initialSectionKey = initialSection.key;
  const initialSubKey =
    Array.isArray(initialSection.subs) && initialSection.subs.length > 0
      ? initialSection.subs[0].key
      : null;

  const [activeMain, setActiveMain] = useState(initialMainKey);
  const [activeSection, setActiveSection] = useState(initialSectionKey);
  const [activeSub, setActiveSub] = useState(initialSubKey);
  const [direction, setDirection] = useState("right");

  const currentMain = mainTabs.find((m) => m.key === activeMain);
  const currentSection = currentMain.sections.find((s) => s.key === activeSection);

  // video ref & paused state for pause/play control
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const togglePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => { });
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  /*
    IMAGE MAPS
  */
  const subImagesMap = {
    "land-base": [land1, land2],
    "rail-road": [rail1],
    "cadastral": [cadastral1],
    "forestry": [forestry1, forestry2, forestry3],
    "engineering": [engineering1],
    "positional": [positional1],
    "GIS-data": [gisdata1],
    "image-processing": [imgproc1],
  };

  const sectionImagesMap = {
    "geo-terrain": [terrain1, terrain2],
    "image-processing": [imgproc1, imgproc2],
  };
  // per-image fixed heights (px). Using the imported variables as keys.
// per-image responsive heights (px)
// per-image responsive heights (px)
// (computes breakpoints locally to avoid TDZ and duplicate vars)
const imageHeights = React.useMemo(() => {
  const isXS = width < 576;
  const isSM = width >= 576 && width < 768;
  const isMD = width >= 768 && width < 992;

  return new Map([
    [land1,       isXS ? 220 : isSM ? 320 : isMD ? 420 : 500],
    [land2,       isXS ? 220 : isSM ? 320 : isMD ? 420 : 500],
    [rail1,       isXS ? 200 : isSM ? 300 : 380],
    [cadastral1,  isXS ? 180 : isSM ? 240 : 300],
    [forestry1,   isXS ? 230 : isSM ? 200 : 260],
    [forestry2,   isXS ? 230 : isSM ? 200 : 260],
    [forestry3,   isXS ? 200 : isSM ? 200 : 260],
    [engineering1,isXS ? 160 : isSM ? 240 : 300],
    [positional1, isXS ? 480 : isSM ? 500 : 670],
    [gisdata1,    isXS ? 470 : isSM ? 480 : 650],
    [imgproc1,    isXS ? 200 : isSM ? 280 : 350],
    [imgproc2,    isXS ? 200 : isSM ? 280 : 350],
    [terrain1,    isXS ? 240 : isSM ? 320 : 400],
    [terrain2,    isXS ? 380 : isSM ? 520 : 680],
  ]);
}, [width]);




  // preload all section & sub images on mount
  useEffect(() => {
    const allImages = [
      ...Object.values(subImagesMap).flat(),
      ...Object.values(sectionImagesMap).flat()
    ];

    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // ----- Styles (responsive, driven by width) -----
  const styles = useMemo(() => {
    // breakpoints
    const isXS = width < 576;
    const isSM = width >= 576 && width < 768;
    const isMD = width >= 768 && width < 992;
    const isLG = width >= 992 && width < 1200;
    const isXL = width >= 1200;

    // new helper: detect <=768 for some behavior
    const isBelow768 = width <= 768;

    // dynamic sizes
    const leftPct = isXS ? "100%" : isSM ? "34%" : isMD ? "30%" : isLG ? "28.5%" : "28.5714%";
    const rightPct = isXS ? "100%" : `calc(100% - ${leftPct})`;

    const heroPaddingTop = isXS ? 120 : isSM ? 160 : isMD ? 180 : 170;
    const heroPaddingBottom = isXS ? 40 : 60;

    const heroMinHeight = isXS ? 360 : 420;
    const heroLeftHeight = isXS ? 300 : isSM ? 380 : 650;

    const sideWidth = isXS ? "100%" : isSM ? 260 : isMD ? 300 : 360;
    const sideHidden = isXS; // hide side on mobile

    const tabRowPaddingX = isXS ? 8 : 12;

    // image item widths (responsive)
    const imageItemWidth = (count) => {
      if (isXS) return "100%";
      if (count === 1) return "40%";  // 👈 instead of 100%, keep it narrower
      if (count === 2) return isMD ? "49%" : "48%";
      return isLG || isXL ? "31%" : "48%";
    };
    // detect Safari / iOS Safari (pragmatic)
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const isIOS = /\b(iPad|iPhone|iPod)\b/.test(ua) || (ua.includes("Macintosh") && "ontouchend" in document);

    const safariFixes = isSafari || isIOS ? {
      imageRowExtra: { alignItems: "stretch", minWidth: 0 },
      imageItemExtra: { minWidth: 0, overflow: "hidden" },
      imgExtra: { display: "block", width: "100%", height: "auto", objectFit: "cover", maxWidth: "100%" }
    } : {};


    return {
      wrapper: {
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        padding: "0",
        background: "linear-gradient(180deg, #FBF7F3 0%, #F5F0EA 55%, #F2ECE6 100%)",
        minHeight: "100vh",
        color: "#26323A",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      },

      heroWrap: {
        display: "flex",
        width: "100%",
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "visible",
        minHeight: heroMinHeight,
        padding: `${heroPaddingTop}px 20px ${heroPaddingBottom}px 20px`,
        gap: isXS ? 20 : 48,
      },

      heroInner: {
        display: "flex",
        width: "100%",
        maxWidth: isXS ? 960 : 1200,
        gap: isXS ? 20 : 68,
        alignItems: "center",
        flexDirection: isXS ? "column" : "row",
      },

      // HERO LEFT - ensure border radius and overflow hidden so video respects rounded corners
      heroLeft: {
        position: "relative",
        flex: isXS ? `0 0 100%` : `0 0 ${leftPct}`,
        overflow: "hidden",                 // ensure children clipped to radius
        minHeight: 240,
        height: heroLeftHeight,
        borderRadius: 12,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 18px 40px rgba(20,30,40,0.06)",
        // add a background color fallback so when video loads it's not a white flash
        backgroundColor: "rgb(11 11 11 / 0%)",
        transform: "translateY(40px)",
        paddingTop: width <= 768 ? 20 : 0,  // 👈 only add padding on mobile (<768px)
        boxSizing: "border-box"                  // 👈 ensures padding doesn’t mess layout
      },


      heroVideoWrap: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 12,
        zIndex: 2,
      },

      heroLeftVideo: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        zIndex: 1,
        borderRadius: 12,
      },

      // overlay must match border radius so top corners do not appear square
      heroLeftOverlay: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.18) 100%)",
        zIndex: 3,
        borderRadius: 12,
        pointerEvents: "none",
      },

      heroVideoControlBtn: {
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 6,
        width: isXS ? 36 : 44,
        height: isXS ? 36 : 44,
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.55)",
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.06)",
      },

      heroShortDesc: {
        position: "absolute",
        left: 12,
        bottom: 12,
        maxWidth: isXS ? 260 : 340,
        width: isXS ? "72%" : "70%",
        background: "rgba(3,6,10,0.78)",
        color: "#fff",
        padding: "10px 12px",
        borderRadius: 6,
        zIndex: 6,
        boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        fontSize: isXS ? 12 : 13,
        lineHeight: 1.45,
      },

      shortDescTitle: { fontWeight: 700, marginBottom: 6, fontSize: isXS ? 12 : 14 },
      shortDescText: { fontWeight: 400, opacity: 0.95, fontSize: isXS ? 12 : 13 },

      heroRight: {
        position: "relative",
        flex: isXS ? `0 0 100%` : `0 0 ${rightPct}`,
        overflow: "visible",
        minHeight: 240,
        padding: isXS ? "40px 0px 4px 0px" : "0 8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 4,
        background: "transparent",
      },

      heroHeading: {
        fontSize: isXS ? 28 : 34,
        lineHeight: 1.04,
        margin: 0,
        color: "black",
        fontWeight: 900,
        letterSpacing: 0.2,
        marginBottom: 12,
      },

      heroParagraph: {
        margin: 0,
        fontSize: isXS ? 14 : 16,
        color: "black",
        maxWidth: isXS ? "100%" : 740,
        lineHeight: isXS ? 1.5 : 1.7,
        opacity: 0.95,
      },

      heroBullets: {
        marginTop: 18,
        paddingLeft: 22,
        lineHeight: 1.7,
        color: "black",
        fontSize: isXS ? 13 : 15,
        fontFamily: "system-ui",
      },





      mainContainer: {
        padding: isXS ? "12px 16px 32px 16px" : "28px 48px 48px 48px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      },

      topRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      },

      leftTop: {
        display: "flex",
        alignItems: "center",
        gap: 12,
      },

      mainTabs: {
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: isXS ? "wrap" : "nowrap",
      },

      mainTab: (active) => ({
        padding: isXS ? "8px 12px" : "10px 16px",
        borderRadius: 10,
        background: active ? `linear-gradient(90deg, rgb(246 142 1), rgb(255 192 0))` : "transparent",
        color: active ? "#fff" : "#516371",
        fontWeight: 700,
        fontSize: isXS ? 13 : 15,
        cursor: "pointer",
        boxShadow: active ? `0 8px 26px rgba(30,144,255,0.14)` : "none",
        transition: "all 220ms cubic-bezier(.2,.9,.2,1)",
      }),

      layout: {
        display: isXS ? "block" : "flex",
        gap: 24,
        alignItems: "flex-start",
      },

      side: {
        width: isBelow768 ? "100%" : sideHidden ? "100%" : sideWidth,
        display: isXS ? "flex" : "flex",
        flexDirection: "column",
        gap: 10,
        marginTop: 6,
        marginBottom: isXS ? 12 : 0,
      },

      // align right on large screens, centered on mobile (<=768)
      sectionBtn: (active) => ({
        display: "flex",
        justifyContent: isBelow768 ? "center" : "flex-end",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
        borderRadius: 12,
        background: active ? "linear-gradient(90deg, rgba(30,144,255,0.06), rgba(255,140,66,0.03))" : "#F3ECE6",
        color: active ? "#162328" : "#516371",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        boxShadow: active ? "0 6px 20px rgba(30,40,55,0.06)" : "0 6px 12px rgba(20,28,32,0.03)",
        border: "1px solid rgba(34,48,56,0.03)",
        backdropFilter: "blur(3px)",
      }),

      contentCard: {
        flex: "0 1 auto",
        borderRadius: 16,
        background: "linear-gradient(180deg, #F8F4F0 0%, #F4EEE8 100%)",
        boxShadow: "0 14px 40px rgba(25,35,45,0.06)",
        padding: 0,
        minHeight: isXS ? 520 : isMD ? 620 : 700, // reserve enough vertical space to avoid jumps
        overflow: "visible",
        border: "1px solid rgba(34,48,56,0.04)",
        paddingBottom: 24,
        width: "100%",
        maxWidth:
          width >= 1400 && width <= 1450
            ? "1050px"
            : isXS
              ? "100%"
              : isSM
                ? "540px"
                : isMD
                  ? "720px"
                  : "1380px",
        margin: "0 auto",
        boxSizing: "border-box", // important so padding doesn't change computed size
        transition: "box-shadow 200ms ease, transform 200ms ease", // keep small transitions for polish
      },




      topInfo: {
        padding: isXS ? "12px 14px" : "20px 24px",
        borderBottom: "1px solid rgba(34,48,56,0.04)",
        display: "block",
      },

      sectionHeading: {
        fontSize: isXS ? 18 : 22,
        fontFamily: "system-ui",
        fontWeight: 800,
        margin: "4px 0 6px 0",
        color: "#162328",
      },

      sectionDesc: {
        fontSize: isXS ? 13 : 14,
        fontFamily: "system-ui",
        lineHeight: 1.6,
        margin: 0,
        color: "#52666F",
        opacity: 0.95,
      },

      // inside styles returned by useMemo, replace these keys:

      tabRowWrap: {
        padding: `${isXS ? 8 : 12}px ${tabRowPaddingX}px`,
        background: "transparent",
        overflow: "hidden",
        // reserve space and hide native scrollbars visually (platform-safe trick):
        paddingBottom: 8,
        marginBottom: -8, // hides possible scrollbar track on many browsers while keeping scrollable area
        minHeight: 56,           // reserve enough vertical space for tabs
        boxSizing: "border-box",
        position: "relative",
      },

      tabRow: {
        position: "absolute",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "flex-start", // or left if you prefer
        gap: 12,
        padding: "8px 12px",
        scrollPaddingInlineStart: 12,
        marginBottom: 0,
        background: "transparent",
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",      // ensure no vertical scrollbar
        WebkitOverflowScrolling: "touch",
        flexWrap: "nowrap",
        alignItems: "center",
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
        boxSizing: "border-box",  // important to avoid rounding overflow
      },

      imageRow: {
        display: "flex",
        gap: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        flexWrap: "wrap",
        width: "100%",
        boxSizing: "border-box",
        minHeight: isXS ? 120 : isMD ? 160 : 200,
        ...safariFixes.imageRowExtra
      },

      imageItem: (count) => ({
        display: "block",
        width: imageItemWidth(count),
        maxWidth: "100%",
        borderRadius: 8,
        objectFit: "cover",
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        // remove forced minHeight so the item grows with the image
        height: "auto",
        minHeight: 0,
        boxSizing: "border-box",
        ...safariFixes.imageItemExtra
      }),




      subTab: (active) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: active ? (isXS ? "10px 14px" : "12px 20px") : (isXS ? "8px 10px" : "9px 12px"),
        borderRadius: 12,
        background: active ? `linear-gradient(90deg, rgb(246 142 1), rgb(255 192 0))` : "#EFE6DE",
        color: active ? "#FFFFFF" : "#5C7278",
        boxShadow: active ? `0 10px 30px rgba(30,144,255,0.12)` : "0 6px 18px rgba(20,28,32,0.03)",
        fontWeight: 700,
        fontSize: active ? (isXS ? 13 : 15) : (isXS ? 12 : 14),
        cursor: "pointer",
        transform: active ? "translateY(-2px)" : "translateY(0)",
        transition: "all 220ms cubic-bezier(.2,.9,.2,1)",
        minWidth: 0,
        flex: "0 0 auto",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
      }),

      subContent: {
        borderRadius: "0 12px 12px 12px",
        background: "linear-gradient(180deg,#FBF7F3,#F7F1EB)",
        padding: isXS ? "18px 18px 20px 18px" : "28px 48px 36px 48px",
        minHeight: 220,
        height: "auto",
        overflow: "visible",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid rgba(34,48,56,0.03)",
      },

      slideWrap: {
        position: "relative",
        overflow: "visible",
        flex: "0 0 auto",
        minHeight: 120,
        height: "auto",
      },

      slide: (show, isNew) => ({
        display: show ? "block" : "none",
        position: "relative",
        width: "100%",
        height: "auto",
        boxSizing: "border-box",
        paddingRight: 10,
        opacity: show ? 1 : 0,
        transform: show ? "translateX(0)" : isNew ? "translateX(6px)" : "translateX(0)",
        transition: "opacity 260ms ease, transform 320ms cubic-bezier(.2,.9,.2,1)",
        zIndex: show ? 2 : 1,
        pointerEvents: "auto",
        overflow: "visible",
      }),

      heading: {
        fontSize: isXS ? 16 : 20,
        fontFamily: "system-ui",
        fontWeight: 800,
        marginBottom: 8,
        color: "#162328",
      },

      text: {
        fontSize: isXS ? 14 : 15,
        fontFamily: "system-ui",
        lineHeight: 1.7,
        marginBottom: 14,
        color: "#3A4A50",
      },

      bullet: {
        marginBottom: 8,
        fontSize: isXS ? 13 : 14,
        fontFamily: "system-ui",
        color: "#414141",
        fontWeight: 600,
      },

      bulletHeading: {
        fontSize: isXS ? 14 : 15,
        fontFamily: "system-ui",
        fontWeight: 800,
        color: "#162328",
        marginBottom: 6,
      },

      bulletText: {
        fontSize: isXS ? 13 : 14,
        fontFamily: "system-ui",
        fontWeight: 600,
        color: "#55686E",
        lineHeight: 1.5,
      },

      responsivePad: {
        padding: isXS ? "12px" : "16px",
      },

      // expose for SectionTabs to use
      __isBelow768: isBelow768,
    };
  }, [width]);

  // ----- Handlers (unchanged functionality) -----
  const handleSubClick = (key) => {
    const currentIndex =
      Array.isArray(currentSection.subs) && currentSection.subs.length
        ? currentSection.subs.findIndex((s) => s.key === activeSub)
        : -1;
    const newIndex =
      Array.isArray(currentSection.subs) && currentSection.subs.length
        ? currentSection.subs.findIndex((s) => s.key === key)
        : -1;

    setDirection(newIndex > currentIndex ? "right" : "left");
    setActiveSub(key);
  };

  // ----- compute activeSubIndex for nudging logic (safe) -----
  const activeSubIndex =
    Array.isArray(currentSection.subs) && currentSection.subs.length
      ? currentSection.subs.findIndex((s) => s.key === activeSub)
      : -1;

  // NEW helper: returns first two words + "..." for inactive tabs


  // collapsed width helpers (smaller clamps)
  const MIN_COLLAPSED_PX = 90;
  const MAX_COLLAPSED_PX = 160;
  const HORIZONTAL_INACTIVE_PADDING = 20;

  const measureTextWidth = (text) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.font = "700 16px system-ui, Inter, Segoe UI, Roboto, sans-serif";
      const metrics = ctx.measureText(text);
      return Math.ceil(metrics.width);
    } catch (e) {
      return text.length * 8;
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCollapsedWidth = useCallback((title) => {
    if (!title) return MIN_COLLAPSED_PX;
    const words = title.trim().split(/\s+/).filter(Boolean);
    const firstTwo = words.slice(0, 2).join(" ");
    const textToMeasure = words.length <= 2 ? firstTwo : firstTwo + "...";
    const measured = measureTextWidth(textToMeasure);
    const needed = measured + HORIZONTAL_INACTIVE_PADDING + 12;
    return Math.max(MIN_COLLAPSED_PX, Math.min(MAX_COLLAPSED_PX, needed));
  }, []);

  // find active sub object (put this before return())
  const activeSubObj =
    Array.isArray(currentSection.subs) && currentSection.subs.length
      ? currentSection.subs.find((s) => s.key === activeSub)
      : null;
  const collapsedWidths = useMemo(() => {
    const map = {};
    currentSection?.subs?.forEach(s => {
      map[s.key] = getCollapsedWidth(s.title);
    });
    return map;
  }, [currentSection, getCollapsedWidth]);
  // include width since text measurement can vary with zoom/font

  // ----- Render -----
  return (
    <div style={styles.wrapper}>
      {/* HERO band: left = video + poster + overlays; right = heading + paragraph */}
      <div style={styles.heroWrap}>
        <div style={styles.heroInner}>
          {/* LEFT half: poster with looping video on top */}
          <div style={styles.heroLeft}>

            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: isMobile ? "0px" : "0px",  // <-- ADD THIS

                backgroundColor: isMobile ? "transparent" : "rgb(11, 11, 11)",
              }}
            >
              <video
                ref={videoRef}
                src={loopVideo}
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  /* move the visible area down on mobile without changing video height */
                  transform: isMobile ? "translateY(0px)" : "none",
                  /* optional: also tweak object position for more precise control */
                  objectPosition: isMobile ? "50% 35%" : "50% 20%",
                  display: "block",
                  borderRadius: 12,
                  willChange: "transform"
                }}


              />


              {/* pause/play control */}
              <button
                onClick={togglePlayPause}
                aria-pressed={paused}
                aria-label={paused ? "Play video" : "Pause video"}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 6,
                  width: isMobile ? 36 : 44,
                  height: isMobile ? 36 : 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.55)",
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700 }}>
                  {paused ? "▶" : "⏸"}
                </span>
              </button>
            </div>

          </div>

          {/* RIGHT half: heading and long description */}
          <div style={styles.heroRight}>
            <h1 style={styles.heroHeading}>Geospatial </h1>

            {/* Intro paragraph */}
            <p style={styles.heroParagraph}>
              Geospatial services connect data with location to reveal patterns, trends, and opportunities that might otherwise go unseen. By transforming complex information into clear visuals and insights, these services empower communities, businesses, and governments to plan more effectively, respond more quickly, and achieve more sustainable outcomes.
              High-precision geospatial data also supports large-scale urban planning and infrastructure projects, enabling smarter cities and efficient utilities management. Additionally, businesses benefit from optimised operations, improved asset management, and enhanced service delivery through customised geospatial solutions.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN content area (unchanged) */}
      <div style={styles.mainContainer}>
        {/* top row: mainTabs moved to left */}
        <div style={styles.topRow}>
          <div style={styles.leftTop}>
            <div style={styles.mainTabs}>
              {mainTabs.map((m) => (
                <div
                  key={m.key}
                  style={styles.mainTab(m.key === activeMain)}
                  onClick={() => {
                    const firstSection = m.sections[0];
                    const firstSectionKey = firstSection.key;
                    const firstSubKey =
                      Array.isArray(firstSection.subs) && firstSection.subs.length ? firstSection.subs[0].key : null;
                    setActiveMain(m.key);
                    setActiveSection(firstSectionKey);
                    setActiveSub(firstSubKey);
                  }}
                >
                  {m.title}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.rightTopPlaceholder}>{/* reserved for future controls */}</div>
        </div>

        <div style={styles.layout}>
          {/* Side Sections (hide for Domain Expertise) */}
          {activeMain !== "opt2" && (
            <div style={styles.side}>
              {currentMain.sections.map((s) => (
                <div
                  key={s.key}
                  style={styles.sectionBtn(s.key === activeSection)}
                  onClick={() => {
                    const firstSubKey = Array.isArray(s.subs) && s.subs.length ? s.subs[0].key : null;
                    setActiveSection(s.key);
                    setActiveSub(firstSubKey);
                    // after switching, keep the side area visible (we don't auto-scroll the page)
                    // intentionally not changing scroll to preserve user's position.
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      maxWidth: 260,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div>{s.title}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Content Card */}
          <div style={styles.contentCard}>
            <div style={styles.topInfo}>
              <div style={styles.sectionHeading}>{currentSection.title}</div>
              <div style={styles.sectionDesc}>{currentSection.description}</div>

              {Array.isArray(currentSection.descriptionBullets) && currentSection.descriptionBullets.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  {currentSection.descriptionBullets.map((b, i) => {
                    if (typeof b === "string") {
                      return (
                        <div key={i} style={{ ...styles.bullet, paddingLeft: 30 }}>
                          • {b}
                        </div>
                      );
                    }
                    return (
                      <div key={i} style={{ paddingLeft: 30, marginBottom: 14 }}>
                        <div style={styles.bulletHeading}>{b.heading}</div>
                        <div style={styles.bulletText}>{b.text}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Section-level images */}
              {Array.isArray(sectionImagesMap[currentSection.key]) &&
                sectionImagesMap[currentSection.key].length > 0 && (
                  <div style={styles.imageRow}>
                    {sectionImagesMap[currentSection.key].map((imgSrc, idx) => {
                      const item = styles.imageItem(sectionImagesMap[currentSection.key].length) || {};
                      const widthValue = item.width || "100%";
                      // prefer explicit mapping from imageHeights; fallback to item.height/minHeight
                      const heightValue = imageHeights.get(imgSrc) || item.height || item.minHeight || 160;

                      return (
                        <ImageWithFade
                          key={idx}
                          src={imgSrc}
                          alt={`${currentSection.key}-img-${idx}`}
                          loading="lazy"
                          containerStyle={{
                            width: widthValue,
                            height: heightValue,
                            borderRadius: 8,
                            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                            boxSizing: "border-box",
                          }}
                          imgStyle={{
                            width: "100%",
                            height: width >= 1440 ? "100%" : width <= 500 ? "auto" : "100%", 
                          }}
                        />
                      );
                    })}


                  </div>
                )}
            </div>

            {/* Sub Tabs */}
            <div style={styles.tabRowWrap}>
              {Array.isArray(currentSection.subs) && currentSection.subs.length > 0 ? (
                <SectionTabs
                  subs={currentSection.subs}
                  activeSub={activeSub}
                  activeSubIndex={activeSubIndex}
                  onClick={handleSubClick}
                  styles={styles}
                  collapsedWidths={collapsedWidths}
                  isBelow768={styles.__isBelow768}
                />
              ) : (
                // invisible placeholder to preserve horizontal footprint (keeps layout stable)
                <div style={{ height: 1, visibility: "hidden" }} aria-hidden="true" />
              )}
            </div>


            {/* Sub Content */}
            {activeSubObj && (
              <AnimatedContent direction={direction}>
                <SubContent
                  sub={activeSubObj}
                  images={subImagesMap[activeSubObj.key]}
                  styles={styles}
                />
              </AnimatedContent>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
