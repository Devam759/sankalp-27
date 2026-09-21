import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'primary-dark' | 'white-dark' | 'accent' | 'glass';
  children: React.ReactNode;
}

/**
 * Canonical site-wide button component.
 *
 * Variants map to the CSS utility classes defined in globals.css:
 *   primary       — orange fill  (page header CTAs, primary actions)
 *   secondary     — blue fill    (secondary header CTAs)
 *   outline       — blue outline (ghost / tertiary actions on light bg)
 *   primary-dark  — orange fill  (CTAs inside dark/blue sections)
 *   white-dark    — white fill   (secondary CTAs inside dark/blue sections)
 *   accent        — orange fill, legacy rounded-sm scale style
 *   glass         — translucent white border (hero dark-overlay use)
 */
export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const variants: Record<string, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    'primary-dark': 'btn-primary-dark',
    'white-dark': 'btn-white-dark',
    accent: 'btn-accent',
    glass:
      'bg-transparent border border-white px-7 py-3.5 rounded-sm text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-brand-blue transition-all',
  };

  return (
    <button className={cn(variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
