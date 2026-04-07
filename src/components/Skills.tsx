import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const Skills: React.FC = () => {
  const { data, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Fast moving
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  // Fast moving opposite direction
  const x2 = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
  // Slower moving
  const x3 = useTransform(scrollYProgress, [0, 1], ["-10%", "-50%"]);

  // Group items into specific lanes to ensure they are long enough for parallax
  // We duplicate the arrays to ensure the screen is filled during translation
  const devRow = [...data.skills.frontend, ...data.skills.backend, ...data.skills.frontend, ...data.skills.backend];
  const adminRow = [...data.skills.admin, ...data.skills.admin, ...data.skills.admin, ...data.skills.admin];
  const cloudRow = [...data.skills.cloud, ...data.skills.cloud, ...data.skills.cloud, ...data.skills.cloud];

  const ParallaxRow = ({ items, x, color }: { items: string[], x: any, color: string }) => (
    <motion.div 
      style={{ x, display: 'flex', gap: '2rem', whiteSpace: 'nowrap', width: 'fit-content', padding: '1.5rem 0' }}
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
            border: `1px solid ${color}40`, // 40 is hex for 25% opacity
            borderRadius: '100px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}` }} />
          {item}
        </span>
      ))}
    </motion.div>
  );

  return (
    <section ref={containerRef} id="skills" style={{ padding: '8rem 0', overflow: 'hidden' }}>
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
          Un conjunto híbrido de habilidades que fusionan la ingeniería de software moderna con el liderazgo administrativo estratégico.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
           <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2 }} />
           <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 2 }} />
           <ParallaxRow items={devRow} x={x1} color="var(--accent-dev)" />
        </div>
        
        <div style={{ position: 'relative' }}>
           <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2 }} />
           <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 2 }} />
           <ParallaxRow items={adminRow} x={x2} color="var(--accent-admin)" />
        </div>

        <div style={{ position: 'relative' }}>
           <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2 }} />
           <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 2 }} />
           <ParallaxRow items={cloudRow} x={x3} color="#10b981" /> {/* Emerald color for cloud */}
        </div>
      </div>
    </section>
  );
};

export default Skills;
