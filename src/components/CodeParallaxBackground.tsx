import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import globeRaw from './Globe.tsx?raw';

const KEYWORDS = new Set([
  'const',
  'let',
  'var',
  'type',
  'interface',
  'return',
  'import',
  'from',
  'export',
  'if',
  'else',
  'for',
  'while',
  'switch',
  'case',
  'break',
  'continue',
  'function',
  'extends',
  'useState',
  'useEffect',
  'useMemo',
  'useRef',
  'useMotionValue',
  'useSpring',
]);

const MIN_VISIBLE_LINES = 12;
const LINE_SCROLL_STEP = 18;

const TOKEN_PATTERN =
  /(["'`][^"'`]*["'`]|[A-Za-z_$][A-Za-z0-9_$]*|[0-9]+(?:\.[0-9]+)?|[{}[\]().,:;<>+=*/-]|=>|\s+|.)/g;

const extractLines = (source: string) => source.replace(/\r/g, '').split('\n');

const getTokenClass = (token: string) => {
  if (KEYWORDS.has(token)) return 'code-token code-token--keyword';
  if (/^["'`]/.test(token)) return 'code-token code-token--string';
  if (/^[0-9]/.test(token)) return 'code-token code-token--number';
  if (/^[A-Z][A-Za-z0-9_$]*$/.test(token)) return 'code-token code-token--type';
  if (/^[{}[\]().,:;<>+=*/-]|=>$/.test(token)) return 'code-token code-token--operator';
  return 'code-token';
};

const renderHighlightedLine = (line: string) => {
  if (line.length === 0) return <span className="code-token">&nbsp;</span>;

  const tokens = line.match(TOKEN_PATTERN) ?? [line];

  return tokens.map((token, index) => (
    <span key={`${token}-${index}`} className={getTokenClass(token)}>
      {token}
    </span>
  ));
};

const CodeParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3600], [20, -130]);
  const x = useTransform(scrollY, [0, 3600], [0, 16]);
  const opacity = useTransform(scrollY, [0, 140, 1800], [0.44, 0.56, 0.5]);

  const lines = useMemo(() => extractLines(globeRaw), []);
  const [startLineIndex, setStartLineIndex] = useState(0);
  const [visibleLineCount, setVisibleLineCount] = useState(18);
  const [maxVisibleLines, setMaxVisibleLines] = useState(34);

  const updateVisibleWindow = useCallback((latestScrollY: number) => {
    const maxVisible = Math.max(1, Math.min(lines.length, maxVisibleLines));
    const nextVisibleCount = Math.min(lines.length, Math.max(MIN_VISIBLE_LINES, maxVisible));
    const maxStart = Math.max(0, lines.length - nextVisibleCount);
    const nextStart = Math.min(maxStart, Math.max(0, Math.floor(latestScrollY / LINE_SCROLL_STEP)));

    setVisibleLineCount((previous) => (previous === nextVisibleCount ? previous : nextVisibleCount));
    setStartLineIndex((previous) => (previous === nextStart ? previous : nextStart));
  }, [lines.length, maxVisibleLines]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateMaxVisibleLines = () => {
      const isMobile = window.innerWidth < 768;
      const approxLineHeight = isMobile ? 20 : 24;
      const nextMax = Math.max(12, Math.floor(window.innerHeight / approxLineHeight) + 2);
      setMaxVisibleLines(nextMax);
    };

    updateMaxVisibleLines();
    window.addEventListener('resize', updateMaxVisibleLines);

    return () => window.removeEventListener('resize', updateMaxVisibleLines);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => updateVisibleWindow(window.scrollY);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateVisibleWindow]);

  const visibleLines = lines.slice(startLineIndex, startLineIndex + visibleLineCount);

  return (
    <div className="code-parallax-bg" aria-hidden="true">
      <motion.pre className="code-full-block" style={{ y, x, opacity }}>
        {visibleLines.map((line, index) => {
          const lineNumber = startLineIndex + index;

          return (
            <span key={`code-line-${lineNumber}-${line}`} className="code-full-line">
              {renderHighlightedLine(line)}
            </span>
          );
        })}
      </motion.pre>
    </div>
  );
};

export default CodeParallaxBackground;
