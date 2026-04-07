import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Code2, Briefcase, MapPin, Target } from 'lucide-react';

const About: React.FC = () => {
  const { data, t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="container" style={{ padding: '8rem 0' }}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        {t('professionalNarrative')}
      </motion.h2>
      
      {/* Bento Grid Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bento-grid"
      >
        {/* Developer Box - Spans 8 columns on large screens */}
        <motion.div variants={itemVariants} className="glass bento-span-8" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.05, transform: 'rotate(15deg)' }}>
            <Code2 size={240} color="var(--accent-dev)" />
          </div>
          <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <Code2 size={24} color="var(--accent-dev)" />
            </div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--fg)', marginBottom: '1rem', fontWeight: 800 }}>
              {t('theDeveloper')}
            </h3>
            <p style={{ color: 'var(--fg-secondary)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '90%' }}>
              {t('devDescription')}
            </p>
          </div>
        </motion.div>

        {/* Administrator Box - Spans 4 columns */}
        <motion.div variants={itemVariants} className="glass bento-span-4" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.05, transform: 'rotate(-15deg)' }}>
            <Briefcase size={200} color="var(--accent-admin)" />
          </div>
          <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <Briefcase size={24} color="var(--accent-admin)" />
            </div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--fg)', marginBottom: '1rem', fontWeight: 800 }}>
              {t('theAdministrator')}
            </h3>
            <p style={{ color: 'var(--fg-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              {t('adminDescription')}
            </p>
          </div>
        </motion.div>

        {/* Philosophy/Quote Box - Spans wider */}
        <motion.div variants={itemVariants} className="glass bento-span-full" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))' }}>
           <p style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--fg)', lineHeight: 1.6, textAlign: 'center', maxWidth: '900px', margin: '0 auto', fontWeight: 300 }}>
            "{data.personal.about}"
           </p>
        </motion.div>

        {/* Info Boxes */}
        <div className="bento-span-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <motion.div variants={itemVariants} className="glass" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
             <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
               <MapPin size={24} color="var(--fg)" />
             </div>
             <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{t('location')}</span>
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--fg)', marginTop: '0.2rem' }}>{data.personal.location}</p>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
             <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
               <Target size={24} color="var(--accent-dev)" />
             </div>
             <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{t('status')}</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-dev)', marginTop: '0.2rem' }}>{t('statusValue')}</p>
             </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default About;
