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

// Clean KZero pill CTA button without chamfers, neon glow or shadows
export const CtaButton: React.FC<CtaButtonProps> = ({
  href,
  target,
  rel,
  variant = 'primary',
  size = 'default',
  icon,
  children,
  className = '',
  onClick,
  type = 'button',
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: 'h-10 px-5 text-xs',
    default: 'h-12 px-7 text-xs sm:text-sm',
    lg: 'h-14 px-8 text-xs sm:text-sm',
    full: 'w-full h-12 px-7 text-xs sm:text-sm justify-center',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#f85c3a] text-white hover:bg-[#ff704f]',
    transparent:
      'bg-transparent text-[#f2f2f2] border border-white/20 hover:border-white hover:bg-white/[0.04]',
    secondary:
      'bg-white/10 text-white hover:bg-white/20',
    inverse:
      'bg-black text-white hover:bg-[#f85c3a]',
  }[variant];

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="title font-mono uppercase tracking-[0.14em]">
        {children}
      </span>
    </span>
  );

  const combinedClasses = `
    CtaButton group relative inline-flex items-center justify-center font-mono font-medium rounded-full
    transition-all duration-300 select-none cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
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
