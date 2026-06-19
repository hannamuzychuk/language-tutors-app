import { createContext, useContext, useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'learnlingo-theme';
const DEFAULT_THEME = 'gray';

export const THEMES = ['gray', 'yellow', 'green', 'blue', 'coral', 'orange'];

const ThemeContext = createContext();

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

export function useTheme() {
  return useContext(ThemeContext);
}
