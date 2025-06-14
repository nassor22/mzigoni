import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../../hooks/useLanguage';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'default' | 'floating';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const { language, setLanguage } = useLanguage();

  const baseClasses = variant === 'floating' 
    ? 'bg-white/20 text-white border border-white/30 backdrop-blur-sm focus:ring-white/50'
    : 'bg-white border border-gray-300 focus:ring-2 focus:ring-emerald-500';

  return (
    <div className={`relative ${className}`}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className={`${baseClasses} rounded-lg px-4 py-2 pr-8 focus:outline-none transition-all duration-200`}
      >
        <option value="en" className="text-gray-800">English</option>
        <option value="sw" className="text-gray-800">Kiswahili</option>
      </select>
      <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none opacity-70" />
    </div>
  );
};

export default LanguageSelector;