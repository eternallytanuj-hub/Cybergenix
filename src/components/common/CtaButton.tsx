import React from 'react';

export interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'transparent' | 'secondary' | 'inverse';
  size?: 'sm' | 'default' | 'lg' | 'full';
  chamfer?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const CtaButton: React.FC<CtaButtonProps> = ({
  href,
  target,
  rel,
  variant = 'primary',
  size = 'default',
  chamfer = true,
  icon,
  children,
  className = '',
  onClick,
  type = 'button',
  disabled,
  ...props
}) => {
  // Chamfer polygon style
  const chamferClass = chamfer ? 'clip-chamfer' : 'rounded-md';

  // Sizing tokens
  const sizeStyles = {
    sm: 'h-[4.0rem] px-5 text-xs',
    default: 'h-[5.0rem] px-7 text-sm',
    lg: 'h-[5.6rem] px-9 text-base',
    full: 'w-full h-[5.0rem] px-7 text-sm justify-center',
  }[size];

  // Color variants
  const variantStyles = {
    primary:
      'bg-cyber-primary text-white hover:bg-cyber-primary-hover shadow-glow-primary hover:shadow-glow-primary-lg',
    transparent:
      'bg-white/[0.04] text-cyber-text-primary border border-white/20 hover:border-cyber-primary/60 hover:text-white hover:bg-white/[0.08]',
    secondary:
      'bg-cyber-surface-4 text-cyber-text-primary border border-cyber-surface-7 hover:border-cyber-primary/40 hover:text-white',
    inverse:
      'bg-black text-white hover:bg-cyber-primary hover:shadow-glow-primary',
  }[variant];

  // Rolling text content
  const content = (
    <>
      {/* Background with diagonal laser ripple sweep */}
      <span className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <span
          className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
          style={{
            clipPath:
              'polygon(0 0, calc(100% + 4rem) 0, 100% 100%, calc(0% - 4rem) 100%)',
          }}
        />
      </span>

      {/* Button Content / Rolling Dupe Text */}
      <span className="relative z-10 flex items-center gap-3">
        {icon && <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
        <span className="title relative overflow-hidden inline-block h-[1.6rem] leading-[1.6rem]">
          <span className="block transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-hover:scale-90">
            {children}
          </span>
          <span
            className="dupe absolute inset-0 block transform translate-y-full scale-90 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:scale-100"
            aria-hidden="true"
          >
            {children}
          </span>
        </span>
      </span>
    </>
  );

  const combinedClasses = `
    CtaButton group relative inline-flex items-center justify-center font-mono font-medium uppercase tracking-wider
    transition-all duration-300 select-none overflow-hidden cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${chamferClass}
    ${sizeStyles}
    ${variantStyles}
    ${className}
  `.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer ' + (rel || '') : rel}
        className={combinedClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default CtaButton;
