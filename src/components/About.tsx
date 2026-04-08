import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import { useLanguage } from './LanguageContext';
import { Code2, Briefcase, MapPin, Target } from 'lucide-react';

const About: React.FC = () => {
  const { data, t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const normalizeMobileText = (text: string) =>
    text.replace(/\[SIGMA_LOGO\]/g, 'Sigma Trade').replace(/\s+/g, ' ').trim();

  const splitBalancedMobileNarrative = (text: string, maxParts: number, minCharsToSplit = 240) => {
    const normalized = normalizeMobileText(text);
    if (!normalized) return [];

    const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length <= 1) return [normalized];

    const shouldSplit = normalized.length > minCharsToSplit && maxParts > 1;
    const partCount = shouldSplit ? Math.max(2, Math.min(maxParts, sentences.length)) : 1;
    if (partCount === 1) return [normalized];

    const result: string[] = [];
    let cursor = 0;

    for (let partIndex = 0; partIndex < partCount; partIndex += 1) {
      const remainingParts = partCount - partIndex;
      const remainingSentences = sentences.slice(cursor);
      const remainingLength = remainingSentences.reduce((sum, sentence) => sum + sentence.length, 0);
      const targetLength = Math.max(80, Math.round(remainingLength / remainingParts));

      let chunk = '';
      while (cursor < sentences.length) {
        const nextSentence = sentences[cursor];
        const candidate = chunk ? `${chunk} ${nextSentence}` : nextSentence;
        const remainingAfterPick = sentences.length - (cursor + 1);
        const mustLeaveForOtherParts = remainingAfterPick >= remainingParts - 1;

        if (chunk && candidate.length > targetLength && mustLeaveForOtherParts) {
          break;
        }

        chunk = candidate;
        cursor += 1;

        if (chunk.length >= targetLength * 0.9 && mustLeaveForOtherParts) {
          break;
        }
      }

      if (!chunk && cursor < sentences.length) {
        chunk = sentences[cursor];
        cursor += 1;
      }

      if (chunk) {
        result.push(chunk);
      }
    }

    const compactResult = result.filter(Boolean);
    if (cursor < sentences.length && compactResult.length > 0) {
      compactResult[compactResult.length - 1] = `${compactResult[compactResult.length - 1]} ${sentences.slice(cursor).join(' ')}`.trim();
    }

    if (!shouldSplit || compactResult.length >= maxParts) {
      return compactResult;
    }

    // Ensure exact number of parts when requested by splitting the longest chunk.
    while (compactResult.length < maxParts) {
      let longestIndex = 0;
      for (let i = 1; i < compactResult.length; i += 1) {
        if (compactResult[i].length > compactResult[longestIndex].length) {
          longestIndex = i;
        }
      }

      const longestChunk = compactResult[longestIndex];
      const words = longestChunk.split(' ').filter(Boolean);
      if (words.length < 2) break;

      const middle = Math.floor(words.length / 2);
      const left = words.slice(0, middle).join(' ').trim();
      const right = words.slice(middle).join(' ').trim();
      if (!left || !right) break;

      compactResult.splice(longestIndex, 1, left, right);
    }

    return compactResult;
  };

  const splitEvenLengthMobileNarrative = (text: string, parts: number) => {
    const normalized = normalizeMobileText(text);
    if (!normalized) return [];
    if (parts <= 1 || normalized.length < 40) return [normalized];

    const chunks: string[] = [];
    const totalLength = normalized.length;
    let start = 0;

    for (let index = 0; index < parts - 1; index += 1) {
      const remainingParts = parts - index;
      const remainingLength = totalLength - start;
      const idealEnd = start + Math.round(remainingLength / remainingParts);

      const minSearch = Math.max(start + 20, idealEnd - 40);
      const maxSearch = Math.min(totalLength - 1, idealEnd + 40);

      let splitAt = -1;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let cursor = minSearch; cursor <= maxSearch; cursor += 1) {
        if (normalized[cursor] !== ' ') continue;
        const distance = Math.abs(cursor - idealEnd);
        if (distance < bestDistance) {
          bestDistance = distance;
          splitAt = cursor;
        }
      }

      if (splitAt === -1) {
        splitAt = normalized.lastIndexOf(' ', idealEnd);
      }
      if (splitAt <= start) {
        splitAt = normalized.indexOf(' ', idealEnd);
      }
      if (splitAt <= start) {
        break;
      }

      chunks.push(normalized.slice(start, splitAt).trim());
      start = splitAt + 1;
    }

    chunks.push(normalized.slice(start).trim());
    return chunks.filter((chunk) => chunk.length > 0);
  };

  const renderNarrativeWithLogo = (text: string | undefined) => {
    if (!text) return null;
    if (!text.includes('[SIGMA_LOGO]')) return text;

    const parts = text.split('[SIGMA_LOGO]');
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && (
          <img
            src="/sigma trade.svg"
            alt="Sigma Trade"
            style={{
              height: '1.2em',
              verticalAlign: 'middle',
              display: 'inline-block',
              margin: '0 4px',
              transform: 'translateY(-2px)',
            }}
          />
        )}
      </React.Fragment>
    ));
  };

  const developerText = normalizeMobileText(t('devDescription'));
  const administratorText = normalizeMobileText(t('adminDescription'));
  const quoteChunks = splitBalancedMobileNarrative(data.personal.about, 2, language === 'en' ? 230 : 210);
  const extraNarrativeChunks = data.personal.extraNarrative
    ? splitEvenLengthMobileNarrative(data.personal.extraNarrative, 4)
    : [];

  return (
    <section id="about" className="container about-section" style={{ padding: '8rem 0' }}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        {t('professionalNarrative')}
      </motion.h2>

      <div className="about-desktop-layout">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bento-grid"
        >
          <motion.div variants={itemVariants} className="glass bento-span-6" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
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

          <motion.div variants={itemVariants} className="glass bento-span-6" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
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

          <motion.div variants={itemVariants} className="glass bento-span-full" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))' }}>
            <p style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--fg)', lineHeight: 1.6, textAlign: 'center', maxWidth: '900px', margin: '0 auto', fontWeight: 300 }}>
              "{data.personal.about}"
            </p>
          </motion.div>

          {data.personal.extraNarrative && (
            <motion.div
              variants={itemVariants}
              className="bento-span-full about-focus-card"
              style={{
                padding: '3rem',
                borderLeft: '4px solid var(--accent-dev)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: 'var(--accent-dev)',
                  marginBottom: '1.5rem',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                }}
              >
                <Target size={28} />
                {language === 'en' ? 'Why hire me, ' : 'El porque contratarme '}
                <img
                  src="/sigma trade.svg"
                  alt="Sigma Trade"
                  style={{
                    height: '1.2em',
                    verticalAlign: 'middle',
                    marginLeft: '0.2rem',
                    transform: 'translateY(-2px)',
                  }}
                />
                {language === 'en' ? '?' : ''}
              </h3>
              <p
                style={{
                  fontSize: '1.15rem',
                  color: 'var(--fg-secondary)',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                  maxWidth: '1200px',
                }}
              >
                {renderNarrativeWithLogo(data.personal.extraNarrative)}
              </p>
            </motion.div>
          )}

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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="about-mobile-layout"
      >
        <p className="about-mobile-swipe-hint">
          {language === 'en' ? 'Swipe to explore' : 'Desliza para explorar'}
        </p>

        <Swiper
          modules={[Pagination, A11y]}
          className="about-mobile-swiper"
          slidesPerView={1}
          centeredSlides
          autoHeight
          spaceBetween={14}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 },
          }}
        >
          <SwiperSlide key="dev" className="about-mobile-slide">
            <article className="glass about-mobile-card about-mobile-card--dev">
              <div className="about-mobile-watermark">
                <Code2 size={132} />
              </div>
              <span className="about-mobile-chip about-mobile-chip--dev">
                {t('theDeveloper')}
              </span>
              <h3 className="about-mobile-title">{t('theDeveloper')}</h3>
              <p className="about-mobile-copy">{developerText}</p>
            </article>
          </SwiperSlide>

          <SwiperSlide key="admin" className="about-mobile-slide">
            <article className="glass about-mobile-card about-mobile-card--admin">
              <div className="about-mobile-watermark">
                <Briefcase size={124} />
              </div>
              <span className="about-mobile-chip about-mobile-chip--admin">
                {t('theAdministrator')}
              </span>
              <h3 className="about-mobile-title">{t('theAdministrator')}</h3>
              <p className="about-mobile-copy">{administratorText}</p>
            </article>
          </SwiperSlide>

          {quoteChunks.map((chunk, index) => {
            const quoteTextStart = index === 0 ? `"${chunk}` : chunk;
            const quoteText = index === quoteChunks.length - 1 ? `${quoteTextStart}"` : quoteTextStart;

            return (
              <SwiperSlide key={`quote-${index}`} className="about-mobile-slide">
                <article className="glass about-mobile-card about-mobile-card--quote">
                  <span className="about-mobile-chip about-mobile-chip--quote">
                    {language === 'en' ? 'Professional Narrative' : 'Narrativa Profesional'}
                    {quoteChunks.length > 1 ? ` ${index + 1}/${quoteChunks.length}` : ''}
                  </span>
                  <p className="about-mobile-quote">{quoteText}</p>
                </article>
              </SwiperSlide>
            );
          })}

          {extraNarrativeChunks.map((chunk, index) => (
            <SwiperSlide key={`extra-${index}`} className="about-mobile-slide">
              <article className="glass about-mobile-card about-mobile-card--extra">
                <div className="about-mobile-watermark about-mobile-watermark--sigma">
                  <img src="/sigma trade.svg" alt="" aria-hidden="true" />
                </div>
                <span className="about-mobile-chip about-mobile-chip--extra">
                  {language === 'en' ? 'Why Hire Me' : 'Por Que Contratarme'}
                  {extraNarrativeChunks.length > 1 ? ` ${index + 1}/${extraNarrativeChunks.length}` : ''}
                </span>
                <h3 className="about-mobile-title about-mobile-title--accent">
                  {language === 'en' ? 'Why hire me' : 'El porque contratarme'}
                  <img className="about-mobile-sigma-logo" src="/sigma trade.svg" alt="Sigma Trade" />
                </h3>
                <p className="about-mobile-copy about-mobile-copy--prewrap">{chunk}</p>
              </article>
            </SwiperSlide>
          ))}

          <SwiperSlide className="about-mobile-slide">
            <article className="glass about-mobile-card about-mobile-card--meta">
              <span className="about-mobile-chip about-mobile-chip--quote">
                {language === 'en' ? 'Profile Details' : 'Detalles Del Perfil'}
              </span>
              <div className="about-mobile-meta-stack">
                <div className="about-mobile-meta-row">
                  <p className="about-mobile-label">{t('location')}</p>
                  <p className="about-mobile-value">{data.personal.location}</p>
                </div>
                <div className="about-mobile-meta-divider" />
                <div className="about-mobile-meta-row">
                  <p className="about-mobile-label">{t('status')}</p>
                  <p className="about-mobile-value about-mobile-value--accent">{t('statusValue')}</p>
                </div>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </section>
  );
};

export default About;
