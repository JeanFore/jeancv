import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const Hero: React.FC = () => {
  const { data, t } = useLanguage();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const yOffset = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow effects */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: '40vw', height: '40vw', background: 'var(--accent-dev-glow)', filter: 'blur(120px)', borderRadius: '50%', opacity: 0.3, mixBlendMode: 'screen' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '30vw', height: '30vw', background: 'var(--accent-admin-glow)', filter: 'blur(120px)', borderRadius: '50%', opacity: 0.2, mixBlendMode: 'screen' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hero-content"
        style={{ zIndex: 1, opacity, y: yOffset }}
      >
        {/* Profile Image - LinkedIn Premium Style */}
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
           className="hero-profile-wrap"
           style={{ marginBottom: '2.5rem', position: 'relative' }}
        >
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            padding: '4px',
            background: 'linear-gradient(135deg, var(--accent-dev) 0%, transparent 50%, var(--accent-admin) 100%)',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.2), inset 0 0 20px rgba(0,0,0,0.5)',
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Original Photo */}
              <img 
                src={data.personal.image} 
                alt={data.personal.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '6px solid var(--bg)',
                  backgroundColor: 'var(--bg-secondary)',
                  boxSizing: 'border-box'
                }}
              />
              {/* New Photo Crossfade */}
              <motion.img 
                src="/JeanDev.png" 
                alt={`${data.personal.name} Alternative`}
                animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                transition={{ 
                  duration: 16, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  times: [0, 0.125, 0.375, 0.625, 0.875, 1] 
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '6px solid var(--bg)',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
          {/* Active Status Ring */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            style={{
              position: 'absolute',
              bottom: '18px',
              right: '18px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#10b981',
              border: '4px solid var(--bg)',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)'
            }} 
          />
        </motion.div>

        <h1 className="hero-name" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '0.5rem', color: 'var(--fg)', letterSpacing: '-0.03em', fontWeight: 900 }}>
          {data.personal.name}
        </h1>
        <h2 className="hero-title" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'transparent', backgroundImage: 'linear-gradient(90deg, var(--accent-dev), var(--accent-admin))', WebkitBackgroundClip: 'text', backgroundClip: 'text', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.02em' }}>
          {data.personal.title}
        </h2>
        <p className="hero-subtitle" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--fg-secondary)', maxWidth: '650px', margin: '0 auto', opacity: 0.8, lineHeight: 1.7, fontWeight: 300 }}>
          {data.personal.subtitle}
        </p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hero-cta-wrap"
          style={{ marginTop: '3rem' }}
        >
          <a href="#about" className="hero-cta" style={{ 
            padding: '1rem 2.5rem', 
            background: 'var(--fg)', 
            color: 'var(--bg)', 
            borderRadius: '2rem', 
            fontSize: '1rem', 
            fontWeight: 700, 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase',
            boxShadow: '0 10px 25px rgba(255,255,255,0.1)',
            display: 'inline-block',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {t('exploreProfile')}
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}
      >
        <div style={{ width: '2px', height: '80px', background: 'linear-gradient(to bottom, var(--fg-secondary), transparent)', borderRadius: '2px' }} />
      </motion.div>
    </section>
  );
};



export default Hero;
