import React, { useState } from 'react';
import { Shield, Radio, Camera } from 'lucide-react';
import { profile } from '../config/profile';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const hasLogoImage = Boolean(profile.media.logo && !imageError);

  const sizeClasses = {
    sm: 'h-8 text-base',
    md: 'h-10 text-lg',
    lg: 'h-12 text-xl',
  };

  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  return (
    <a
      href="#hero"
      className={`inline-flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
      aria-label={profile.brandName}
    >
      {hasLogoImage ? (
        <img
          src={profile.media.logo}
          alt={profile.media.logoAlt || profile.brandName}
          className={`${sizeClasses[size]} w-auto object-contain`}
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Fallback: High-tech Monogram / Icon Logo */
        <div className="flex items-center gap-3">
          <div
            className={`relative flex items-center justify-center rounded-xl font-bold tracking-wider text-cyan-400 bg-slate-900 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] ${iconSizes[size]}`}
          >
            {/* Tech decorative corners */}
            <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-cyan-400"></span>
            <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-cyan-400"></span>
            
            <div className="flex items-center justify-center">
              <Camera className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center font-extrabold tracking-tight text-white leading-tight">
              <span>{profile.brandShortName || 'HOA'}</span>
              <span className="text-cyan-400 ml-0.5">NET</span>
            </div>
            {showTagline && (
              <span className="text-[9px] uppercase font-semibold tracking-widest text-slate-400 leading-none mt-0.5">
                CCTV &amp; Network
              </span>
            )}
          </div>
        </div>
      )}
    </a>
  );
};
