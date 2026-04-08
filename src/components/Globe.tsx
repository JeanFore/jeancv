import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";

const MOVEMENT_DAMPING = 1400;
const AUTO_ROTATION_SPEED = 0.003;
const CDMX_LOCATION: [number, number] = [19.4326, -99.1332];

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 40,
    stiffness: 280,
    restDelta: 0.001,
  });

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
        theta: 0.25,
        dark: 0.25,
        diffuse: 1.35,
        mapSamples: 16000,
        mapBrightness: 4.8,
        mapBaseBrightness: 0.2,
        baseColor: [0.13, 0.3, 0.58],
        markerColor: [251 / 255, 100 / 255, 21 / 255],
        glowColor: [0.9, 0.94, 1],
        markerElevation: 0.03,
        markers: [
          { location: CDMX_LOCATION, size: 0.085 },
        ],
      });

      const animate = () => {
        if (!globe) return;

        if (pointerInteracting.current === null) {
          phiRef.current += AUTO_ROTATION_SPEED;
        }

        const pulse = 0.08 + Math.sin(Date.now() * 0.004) * 0.012;
        globe.update({
          phi: phiRef.current + rs.get(),
          width: widthRef.current * 2,
          height: widthRef.current * 2,
          markers: [{ location: CDMX_LOCATION, size: pulse }],
        });

        animationFrameId = window.requestAnimationFrame(animate);
      };

      animationFrameId = window.requestAnimationFrame(animate);

      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = "1";
      }, 100);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
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
  }, [rs]);

  return (
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
      <div ref={containerRef} style={{ width: "100%", maxWidth: "600px", aspectRatio: "1/1", position: "relative" }}>
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
          onPointerDown={(e) => {
            updatePointerInteraction(e.clientX);
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerUp={(e) => {
            updatePointerInteraction(null);
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
              e.currentTarget.releasePointerCapture(e.pointerId);
            }
          }}
          onPointerCancel={(e) => {
            updatePointerInteraction(null);
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
              e.currentTarget.releasePointerCapture(e.pointerId);
            }
          }}
          onPointerLeave={() => updatePointerInteraction(null)}
          onPointerMove={(e) => updateMovement(e.clientX)}
        />
      </div>
    </div>
  );
}
