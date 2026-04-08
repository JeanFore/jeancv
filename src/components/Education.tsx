import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useMotionValue, animate } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const FloatingCard = ({
  edu,
  color,
  glow,
  t,
  isMobile,
}: {
  edu: any;
  color: string;
  glow: string;
  t: any;
  isMobile: boolean;
}) => {
  return (
    <motion.div 
      className="glass-static"
      data-edu-card="true"
      style={{ 
        width: isMobile ? 'min(90vw, 360px)' : '500px',
        maxWidth: isMobile ? '90vw' : '500px',
        minHeight: isMobile ? '300px' : '400px',
        height: 'auto',
        padding: isMobile ? '1.2rem 1.05rem' : '3rem 2.5rem',
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative', 
        background: isMobile ? 'linear-gradient(155deg, rgba(2, 6, 23, 0.93), rgba(15, 23, 42, 0.9))' : 'var(--card-bg)',
        borderRadius: isMobile ? '18px' : '24px',
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
            width: isMobile ? '40px' : '45px', 
            height: isMobile ? '40px' : '45px', 
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
          <GraduationCap size={isMobile ? 20 : 22} color={color} />
        </div>
        
        <div style={{ flex: 1 }}>
          <p style={{ color, fontWeight: 700, fontSize: isMobile ? '0.76rem' : '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
            {edu.year}
          </p>
          <p style={{ fontSize: isMobile ? '0.9rem' : '1rem', color: 'var(--fg-secondary)', lineHeight: 1.32, fontWeight: 500, letterSpacing: '0.01em' }}>
            {edu.institution}
          </p>
        </div>
      </div>
      
      <div style={{ position: 'relative', zIndex: 1, flex: 1, paddingLeft: isMobile ? '0.7rem' : '1rem', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ fontSize: isMobile ? '1.06rem' : '1.25rem', lineHeight: isMobile ? 1.35 : 1.5, marginBottom: isMobile ? '1.2rem' : '2rem', color: 'var(--fg)', fontWeight: 600 }}>
          {edu.degree}
        </h3>
        
        <div>
          <p style={{ fontSize: isMobile ? '0.68rem' : '0.75rem', color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.7rem', fontWeight: 600 }}>{t('aptitudes')}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '0.42rem' : '0.5rem' }}>
            {edu.focus.map((f: string) => (
              <span 
                key={f} 
                style={{ 
                  fontSize: isMobile ? '0.74rem' : '0.8rem', 
                  padding: isMobile ? '0.24rem 0.62rem' : '0.3rem 0.8rem', 
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileStep, setMobileStep] = useState(0);
  const [desktopStep, setDesktopStep] = useState(0);
  const [mobileCenterOffset, setMobileCenterOffset] = useState(0);
  const baseX = useMotionValue(0);
  const shiftAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  const [contentWidth, setContentWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncViewport = () => setIsMobile(window.innerWidth <= 768);
    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  useEffect(() => {
    const updateMeasurements = () => {
      if (!measureRef.current) return;

      setContentWidth(measureRef.current.offsetWidth);
      const firstCard = measureRef.current.querySelector<HTMLElement>('[data-edu-card="true"]');
      if (!firstCard) return;

      const trackStyle = window.getComputedStyle(measureRef.current);
      const gap = Number.parseFloat(trackStyle.gap || '16') || 16;
      const nextStep = firstCard.offsetWidth + gap;

      if (isMobile) {
        const viewportWidth = viewportRef.current?.offsetWidth ?? window.innerWidth;
        setMobileStep(nextStep);
        setMobileCenterOffset(Math.max(0, (viewportWidth - firstCard.offsetWidth) / 2));
      } else {
        setDesktopStep(nextStep);
        setMobileCenterOffset(0);
      }
    };

    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);

    return () => window.removeEventListener('resize', updateMeasurements);
  }, [data.education, isMobile]);

  useEffect(() => {
    return () => {
      shiftAnimationRef.current?.stop();
    };
  }, []);

  const x = useTransform(() => {
    if (contentWidth === 0) return "0px";
    
    // Core wrapping math block: keeps translation seamlessly trapped from 0 to Content Width
    let unwrapped = baseX.get();
    let wrapped = ((unwrapped % contentWidth) + contentWidth) % contentWidth;
    const aligned = isMobile ? mobileCenterOffset - wrapped : -wrapped;
    return `${aligned}px`;
  });

  const generateCards = (isMeasured: boolean) => (
    <div 
      ref={isMeasured ? measureRef : null}
      style={{ display: 'flex', gap: isMobile ? '1rem' : '3rem', paddingRight: isMobile ? '1rem' : '3rem', flexShrink: 0 }}
    >
      {data.education.map((edu, i) => {
        const color = i % 2 === 0 ? 'var(--accent-dev)' : 'var(--accent-admin)';
        const glow = i % 2 === 0 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)';
        return <FloatingCard key={i} edu={edu} color={color} glow={glow} t={t} isMobile={isMobile} />
      })}
    </div>
  );

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
    color: 'var(--fg)',
    outline: 'none',
    userSelect: 'none' as const,
    WebkitTapHighlightColor: 'transparent',
  };

  const shiftCards = (side: 'left' | 'right') => {
    if (contentWidth <= 0) return;

    const mobileFallback = Math.min(window.innerWidth * 0.9, 360) + 16;
    const desktopFallback = 500 + 48;
    const step = isMobile
      ? (mobileStep > 0 ? mobileStep : mobileFallback)
      : (desktopStep > 0 ? desktopStep : desktopFallback);
    const direction = side === 'right' ? 1 : -1;
    const target = baseX.get() + direction * step;

    shiftAnimationRef.current?.stop();
    shiftAnimationRef.current = animate(baseX, target, {
      duration: isMobile ? 0.35 : 0.42,
      ease: [0.22, 1, 0.36, 1],
    });
  };

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
      <div className="container skills-head" style={{ marginBottom: isMobile ? '2.25rem' : '4rem', textAlign: 'center' }}>
        <motion.h2 
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="section-title"
        >
          {t('education')}
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
          {t('educationSubtitle')}
        </p>
      </div>

      {/* Floating Canvas */}
      <div ref={viewportRef} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 15 }}>
          <div
            onClick={(event) => {
              event.preventDefault();
              shiftCards('left');
            }}
            onContextMenu={(event) => event.preventDefault()}
            onPointerDown={(event) => {
              if (isMobile) event.preventDefault();
            }}
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
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    outline: 'none',
                    borderRadius: '999px',
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
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    outline: 'none',
                    borderRadius: '999px',
                  }
            }
          >
            <div
              style={hoverBtnStyle}
              onMouseOver={(e) => {
                if (isMobile) return;
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = 'var(--accent-dev)';
                e.currentTarget.style.borderColor = 'var(--accent-dev)';
                e.currentTarget.style.boxShadow = '0 10px 40px var(--accent-dev-glow), inset 0 0 20px rgba(255,255,255,0.4)';
              }}
              onMouseOut={(e) => {
                if (isMobile) return;
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
            onClick={(event) => {
              event.preventDefault();
              shiftCards('right');
            }}
            onContextMenu={(event) => event.preventDefault()}
            onPointerDown={(event) => {
              if (isMobile) event.preventDefault();
            }}
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
                    cursor: 'pointer',
                    touchAction: 'none',
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    outline: 'none',
                    borderRadius: '999px',
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
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    outline: 'none',
                    borderRadius: '999px',
                  }
            }
          >
            <div
              style={hoverBtnStyle}
              onMouseOver={(e) => {
                if (isMobile) return;
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = 'var(--accent-admin)';
                e.currentTarget.style.borderColor = 'var(--accent-admin)';
                e.currentTarget.style.boxShadow = '0 10px 40px var(--accent-admin-glow), inset 0 0 20px rgba(255,255,255,0.4)';
              }}
              onMouseOut={(e) => {
                if (isMobile) return;
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

        <div style={{ display: 'flex', width: 'max-content', padding: isMobile ? '2.4rem 0 3.1rem' : '6rem 0' }}>
          <motion.div 
            style={{ x, display: 'flex', flexShrink: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {generateCards(true)}
            {generateCards(false)}
            {generateCards(false)}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Education;
