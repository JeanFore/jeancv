import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Activity, Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  const { data, t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="experience" className="container" style={{ padding: '8rem 0' }}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        {t('navExperience')}
      </motion.h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem' }}>
        
        {/* Technical Experience */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ padding: '0.8rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: 'var(--accent-dev)' }}>
              <Activity size={28} />
            </div>
            <h3 style={{ color: 'var(--accent-dev)', fontSize: '1.8rem', fontWeight: 800 }}>{t('technicalExperience')}</h3>
          </div>
          
          <div style={{ borderLeft: '2px solid rgba(59, 130, 246, 0.2)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {data.technicalExperience.map((xp, i) => (
              <motion.div key={i} variants={itemVariants} style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <div style={{ position: 'absolute', left: '-2.4rem', top: '0.4rem', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--accent-dev)', boxShadow: '0 0 10px var(--accent-dev-glow)' }} />
                
                <div className="glass" style={{ padding: '2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.4rem', color: 'var(--fg)', fontWeight: 700, marginBottom: '0.3rem' }}>{xp.title}</h4>
                      <p style={{ color: 'var(--accent-dev)', fontSize: '1.1rem', fontWeight: 500 }}>{xp.company}</p>
                    </div>
                    <span style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '2rem', fontSize: '0.85rem', color: 'var(--fg-secondary)', border: '1px solid var(--border)' }}>
                      {xp.period}
                    </span>
                  </div>
                  <p style={{ marginBottom: '1.5rem', color: 'var(--fg-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>{xp.description}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    {xp.stack.map(tech => (
                       <span key={tech} style={{ color: 'var(--accent-dev)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>#{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Admin Experience */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ padding: '0.8rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', color: 'var(--accent-admin)' }}>
              <Briefcase size={28} />
            </div>
            <h3 style={{ color: 'var(--accent-admin)', fontSize: '1.8rem', fontWeight: 800 }}>{t('adminExperience')}</h3>
          </div>
          
          <div style={{ borderLeft: '2px solid rgba(245, 158, 11, 0.2)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {data.adminExperience.map((xp, i) => (
              <motion.div key={i} variants={itemVariants} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-2.4rem', top: '0.4rem', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--accent-admin)', boxShadow: '0 0 10px var(--accent-admin-glow)' }} />
                
                <div className="glass" style={{ padding: '2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.4rem', color: 'var(--fg)', fontWeight: 700, marginBottom: '0.3rem' }}>{xp.title}</h4>
                      <p style={{ color: 'var(--accent-admin)', fontSize: '1.1rem', fontWeight: 500 }}>{xp.company}</p>
                    </div>
                    <span style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '2rem', fontSize: '0.85rem', color: 'var(--fg-secondary)', border: '1px solid var(--border)' }}>
                      {xp.period}
                    </span>
                  </div>
                  <p style={{ color: 'var(--fg-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>{xp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};



export default Experience;
