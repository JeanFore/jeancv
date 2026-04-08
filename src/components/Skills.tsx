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
}> = ({ items, baseSpeed, panDirection, scrollMultiplier, color, scrollYProgress }) => {
  const [contentWidth, setContentWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const hoverOffset = useMotionValue(0);

  useEffect(() => {
    if (measureRef.current) {
      setContentWidth(measureRef.current.offsetWidth);
    }
  }, [items]);

  useAnimationFrame((time, delta) => {
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
      style={{ display: 'flex', gap: '2rem', paddingRight: '2rem', whiteSpace: 'nowrap', width: 'max-content', paddingBottom: '1.5rem', paddingTop: '1.5rem' }}
    >
      {items.map((item, index) => (
        <span 
          key={`${item}-${index}`}
          className="glass-static"
          style={{ 
            padding: '1rem 2.5rem', 
            fontSize: '1.2rem',
            fontWeight: 600,
            color: 'var(--fg)',
            border: `1px solid ${color}40`, 
            borderRadius: '100px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [panDirection, setPanDirection] = useState(0);

  // We duplicate the arrays to ensure a single copy is comfortably wider than full screens
  const devRow = [...data.skills.frontend, ...data.skills.backend, ...data.skills.frontend, ...data.skills.backend];
  const adminRow = [...data.skills.admin, ...data.skills.admin, ...data.skills.admin, ...data.skills.admin];
  const cloudRow = [...data.skills.cloud, ...data.skills.cloud, ...data.skills.cloud, ...data.skills.cloud];

  const hoverBtnStyle = {
    width: '60px',
    height: '60px',
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

  return (
    <section 
      ref={containerRef} 
      id="skills" 
      style={{ padding: '8rem 0', position: 'relative' }}
    >
      <div className="container" style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="section-title"
        >
          {t('coreSkills')}
        </motion.h2>
        <p style={{ color: 'var(--fg-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          {t('skillsSubtitle')}
        </p>
      </div>
      
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        
        {/* Active Hover Navigation Overlay */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, pointerEvents: 'none', zIndex: 20 }}>
          
          <div 
            onMouseEnter={() => setPanDirection(1)} 
            onMouseLeave={() => setPanDirection(0)}
            style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '15vw', minWidth: '80px', pointerEvents: 'auto', display: 'flex', alignItems: 'center', paddingLeft: '2vw', cursor: 'grab' }}
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
               <ChevronLeft size={32} />
             </div>
          </div>

          <div 
            onMouseEnter={() => setPanDirection(-1)} 
            onMouseLeave={() => setPanDirection(0)}
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '15vw', minWidth: '80px', pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '2vw', cursor: 'grab' }}
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
               <ChevronRight size={32} />
             </div>
          </div>
        </div>

        {/* Endless Scroll Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', pointerEvents: 'none' }}>
          
          <div style={{ position: 'relative' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '200px', background: 'linear-gradient(to right, var(--bg) 20%, transparent)', zIndex: 2 }} />
             <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '200px', background: 'linear-gradient(to left, var(--bg) 20%, transparent)', zIndex: 2 }} />
             <InfiniteMarquee 
                items={devRow} 
                baseSpeed={0.3} 
                panDirection={panDirection} 
                scrollMultiplier={-600} 
                color="var(--accent-dev)" 
                scrollYProgress={scrollYProgress} 
             />
          </div>
          
          <div style={{ position: 'relative' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '200px', background: 'linear-gradient(to right, var(--bg) 20%, transparent)', zIndex: 2 }} />
             <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '200px', background: 'linear-gradient(to left, var(--bg) 20%, transparent)', zIndex: 2 }} />
             <InfiniteMarquee 
                items={adminRow} 
                baseSpeed={-0.2} 
                panDirection={panDirection} 
                scrollMultiplier={600} 
                color="var(--accent-admin)" 
                scrollYProgress={scrollYProgress} 
             />
          </div>

          <div style={{ position: 'relative' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '200px', background: 'linear-gradient(to right, var(--bg) 20%, transparent)', zIndex: 2 }} />
             <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '200px', background: 'linear-gradient(to left, var(--bg) 20%, transparent)', zIndex: 2 }} />
             <InfiniteMarquee 
                items={cloudRow} 
                baseSpeed={0.4} 
                panDirection={panDirection} 
                scrollMultiplier={-800} 
                color="#10b981" 
                scrollYProgress={scrollYProgress} 
             />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
