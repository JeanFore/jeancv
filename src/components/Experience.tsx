import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Briefcase, Code, Network } from 'lucide-react';

const TimelineItem: React.FC<{ xp: any; index: number }> = ({ xp, index }) => {
  const isEven = index % 2 === 0;
  
  // Parallax ref for individual items
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  const { scrollYProgress: ignitionProgress } = useScroll({
    target: itemRef,
    offset: ["start 65%", "start 45%"] // Ignites as item reaches the middle where the beam is
  });

  // Calculate subtle upward movement as it scrolls into view
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);
  const circleOpacity = useTransform(ignitionProgress, [0, 1], [0.15, 1]);
  
  // Determine color and icon based on type
  const isTech = xp.type === 'tech';
  const isMixed = xp.type === 'mixed';
  const color = isTech ? 'var(--accent-dev)' : isMixed ? '#10b981' : 'var(--accent-admin)';
  const glow = isTech ? 'var(--accent-dev-glow)' : isMixed ? 'rgba(16, 185, 129, 0.4)' : 'var(--accent-admin-glow)';
  const bgSoft = isTech ? 'rgba(59, 130, 246, 0.05)' : isMixed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(245, 158, 11, 0.05)';
  
  const Icon = isTech ? Code : isMixed ? Network : Briefcase;

  return (
    <div 
      ref={itemRef}
      className={`timeline-item ${isEven ? 'left' : 'right'}`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '4rem',
        flexDirection: isEven ? 'row-reverse' : 'row',
        position: 'relative'
      }}
    >
      {/* Empty space for the opposite side of the timeline */}
      <div className="timeline-spacer" style={{ width: '45%' }} />

      {/* Central Marker */}
      <motion.div 
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          background: `linear-gradient(135deg, ${bgSoft}, var(--bg))`, 
          border: `2px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          boxShadow: `0 0 35px ${glow}, inset 0 0 25px ${glow}`,
          flexShrink: 0,
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          opacity: circleOpacity
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
         <Icon size={26} color={color} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      </motion.div>

      {/* Content Card with Parallax */}
      <motion.div 
        style={{ 
          width: '45%', 
          y,
          opacity
        }}
        className="timeline-content"
      >
        <div 
          className="glass experience-card" 
          style={{ 
            padding: '2.5rem', 
            position: 'relative',
            borderTop: `4px solid ${color}`,
            background: `linear-gradient(135deg, ${bgSoft}, var(--experience-card-bg-strong, rgba(17, 24, 39, 0.9)))`,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = `0 15px 30px rgba(0,0,0,0.4), 0 0 20px ${glow}`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '';
          }}
        >
          {/* Subtle background glow inside the card */}
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: glow, filter: 'blur(60px)', borderRadius: '50%', opacity: 0.3, pointerEvents: 'none' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem', position: 'relative', zIndex: 1 }}>
            <div>
              <h4 style={{ fontSize: '1.4rem', color: 'var(--fg)', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>{xp.title}</h4>
              <p style={{ color, fontSize: '1.05rem', fontWeight: 600 }}>{xp.company}</p>
            </div>
            <span style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '2rem', fontSize: '0.85rem', color: 'var(--fg-secondary)', border: '1px solid var(--border)', fontWeight: 500 }}>
              {xp.period}
            </span>
          </div>

          <p style={{ marginBottom: '1.5rem', color: 'var(--fg-secondary)', fontSize: '1.05rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
            {xp.description}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', position: 'relative', zIndex: 1 }}>
            {xp.achievements.map((ach: string, i: number) => (
              <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--fg-secondary)', fontSize: '0.95rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color }}>▹</span> {ach}
              </li>
            ))}
          </ul>
          
          {xp.stack && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', position: 'relative', zIndex: 1 }}>
              {xp.stack.map((tech: string) => (
                 <span 
                   key={tech} 
                   style={{ 
                     color, 
                     fontSize: '0.85rem', 
                     fontWeight: 600, 
                     letterSpacing: '0.05em',
                     background: 'rgba(255,255,255,0.03)',
                     padding: '0.3rem 0.8rem',
                     borderRadius: '6px',
                     border: '1px solid rgba(255,255,255,0.05)'
                   }}
                 >
                   {tech}
                 </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Experience: React.FC = () => {
  const { data, t } = useLanguage();
  const containerRef = useRef(null);

  // Track the scroll progress of the entire timeline section to animate the central line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="container" style={{ padding: '8rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
          style={{ marginBottom: '1rem' }}
        >
          {t('navExperience')}
        </motion.h2>
        <p style={{ color: 'var(--fg-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Una trayectoria híbrida que abarca liderazgo técnico, gestión financiera y desarrollo de software escalable.
        </p>
      </div>
      
      <div ref={containerRef} className="timeline-container" style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Base Timeline Line (Dim) */}
        <div 
          className="timeline-line"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '4px',
            background: 'var(--border)',
            transform: 'translateX(-50%)',
            zIndex: 1
          }}
        />

        {/* Animated Loading Foreground Line (Gradient) */}
        <motion.div 
          className="timeline-line"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            height: lineHeight,
            width: '6px',
            borderRadius: '10px',
            background: 'linear-gradient(to bottom, var(--accent-dev), var(--accent-admin), #10b981)',
            transform: 'translateX(-50%)',
            zIndex: 2,
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(245, 158, 11, 0.8)'
          }}
        />

        {data.experience.map((xp, index) => (
          <TimelineItem key={index} xp={xp} index={index} />
        ))}
        
      </div>
    </section>
  );
};

export default Experience;
