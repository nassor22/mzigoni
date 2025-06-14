import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = false, className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center justify-center ${showText ? 'space-x-3' : ''} ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img 
          src="/src/assets/images/mziGO-logo.png" 
          alt="mziGO Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-800 ${textSizeClasses[size]}`}>
            mziGO
          </span>
          <span className="text-teal-600 text-xs font-medium tracking-wide">
            TRANSPORTATION MADE EASY
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;