import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const MOVEMENT_DAMPING = 1400;
const AUTO_ROTATION_SPEED = 0.003;
const GLOBE_THETA = 0.25;
const GLOBE_RADIUS = 0.8;
const MARKER_ELEVATION = 0.03;

type LocalizedText = {
  es: string;
  en: string;
};

type GlobePoint = {
  id: string;
  location: [number, number];
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  color: string;
};

const GLOBE_POINTS: GlobePoint[] = [
  {
    id: "cdmx",
    location: [19.4326, -99.1332],
    label: { es: "CDMX", en: "CDMX" },
    title: { es: "Ciudad de Mexico", en: "Mexico City" },
    description: {
      es: "Esta es mi ubicacion actual.",
      en: "This is my current location.",
    },
    color: "#fb6415",
  },
  {
    id: "bogota",
    location: [4.711, -74.0721],
    label: { es: "Bogota", en: "Bogota" },
    title: { es: "Cerca de Bogota", en: "Near Bogota" },
    description: {
      es: "Trabajo para Credibanco desarrollando soluciones bancarias en diferentes tecnologias.",
      en: "I work for Credibanco building banking solutions across different technologies.",
    },
    color: "#22c55e",
  },
  {
    id: "usa",
    location: [39.8283, -98.5795],
    label: { es: "EEUU", en: "USA" },
    title: { es: "Estados Unidos", en: "United States" },
    description: {
      es: "He desarrollado varias aplicaciones para proyectos en Estados Unidos.",
      en: "I have delivered several application development projects in the United States.",
    },
    color: "#60a5fa",
  },
  {
    id: "kazajistan",
    location: [48.0196, 66.9237],
    label: { es: "Kazajistan", en: "Kazakhstan" },
    title: { es: "Kazajistan", en: "Kazakhstan" },
    description: {
      es: "Desarrolle una aplicacion de viajes enfocada en esa region.",
      en: "I developed a travel application focused on that region.",
    },
    color: "#f59e0b",
  },
];

const toCartesian = ([lat, lon]: [number, number]): [number, number, number] => {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latRad);

  return [-cosLat * Math.cos(lonRad), Math.sin(latRad), cosLat * Math.sin(lonRad)];
};

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized;
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);

  return { r, g, b };
};

const toRgba = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface GlobeProps {
  scale?: number;
}

export function Globe({ scale = 0.84 }: GlobeProps) {
  const { language } = useLanguage();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pointerInteracting = useRef<number | null>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const hoveredPointRef = useRef<string | null>(null);
  const activePointRef = useRef<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
  const [activePointId, setActivePointId] = useState<string | null>(null);

  const vectorsById = useMemo(
    () =>
      GLOBE_POINTS.reduce<Record<string, [number, number, number]>>((accumulator, point) => {
        accumulator[point.id] = toCartesian(point.location);
        return accumulator;
      }, {}),
    [],
  );

  const activePoint = GLOBE_POINTS.find((point) => point.id === activePointId) ?? null;
  const activePointColor = activePoint?.color ?? "#60a5fa";

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 40,
    stiffness: 280,
    restDelta: 0.001,
  });

  useEffect(() => {
    hoveredPointRef.current = hoveredPointId;
  }, [hoveredPointId]);

  useEffect(() => {
    activePointRef.current = activePointId;
  }, [activePointId]);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current === null) return;
    const delta = clientX - pointerInteracting.current;
    pointerInteracting.current = clientX;
    r.set(r.get() + delta / MOVEMENT_DAMPING);
  };

  const registerMarkerRef = (id: string) => (element: HTMLButtonElement | null) => {
    markerRefs.current[id] = element;
  };

  const updateMarkerPositions = (phi: number) => {
    const cosTheta = Math.cos(GLOBE_THETA);
    const sinTheta = Math.sin(GLOBE_THETA);
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);

    for (const point of GLOBE_POINTS) {
      const marker = markerRefs.current[point.id];
      if (!marker) continue;

      const [x, y, z] = vectorsById[point.id];
      const radius = GLOBE_RADIUS + MARKER_ELEVATION;
      const px = x * radius;
      const py = y * radius;
      const pz = z * radius;

      const c = cosPhi * px + sinPhi * pz;
      const s = sinPhi * sinTheta * px + cosTheta * py - cosPhi * sinTheta * pz;

      const markerX = (c + 1) / 2;
      const markerY = (-s + 1) / 2;
      const visible = -sinPhi * cosTheta * px + sinTheta * py + cosPhi * cosTheta * pz >= 0 || c * c + s * s >= 0.64;

      const isActive = activePointRef.current === point.id;
      const isHovered = hoveredPointRef.current === point.id;
      const markerScale = visible ? (isActive ? 1.2 : isHovered ? 1.08 : 1) : 0.72;

      marker.style.left = `${markerX * 100}%`;
      marker.style.top = `${markerY * 100}%`;
      marker.style.opacity = visible ? "1" : "0";
      marker.style.pointerEvents = visible ? "auto" : "none";
      marker.style.transform = `translate(-50%, -50%) scale(${markerScale})`;
    }
  };

  useEffect(() => {
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationFrameId = 0;

    const initGlobe = () => {
      if (!canvasRef.current) return;

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio ?? 1, 2) : 1,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        phi: 0,
        theta: GLOBE_THETA,
        dark: 0.25,
        diffuse: 1.35,
        mapSamples: 16000,
        mapBrightness: 4.8,
        mapBaseBrightness: 0.2,
        baseColor: [0.13, 0.3, 0.58],
        markerColor: [251 / 255, 100 / 255, 21 / 255],
        glowColor: [0.9, 0.94, 1],
        markerElevation: MARKER_ELEVATION,
        markers: GLOBE_POINTS.map((point) => ({ location: point.location, size: 0.075 })),
      });

      const animate = () => {
        if (!globe) return;

        if (pointerInteracting.current === null) {
          phiRef.current += AUTO_ROTATION_SPEED;
        }

        const currentPhi = phiRef.current + rs.get();
        const now = Date.now() * 0.0035;

        globe.update({
          phi: currentPhi,
          width: widthRef.current * 2,
          height: widthRef.current * 2,
          markers: GLOBE_POINTS.map((point, index) => ({
            location: point.location,
            size: 0.073 + Math.sin(now + index * 0.9) * 0.008 + (activePointRef.current === point.id ? 0.01 : 0),
          })),
        });

        updateMarkerPositions(currentPhi);
        animationFrameId = window.requestAnimationFrame(animate);
      };

      animationFrameId = window.requestAnimationFrame(animate);

      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = "1";
      }, 100);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          widthRef.current = entry.contentRect.width;
          if (!globe) {
            initGlobe();
          }
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (globe) globe.destroy();
      resizeObserver.disconnect();
    };
  }, [rs, vectorsById]);

  useEffect(() => {
    if (!activePointId) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePointId(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activePointId]);

  const modal =
    activePoint && typeof document !== "undefined"
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setActivePointId(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              background: "rgba(2,6,23,0.7)",
              backdropFilter: "blur(3px)",
            }}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              style={{
                width: "min(92vw, 360px)",
                position: "relative",
                borderRadius: "1rem",
                border: `1px solid ${toRgba(activePointColor, 0.45)}`,
                background: `linear-gradient(160deg, rgba(15,23,42,0.97), ${toRgba(activePointColor, 0.16)})`,
                boxShadow: `0 24px 46px rgba(0,0,0,0.45), 0 0 0 1px ${toRgba(activePointColor, 0.2)}`,
                padding: "1rem",
                color: "#e2e8f0",
              }}
            >
              <button
                type="button"
                onClick={() => setActivePointId(null)}
                style={{
                  position: "absolute",
                  top: "0.55rem",
                  right: "0.55rem",
                  width: "28px",
                  height: "28px",
                  borderRadius: "0.5rem",
                  border: `1px solid ${toRgba(activePointColor, 0.48)}`,
                  background: `linear-gradient(145deg, ${toRgba(activePointColor, 0.22)}, rgba(15,23,42,0.85))`,
                  color: "#cbd5e1",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                x
              </button>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.3rem 0.65rem",
                  borderRadius: "999px",
                  border: `1px solid ${toRgba(activePointColor, 0.5)}`,
                  background: `linear-gradient(135deg, ${toRgba(activePointColor, 0.22)}, rgba(15,23,42,0.74))`,
                  color: "#e2e8f0",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {activePoint.label[language]}
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <strong style={{ fontSize: "1rem", marginTop: "0.65rem", paddingRight: "2.1rem" }}>{activePoint.title[language]}</strong>
              </div>

              <p style={{ marginTop: "0.75rem", color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5 }}>
                {activePoint.description[language]}
              </p>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          ref={containerRef}
          style={{
            width: `${Math.max(0.55, Math.min(1, scale)) * 100}%`,
            maxWidth: "600px",
            aspectRatio: "1/1",
            position: "relative",
          }}
        >
          <canvas
            style={{
              width: "100%",
              height: "100%",
              opacity: 0,
              transition: "opacity 1s ease",
              contain: "layout paint",
              cursor: "grab",
              touchAction: "none",
              filter: "drop-shadow(0 0 45px rgba(59,130,246,0.2))",
            }}
            ref={canvasRef}
            onPointerDown={(event) => {
              updatePointerInteraction(event.clientX);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerUp={(event) => {
              updatePointerInteraction(null);
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
            }}
            onPointerCancel={(event) => {
              updatePointerInteraction(null);
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
            }}
            onPointerLeave={() => updatePointerInteraction(null)}
            onPointerMove={(event) => updateMovement(event.clientX)}
          />

          {GLOBE_POINTS.map((point) => {
            const isHovered = hoveredPointId === point.id;

            return (
              <button
                key={point.id}
                type="button"
                ref={registerMarkerRef(point.id)}
                onMouseEnter={() => setHoveredPointId(point.id)}
                onMouseLeave={() => setHoveredPointId(null)}
                onFocus={() => setHoveredPointId(point.id)}
                onBlur={() => setHoveredPointId(null)}
                onClick={() => setActivePointId(point.id)}
                aria-label={`Open marker ${point.title[language]}`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "24px",
                  height: "24px",
                  borderRadius: "999px",
                  border: `2px solid ${toRgba(point.color, 0.95)}`,
                  background: `linear-gradient(145deg, ${toRgba(point.color, 0.96)}, ${toRgba(point.color, 0.74)})`,
                  boxShadow: `0 0 0 4px ${toRgba(point.color, 0.26)}, 0 8px 18px rgba(0,0,0,0.45)`,
                  cursor: "pointer",
                  zIndex: 8,
                  opacity: 0,
                  pointerEvents: "none",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: "-7px",
                    borderRadius: "999px",
                    border: `1px solid ${point.color}88`,
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "-28px",
                    transform: "translateX(-50%)",
                    padding: "0.18rem 0.5rem",
                    borderRadius: "999px",
                    border: `1px solid ${toRgba(point.color, 0.5)}`,
                    background: `linear-gradient(135deg, rgba(2,6,23,0.92), ${toRgba(point.color, 0.24)})`,
                    color: "#e2e8f0",
                    fontSize: "0.64rem",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    whiteSpace: "nowrap",
                    opacity: isHovered ? 1 : 0,
                    pointerEvents: "none",
                    transition: "opacity 0.18s ease",
                  }}
                >
                  {point.label[language]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {modal}
    </>
  );
}
