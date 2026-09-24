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

// Clean minimalist card without harsh borders, fake chamfers, or glowing AI slop
export const ChamferCard: React.FC<ChamferCardProps> = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={`
        relative rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-300 hover:border-white/[0.12]
        ${className}
      `.trim()}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default ChamferCard;
