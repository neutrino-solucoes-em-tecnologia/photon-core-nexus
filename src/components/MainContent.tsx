import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollProgress from './ScrollProgress';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollProgress />
      <div 
        className={`
          relative w-full max-w-full overflow-x-hidden min-h-screen
          transition-all duration-600 ease-out
          ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
        `}
      >
        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity z-50" />
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
