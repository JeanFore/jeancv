import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

type NavSectionId = 'hero' | 'about' | 'skills' | 'experience' | 'education' | 'contact';

const SECTION_COLORS: Record<NavSectionId, string> = {
  hero: '#60a5fa',
  about: '#22c55e',
  skills: '#38bdf8',
  experience: '#f59e0b',
  education: '#f97316',
  contact: '#14b8a6',
};

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  const expanded =
    normalized.length === 3 ? normalized.split('').map((char) => char + char).join('') : normalized;
  const r = Number.parseInt(expanded.slice(0, 2), 16);
  const g = Number.parseInt(expanded.slice(2, 4), 16);
  const b = Number.parseInt(expanded.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<NavSectionId>('hero');

  const navItems = useMemo(
    () => [
      { id: 'hero' as const, label: language === 'en' ? 'Home' : 'Inicio' },
      { id: 'about' as const, label: t('navAbout') },
      { id: 'skills' as const, label: t('navSkills') },
      { id: 'experience' as const, label: t('navExperience') },
      { id: 'education' as const, label: t('navEducation') },
      { id: 'contact' as const, label: t('navContact') },
    ],
    [language, t],
  );

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    let ticking = false;

    const computeActiveSection = () => {
      const probe = window.scrollY + window.innerHeight * 0.42;
      let current: NavSectionId = sectionIds[0];

      for (const sectionId of sectionIds) {
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) continue;

        if (sectionElement.offsetTop <= probe) {
          current = sectionId;
        }
      }

      setActiveSection(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(computeActiveSection);
      }
    };

    computeActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [navItems]);

  const activeColor = SECTION_COLORS[activeSection];

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
        alignItems: 'center',
        borderColor: hexToRgba(activeColor, 0.45),
        background: `linear-gradient(135deg, ${hexToRgba(activeColor, 0.14)}, rgba(15, 23, 42, 0.78))`,
        boxShadow: `0 8px 24px ${hexToRgba(activeColor, 0.18)}`,
      }}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="nav-link"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => setActiveSection(item.id)}
            style={{
              fontSize: '0.9rem',
              padding: '0.32rem 0.62rem',
              borderRadius: '999px',
              transition: 'all 0.2s ease',
              color: isActive ? '#f8fafc' : 'rgba(226, 232, 240, 0.88)',
              border: `1px solid ${isActive ? hexToRgba(activeColor, 0.62) : 'transparent'}`,
              background: isActive ? hexToRgba(activeColor, 0.22) : 'transparent',
              boxShadow: isActive ? `0 0 18px ${hexToRgba(activeColor, 0.2)}` : 'none',
              fontWeight: isActive ? 700 : 500,
            }}
          >
            {item.label}
          </a>
        );
      })}

      <div style={{ width: '1px', height: '1.5rem', background: 'var(--border)', margin: '0 0.5rem' }} />

      <button
        onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
        className="glass"
        style={{
          padding: '0.25rem 0.5rem',
          fontSize: '0.8rem',
          cursor: 'pointer',
          background: hexToRgba(activeColor, 0.12),
          border: '1px solid rgba(255,255,255,0.1)',
          color: activeColor,
        }}
      >
        {language === 'en' ? 'ES' : 'EN'}
      </button>
    </motion.nav>
  );
};


export default Navbar;
