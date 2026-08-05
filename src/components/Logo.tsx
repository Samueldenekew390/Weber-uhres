import React from 'react';

interface LogoProps {
  logoUrl?: string;
  className?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  logoUrl = '/logo.svg',
  className = 'h-11 w-auto',
  showSubtitle = true,
}) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="flex items-center gap-3 select-none group">
      {!imageError && logoUrl ? (
        <img
          src={logoUrl}
          alt="Weber Uhrenservice Logo"
          className={`object-contain transition-transform duration-300 group-hover:scale-105 ${className}`}
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        // Fallback clean luxury text-based logo if logo image is missing or loading fails
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#18181b] shadow-inner">
            <span className="font-serif font-bold text-lg text-[#d4af37] tracking-wider">W</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg text-white tracking-[0.2em] uppercase">
              WEBER
            </span>
            {showSubtitle && (
              <span className="text-[10px] text-[#d4af37] tracking-[0.15em] uppercase font-medium">
                Uhrenservice
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
