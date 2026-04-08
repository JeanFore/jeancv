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
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncViewport = () => {
      const mobileNow = window.innerWidth <= 768;
      setIsMobile(mobileNow);
      if (!mobileNow) {
        setIsMenuOpen(false);
      }
    };

    syncViewport();
    window.addEventListener('resize', syncViewport);

    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  const activeColor = SECTION_COLORS[activeSection];
  const activeLabel = navItems.find((item) => item.id === activeSection)?.label ?? navItems[0].label;

  const renderNavLink = (item: { id: NavSectionId; label: string }) => {
    const isActive = activeSection === item.id;

    return (
      <a
        key={item.id}
        href={`#${item.id}`}
        className="nav-link"
        aria-current={isActive ? 'page' : undefined}
        onClick={() => {
          setActiveSection(item.id);
          setIsMenuOpen(false);
        }}
        style={{
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
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar glass ${isMobile ? 'navbar--mobile' : ''}`}
      style={{
        borderColor: hexToRgba(activeColor, 0.45),
        background: `linear-gradient(135deg, ${hexToRgba(activeColor, 0.14)}, rgba(15, 23, 42, 0.78))`,
        boxShadow: `0 8px 24px ${hexToRgba(activeColor, 0.18)}`,
      }}
    >
      <div className="navbar-main-row">
        {isMobile ? (
          <button
            type="button"
            className={`navbar-menu-btn ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen((previous) => !previous)}
            style={{
              border: `1px solid ${hexToRgba(activeColor, 0.35)}`,
              background: hexToRgba(activeColor, 0.12),
            }}
            aria-expanded={isMenuOpen}
            aria-label={language === 'es' ? 'Abrir menu' : 'Open menu'}
          >
            <span className="navbar-menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        ) : null}

        <div className="navbar-links">
          {isMobile ? (
            <span className="navbar-active-chip" style={{ borderColor: hexToRgba(activeColor, 0.45), color: '#f8fafc' }}>
              {activeLabel}
            </span>
          ) : (
            navItems.map((item) => renderNavLink(item))
          )}
        </div>

        <div className="navbar-controls">
          <div className="navbar-divider" />

          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="navbar-lang-btn"
            style={{
              background: hexToRgba(activeColor, 0.12),
              border: `1px solid ${hexToRgba(activeColor, 0.36)}`,
              color: activeColor,
            }}
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
      </div>

      {isMobile && isMenuOpen ? <div className="navbar-mobile-panel">{navItems.map((item) => renderNavLink(item))}</div> : null}
    </motion.nav>
  );
};


export default Navbar;
