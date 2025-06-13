import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img 
        src="/src/assets/images/Capture.PNG" 
        alt="mziGO Logo" 
        className={sizeClasses[size]}
      />
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