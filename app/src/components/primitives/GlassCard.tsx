import { forwardRef, type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', hover = true, onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`glass-card rounded-3xl p-6 ${hover ? '' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
