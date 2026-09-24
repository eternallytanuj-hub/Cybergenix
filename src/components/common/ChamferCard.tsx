import React from 'react';

export interface ChamferCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  chamfer?: 'none' | 'sm' | 'md' | 'lg';
  surface?: 'surface-1' | 'surface-2' | 'surface-3' | 'surface-4' | 'glass';
  glow?: boolean | 'orange' | 'indigo';
  highlightBorder?: boolean;
  hoverEffect?: boolean;
  as?: 'div' | 'article' | 'aside' | 'section';
}

export const ChamferCard: React.FC<ChamferCardProps> = ({
  children,
  className = '',
  chamfer = 'md',
  surface = 'glass',
  glow = false,
  highlightBorder = true,
  hoverEffect = true,
  as: Component = 'div',
  ...props
}) => {
  // Chamfer clip-path polygon
  const chamferClass = {
    none: 'rounded-xl',
    sm: 'clip-chamfer-sm',
    md: 'clip-chamfer',
    lg: 'clip-chamfer',
  }[chamfer];

  // Surface background styling
  const surfaceStyles = {
    'surface-1': 'bg-cyber-surface-1 border border-cyber-surface-7',
    'surface-2': 'bg-cyber-surface-2 border border-cyber-surface-6',
    'surface-3': 'bg-cyber-surface-3 border border-cyber-surface-6',
    'surface-4': 'bg-cyber-surface-4 border border-cyber-surface-7',
    'glass':
      'bg-white/[0.03] backdrop-blur-card border border-white/[0.08] shadow-card-glass',
  }[surface];

  // Glow shadow styling
  const glowStyles = glow === 'orange' || glow === true
    ? 'hover:shadow-glow-primary'
    : glow === 'indigo'
    ? 'hover:shadow-glow-indigo'
    : '';

  // Hover transition
  const hoverStyles = hoverEffect
    ? 'transition-all duration-500 hover:border-white/20 hover:-translate-y-1'
    : '';

  return (
    <Component
      className={`
        ChamferCard relative overflow-hidden
        ${chamferClass}
        ${surfaceStyles}
        ${glowStyles}
        ${hoverStyles}
        ${className}
      `.trim()}
      {...props}
    >
      {/* Illuminated top edge gradient highlight */}
      {highlightBorder && (
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Subtle corner light catch */}
      <span
        className="pointer-events-none absolute -top-12 -right-12 w-28 h-28 bg-cyber-primary/10 rounded-full blur-2xl"
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default ChamferCard;
