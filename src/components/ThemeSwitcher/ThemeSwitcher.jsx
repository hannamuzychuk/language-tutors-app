import { useEffect, useRef, useState } from 'react';
import { useTheme, THEMES } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

const THEME_COLORS = {
  gray: '#8a8a89',
  yellow: '#f4c550',
  green: '#9fbaae',
  blue: '#9fb7ce',
  coral: '#e0a39a',
  orange: '#f0aa8d',
};

const THEME_LABELS = {
  gray: 'Gray',
  yellow: 'Yellow',
  green: 'Green',
  blue: 'Blue',
  coral: 'Coral',
  orange: 'Orange',
};

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const closeMenu = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const openMenu = () => {
    const currentIndex = THEMES.indexOf(theme);
    setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[highlightedIndex]?.focus();
    }
  }, [isOpen, highlightedIndex]);

  const handleSelect = (themeId) => {
    setTheme(themeId);
    closeMenu();
  };

  const handleTriggerKeyDown = (event) => {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
      }
    }
  };

  const handleMenuKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex((index) => (index + 1) % THEMES.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(
          (index) => (index - 1 + THEMES.length) % THEMES.length,
        );
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleSelect(THEMES[highlightedIndex]);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Choose color theme"
      >
        <span
          className={styles.swatch}
          style={{ backgroundColor: THEME_COLORS[theme] }}
          aria-hidden="true"
        />
        <span className={styles.label}>{THEME_LABELS[theme]}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <ul
          className={styles.menu}
          role="listbox"
          aria-label="Color themes"
          aria-activedescendant={`theme-option-${THEMES[highlightedIndex]}`}
          onKeyDown={handleMenuKeyDown}
        >
          {THEMES.map((themeId, index) => (
            <li key={themeId} role="presentation">
              <button
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                id={`theme-option-${themeId}`}
                type="button"
                role="option"
                aria-selected={theme === themeId}
                className={`${styles.option} ${theme === themeId ? styles.optionActive : ''} ${highlightedIndex === index ? styles.optionHighlighted : ''}`}
                onClick={() => handleSelect(themeId)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span
                  className={styles.swatch}
                  style={{ backgroundColor: THEME_COLORS[themeId] }}
                  aria-hidden="true"
                />
                {THEME_LABELS[themeId]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ThemeSwitcher;
