import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../../utils/gsapConfig';

export interface SplitTextProps {
  children?: string;
  text?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  type?: 'chars' | 'words';
  stagger?: number;
  delay?: number;
  duration?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  scrollTrigger?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  children,
  text: propText,
  as: Component = 'div',
  className = '',
  type = 'chars',
  stagger,
  delay = 0.1,
  duration = 0.55,
  highlightWords = [],
  highlightClassName = 'text-cyber-primary font-inherit',
  scrollTrigger = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fullText = (children || propText || '').trim();

  // Ensure fonts are ready before running animation
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      }).catch(() => {
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true);
    }
  }, []);

  // Split into words and characters
  const words = fullText.split(/\s+/).filter(Boolean);

  useEffect(() => {
    if (!fontsLoaded || !containerRef.current) return;

    // Accessibility & reduced motion guard
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const targetElements = containerRef.current.querySelectorAll(
      type === 'chars' ? '.split-char' : '.split-word'
    );

    if (targetElements.length === 0) return;

    const staggerAmount =
      stagger !== undefined ? stagger : targetElements.length < 10 ? 0.2 : 0.45;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targetElements,
        {
          opacity: 0,
          y: '0.85em',
          rotateX: -25,
        },
        {
          opacity: 1,
          y: '0em',
          rotateX: 0,
          duration,
          delay,
          stagger: {
            amount: staggerAmount,
            from: 'start',
          },
          ease: 'power2.out',
          scrollTrigger: scrollTrigger
            ? {
                trigger: containerRef.current,
                start: 'top 88%',
                once: true,
              }
            : undefined,
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [fontsLoaded, type, stagger, delay, duration, scrollTrigger]);

  // Clean normalized word checking for highlights
  const isWordHighlighted = (word: string): boolean => {
    const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase();
    return highlightWords.some(
      (hw) => hw.toLowerCase() === cleanWord || hw.toLowerCase() === word.toLowerCase()
    );
  };

  return (
    <Component
      ref={containerRef as unknown as React.Ref<any>}
      className={`SplitText inline-block leading-tight ${className}`}
      aria-label={fullText}
    >
      {words.map((word, wordIndex) => {
        const highlighted = isWordHighlighted(word);
        const wordClasses = `split-word inline-block whitespace-nowrap ${
          highlighted ? highlightClassName : ''
        }`;

        if (type === 'words') {
          return (
            <React.Fragment key={`word-${wordIndex}`}>
              <span className={wordClasses} aria-hidden="true">
                {highlighted ? <strong>{word}</strong> : word}
              </span>
              {wordIndex < words.length - 1 && ' '}
            </React.Fragment>
          );
        }

        // Chars mode: split word into characters
        return (
          <React.Fragment key={`word-${wordIndex}`}>
            <span className={wordClasses} aria-hidden="true">
              {Array.from(word).map((char, charIndex) => (
                <span
                  key={`char-${wordIndex}-${charIndex}`}
                  className="split-char inline-block will-change-transform"
                  aria-hidden="true"
                >
                  {highlighted ? <strong>{char}</strong> : char}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 && (
              <span className="split-space inline-block whitespace-pre" aria-hidden="true">
                {' '}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </Component>
  );
};

export default SplitText;
