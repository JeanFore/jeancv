import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useAnimationFrame } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InfiniteMarquee: React.FC<{
  items: string[];
  baseSpeed: number;
  panDirection: number;
  scrollMultiplier: number;
  color: string;
  scrollYProgress: any;
  isMobile: boolean;
}> = ({ items, baseSpeed, panDirection, scrollMultiplier, color, scrollYProgress, isMobile }) => {
  const [contentWidth, setContentWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const hoverOffset = useMotionValue(0);

  useEffect(() => {
    if (measureRef.current) {
      setContentWidth(measureRef.current.offsetWidth);
    }
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (contentWidth > 0 && panDirection !== 0) {
      hoverOffset.set(hoverOffset.get() + panDirection * baseSpeed * delta);
    }
  });

  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, scrollMultiplier]);

  const x = useTransform(() => {
    if (contentWidth === 0) return "0px";
    
    // Combine manual hover panning with native scroll parallax
    const absoluteDisplacement = hoverOffset.get() + scrollOffset.get();
    
    // Math logic to perfectly wrap the displacement.
    // It yields a continuous value from 0 to contentWidth, seamlessly snapping back.
    const wrapped = ((absoluteDisplacement % contentWidth) + contentWidth) % contentWidth;
    
    return `-${wrapped}px`;
  });

  const generateItems = (isMeasured: boolean) => (
    <div 
      ref={isMeasured ? measureRef : null}
      style={{
        display: 'flex',
        gap: isMobile ? '0.9rem' : '2rem',
        paddingRight: isMobile ? '0.9rem' : '2rem',
        whiteSpace: 'nowrap',
        width: 'max-content',
        paddingBottom: isMobile ? '0.75rem' : '1.5rem',
        paddingTop: isMobile ? '0.75rem' : '1.5rem',
      }}
    >
      {items.map((item, index) => (
        <span 
          key={`${item}-${index}`}
          className="glass-static"
          style={{ 
            padding: isMobile ? '0.75rem 1.45rem' : '1rem 2.5rem',
            fontSize: isMobile ? '1.02rem' : '1.2rem',
            fontWeight: 600,
            color: 'var(--fg)',
            border: `1px solid ${color}40`, 
            borderRadius: '100px',
            boxShadow: isMobile ? '0 2px 12px rgba(0,0,0,0.22)' : '0 4px 20px rgba(0,0,0,0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s',
            cursor: 'default'
          }}
          onMouseOver={(e) => {
             e.currentTarget.style.transform = 'scale(1.05)';
             e.currentTarget.style.borderColor = color;
             e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5), 0 0 15px ${color}40`;
          }}
          onMouseOut={(e) => {
             e.currentTarget.style.transform = 'scale(1)';
             e.currentTarget.style.borderColor = `${color}40`;
             e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}` }} />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <motion.div style={{ x, display: 'flex', width: 'max-content', pointerEvents: 'auto' }}>
      {/* We render exactly 2 copies. The first dictates size, the second guarantees seamless visual wrapping when translating up to -100% */}
      {generateItems(true)}
      {generateItems(false)}
    </motion.div>
  );
};


const Skills: React.FC = () => {
  const { data, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const syncViewport = () => setIsMobile(window.innerWidth <= 768);
    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  const [panDirection, setPanDirection] = useState(0);

  // We duplicate the arrays to ensure a single copy is comfortably wider than full screens
  const devRow = [...data.skills.frontend, ...data.skills.backend, ...data.skills.frontend, ...data.skills.backend];
  const adminRow = [...data.skills.admin, ...data.skills.admin, ...data.skills.admin, ...data.skills.admin];
  const cloudRow = [...data.skills.cloud, ...data.skills.cloud, ...data.skills.cloud, ...data.skills.cloud];

  const hoverBtnStyle = {
    width: isMobile ? '52px' : '60px',
    height: isMobile ? '52px' : '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid var(--border)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)',
    transition: 'all 0.3s ease',
    color: 'var(--fg)'
  };

  const startPan = (direction: number) => setPanDirection(direction);
  const stopPan = () => setPanDirection(0);

  const devBaseSpeed = isMobile ? 0.085 : 0.3;
  const adminBaseSpeed = isMobile ? -0.075 : -0.2;
  const cloudBaseSpeed = isMobile ? 0.095 : 0.4;
  const devScrollMultiplier = isMobile ? -95 : -600;
  const adminScrollMultiplier = isMobile ? 95 : 600;
  const cloudScrollMultiplier = isMobile ? -120 : -800;

  return (
    <section 
      ref={containerRef} 
      id="skills" 
      className="skills-section"
      style={{ padding: isMobile ? '6.4rem 0' : '8rem 0', position: 'relative' }}
    >
      <div className="container skills-head" style={{ marginBottom: isMobile ? '2.25rem' : '4rem', textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="section-title"
        >
          {t('coreSkills')}
        </motion.h2>
        <p
          className="skills-subtitle"
          style={{
            color: 'var(--fg-secondary)',
            fontSize: isMobile ? '1.04rem' : '1.2rem',
            lineHeight: isMobile ? 1.35 : 1.55,
            maxWidth: isMobile ? '92%' : '600px',
            margin: '0 auto',
            padding: isMobile ? '0.6rem 0.8rem' : 0,
            borderRadius: isMobile ? '0.9rem' : 0,
            background: isMobile ? 'rgba(2, 6, 23, 0.4)' : 'transparent',
            border: isMobile ? '1px solid rgba(148, 163, 184, 0.16)' : 'none',
          }}
        >
          {t('skillsSubtitle')}
        </p>
      </div>
      
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, pointerEvents: 'none', zIndex: 20 }}>
          <div 
            onMouseEnter={() => !isMobile && startPan(1)} 
            onMouseLeave={stopPan}
            onTouchStart={(event) => {
              event.preventDefault();
              startPan(1);
            }}
            onTouchEnd={stopPan}
            onTouchCancel={stopPan}
            onPointerDown={() => startPan(1)}
            onPointerUp={stopPan}
            onPointerCancel={stopPan}
            style={
              isMobile
                ? {
                    position: 'absolute',
                    left: '0.45rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    touchAction: 'none',
                  }
                : {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '15vw',
                    minWidth: '80px',
                    pointerEvents: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '2vw',
                    cursor: 'grab',
                  }
            }
          >
             <div 
               style={hoverBtnStyle}
               onMouseOver={(e) => {
                 e.currentTarget.style.transform = 'scale(1.1)';
                 e.currentTarget.style.background = 'var(--accent-dev)';
                 e.currentTarget.style.borderColor = 'var(--accent-dev)';
                 e.currentTarget.style.boxShadow = '0 10px 40px var(--accent-dev-glow), inset 0 0 20px rgba(255,255,255,0.4)';
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.transform = 'scale(1)';
                 e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
                 e.currentTarget.style.borderColor = 'var(--border)';
                 e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)';
               }}
             >
               <ChevronLeft size={isMobile ? 28 : 32} />
             </div>
          </div>

          <div 
            onMouseEnter={() => !isMobile && startPan(-1)} 
            onMouseLeave={stopPan}
            onTouchStart={(event) => {
              event.preventDefault();
              startPan(-1);
            }}
            onTouchEnd={stopPan}
            onTouchCancel={stopPan}
            onPointerDown={() => startPan(-1)}
            onPointerUp={stopPan}
            onPointerCancel={stopPan}
            style={
              isMobile
                ? {
                    position: 'absolute',
                    right: '0.45rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    touchAction: 'none',
                  }
                : {
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '15vw',
                    minWidth: '80px',
                    pointerEvents: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '2vw',
                    cursor: 'grab',
                  }
            }
          >
             <div 
               style={hoverBtnStyle}
               onMouseOver={(e) => {
                 e.currentTarget.style.transform = 'scale(1.1)';
                 e.currentTarget.style.background = 'var(--accent-admin)';
                 e.currentTarget.style.borderColor = 'var(--accent-admin)';
                 e.currentTarget.style.boxShadow = '0 10px 40px var(--accent-admin-glow), inset 0 0 20px rgba(255,255,255,0.4)';
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.transform = 'scale(1)';
                 e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
                 e.currentTarget.style.borderColor = 'var(--border)';
                 e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)';
               }}
             >
               <ChevronRight size={isMobile ? 28 : 32} />
             </div>
          </div>
        </div>

        {/* Endless Scroll Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.35rem' : '1rem', pointerEvents: 'none' }}>
          
          <div style={{ position: 'relative' }}>
             {!isMobile && <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '200px', background: 'linear-gradient(to right, var(--bg) 20%, transparent)', zIndex: 2 }} />}
             {!isMobile && <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '200px', background: 'linear-gradient(to left, var(--bg) 20%, transparent)', zIndex: 2 }} />}
             <InfiniteMarquee 
                items={devRow} 
                baseSpeed={devBaseSpeed} 
                panDirection={panDirection} 
                scrollMultiplier={devScrollMultiplier} 
                color="var(--accent-dev)" 
                scrollYProgress={scrollYProgress} 
                isMobile={isMobile}
             />
          </div>
          
          <div style={{ position: 'relative' }}>
             {!isMobile && <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '200px', background: 'linear-gradient(to right, var(--bg) 20%, transparent)', zIndex: 2 }} />}
             {!isMobile && <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '200px', background: 'linear-gradient(to left, var(--bg) 20%, transparent)', zIndex: 2 }} />}
             <InfiniteMarquee 
                items={adminRow} 
                baseSpeed={adminBaseSpeed} 
                panDirection={panDirection} 
                scrollMultiplier={adminScrollMultiplier} 
                color="var(--accent-admin)" 
                scrollYProgress={scrollYProgress} 
                isMobile={isMobile}
             />
          </div>

          <div style={{ position: 'relative' }}>
             {!isMobile && <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '200px', background: 'linear-gradient(to right, var(--bg) 20%, transparent)', zIndex: 2 }} />}
             {!isMobile && <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '200px', background: 'linear-gradient(to left, var(--bg) 20%, transparent)', zIndex: 2 }} />}
             <InfiniteMarquee 
                items={cloudRow} 
                baseSpeed={cloudBaseSpeed} 
                panDirection={panDirection} 
                scrollMultiplier={cloudScrollMultiplier} 
                color="#10b981" 
                scrollYProgress={scrollYProgress} 
                isMobile={isMobile}
             />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
