import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { GraduationCap } from 'lucide-react';

const Education: React.FC = () => {
  const { data, t } = useLanguage();

  return (
    <section id="education" className="container" style={{ padding: '8rem 0' }}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        {t('education')}
      </motion.h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {data.education.map((edu, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="glass"
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}
          >
            {/* Subtle background icon */}
            <div style={{ position: 'absolute', right: '-10%', bottom: '-10%', opacity: 0.03, transform: 'rotate(-15deg)' }}>
               <GraduationCap size={150} color="var(--fg)" />
            </div>

            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
              <GraduationCap size={24} color="var(--accent-dev)" />
            </div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem', color: 'var(--fg)', fontWeight: 700 }}>{edu.degree}</h3>
              <p style={{ color: 'var(--accent-dev)', fontWeight: 600 }}>{edu.institution}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--fg-secondary)', marginTop: '0.5rem' }}>{edu.year === 'Completed' ? t('completed') : edu.year}</p>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
              {edu.focus.map((f) => (
                <span key={f} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '1rem', color: 'var(--fg-secondary)' }}>
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


export default Education;
