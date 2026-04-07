import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="navbar glass"
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'max-content',
        padding: '0.75rem 2rem',
        zIndex: 1000,
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}
    >
      <a href="#hero" className="nav-link" style={{ fontSize: '0.9rem' }}>{language === 'en' ? 'Home' : 'Inicio'}</a>
      <a href="#about" className="nav-link" style={{ fontSize: '0.9rem' }}>{t('navAbout')}</a>
      <a href="#skills" className="nav-link" style={{ fontSize: '0.9rem' }}>{t('navSkills')}</a>
      <a href="#experience" className="nav-link" style={{ fontSize: '0.9rem' }}>{t('navExperience')}</a>
      <a href="#education" className="nav-link" style={{ fontSize: '0.9rem' }}>{t('navEducation')}</a>
      
      <div style={{ width: '1px', height: '1.5rem', background: 'var(--border)', margin: '0 0.5rem' }} />
      
      <button 
        onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
        className="glass"
        style={{ 
          padding: '0.25rem 0.5rem', 
          fontSize: '0.8rem', 
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--accent-dev)'
        }}
      >
        {language === 'en' ? 'ES' : 'EN'}
      </button>
    </motion.nav>
  );
};


export default Navbar;
