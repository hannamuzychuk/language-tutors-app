import { useEffect, useState } from 'react';
import { THEMES } from '../config/themes';
import { ThemeContext } from './contexts';

const THEME_STORAGE_KEY = 'learnlingo-theme';
const DEFAULT_THEME = 'gray';

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return THEMES.includes(saved) ? saved : DEFAULT_THEME;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (nextTheme) => {
    if (THEMES.includes(nextTheme)) {
      setThemeState(nextTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}
