import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { GraduationCap } from 'lucide-react';

const FloatingCard = ({ edu, index, color, glow, t }: { edu: any, index: number, color: string, glow: string, t: any }) => {
  const y = useMotionValue(0);
  
  // Deterministic seed so copies of the card move in identical sync, preventing visual splits on wrap
  const seed = index * 2.5;

  useAnimationFrame((time) => {
    // Slower, organic breathing wobble (Math.sin)
    const wobble = Math.sin(time / 1200 + seed) * 18;
    y.set(wobble);
  });

  return (
    <motion.div 
      className="glass-static"
      style={{ 
        y, 
        width: '500px',
        minHeight: '400px', // Prevent text from collapsing layout
        height: 'auto',
        padding: '3rem 2.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative', 
        background: 'var(--card-bg)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: `1px solid ${color}40`,
        boxShadow: `0 20px 40px rgba(0,0,0,0.4), inset 0 0 30px ${color}10`,
        flexShrink: 0  // Critical for scroll continuity
      }}
    >
      {/* Soft overarching glow */}
      <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '70%', height: '70%', background: `radial-gradient(circle, ${color}20 0%, transparent 60%)`, zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div 
          style={{ 
            width: '45px', 
            height: '45px', 
            borderRadius: '12px', 
            background: `linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(0, 0, 0, 0.5))`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexShrink: 0,
            border: `1px solid ${color}60`,
            boxShadow: `0 0 15px ${glow}`
          }}
        >
          <GraduationCap size={22} color={color} />
        </div>
        
        <div style={{ flex: 1 }}>
          <p style={{ color, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
            {edu.year}
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--fg-secondary)', lineHeight: 1.4, fontWeight: 500, letterSpacing: '0.02em' }}>
            {edu.institution}
          </p>
        </div>
      </div>
      
      <div style={{ position: 'relative', zIndex: 1, flex: 1, paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ fontSize: '1.25rem', lineHeight: 1.5, marginBottom: '2rem', color: 'var(--fg)', fontWeight: 600 }}>
          {edu.degree}
        </h3>
        
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', fontWeight: 600 }}>{t('aptitudes')}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {edu.focus.map((f: string) => (
              <span 
                key={f} 
                style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.3rem 0.8rem', 
                  background: 'rgba(255,255,255,0.03)', 
                  border: `1px solid ${color}30`, 
                  borderRadius: '4px', 
                  color: 'var(--fg-secondary)',
                  fontWeight: 500
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const Education: React.FC = () => {
  const { data, t } = useLanguage();
  
  const baseVelocity = -1; // pixels moved independently per frame
  const baseX = useMotionValue(0);
  
  // Track continuous global scroll inertia
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const [contentWidth, setContentWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      setContentWidth(measureRef.current.offsetWidth);
    }
  }, [data.education]);

  useAnimationFrame((time, delta) => {
    if (contentWidth > 0) {
      let moveBy = baseVelocity * (delta / 16);
      
      // Inject scroll friction/inertia into the mathematical movement algorithm
      const v = velocityFactor.get();
      if (v !== 0) {
        moveBy += v * 2; 
      }
      
      baseX.set(baseX.get() + moveBy);
    }
  });

  const x = useTransform(() => {
    if (contentWidth === 0) return "0px";
    
    // Core wrapping math block: keeps translation seamlessly trapped from 0 to Content Width
    let unwrapped = baseX.get();
    let wrapped = ((unwrapped % contentWidth) + contentWidth) % contentWidth;
    return `-${wrapped}px`;
  });

  const generateCards = (isMeasured: boolean) => (
    <div 
      ref={isMeasured ? measureRef : null}
      style={{ display: 'flex', gap: '3rem', paddingRight: '3rem', flexShrink: 0 }}
    >
      {data.education.map((edu, i) => {
        const color = i % 2 === 0 ? 'var(--accent-dev)' : 'var(--accent-admin)';
        const glow = i % 2 === 0 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)';
        return <FloatingCard key={i} edu={edu} index={i} color={color} glow={glow} t={t} />
      })}
    </div>
  );

  return (
    <section 
      id="education" 
      style={{ 
        padding: '8rem 0', 
        overflow: 'hidden',
        position: 'relative',
        background: 'transparent'
      }}
    >
      <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <motion.h2 
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="section-title"
           style={{ marginBottom: '1rem' }}
        >
          {t('education')}
        </motion.h2>
        <p style={{ color: 'var(--fg-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          {t('educationSubtitle')}
        </p>
      </div>

      {/* Floating Canvas */}
      <div style={{ display: 'flex', width: 'max-content', padding: '6rem 0' }}>
        <motion.div 
          style={{ x, display: 'flex', flexShrink: 0 }}
          // A bit of opacity fade at the edges for an aesthetic "depth" field constraint
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* We render exactly 3 copies. Since one copy spans roughly 2200px, rendering 3 guarantees that an infinite seamless cycle looks flawless on any wide-screen standard orientation without visual tear */}
          {generateCards(true)}
          {generateCards(false)}
          {generateCards(false)}
        </motion.div>
      </div>

    </section>
  );
};

export default Education;
