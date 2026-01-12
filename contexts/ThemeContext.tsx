'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((themeToApply: Theme) => {
    if (typeof document === 'undefined') return;
    
    requestAnimationFrame(() => {
      try {
        const root = document.documentElement;
        
        root.classList.remove('dark');
        
        if (themeToApply === 'dark') {
          root.classList.add('dark');
        }
        
        const hasDarkClass = root.classList.contains('dark');
        const expectedDark = themeToApply === 'dark';
        
        if (hasDarkClass !== expectedDark) {
          console.warn(`Theme mismatch: expected ${expectedDark ? 'dark' : 'light'}, but class is ${hasDarkClass ? 'dark' : 'light'}`);
          if (expectedDark && !hasDarkClass) {
            root.classList.add('dark');
          } else if (!expectedDark && hasDarkClass) {
            root.classList.remove('dark');
          }
        }
        
        console.log(`Theme applied: ${themeToApply}, dark class: ${root.classList.contains('dark')}`);
      } catch (error) {
        console.error('Error applying theme:', error);
      }
    });
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    let initialTheme: Theme = 'light';
    
    if (savedTheme === 'light' || savedTheme === 'dark') {
      initialTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = prefersDark ? 'dark' : 'light';
    }
    
    console.log('Initializing theme:', initialTheme);
    
    applyTheme(initialTheme);
    
    setTheme(initialTheme);
    setMounted(true);
  }, [applyTheme]);

  useEffect(() => {
    if (!mounted) return;
    
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted, applyTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    console.log(`Toggling theme from ${theme} to ${newTheme}`);
    
    localStorage.setItem('theme', newTheme);
    
    applyTheme(newTheme);
    
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
