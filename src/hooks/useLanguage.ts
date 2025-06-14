import { useState, useEffect } from 'react';

export type Language = 'en' | 'sw';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('mzigo-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('mzigo-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sw' : 'en');
  };

  return { language, setLanguage, toggleLanguage };
};