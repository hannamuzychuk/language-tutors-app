import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../config/themeColors';
import styles from './GlobalLoader.module.css';

function GlobalLoader({ isLoading }) {
    const { theme } = useTheme();
    const colors = THEME_COLORS[theme];

    if (!isLoading) return null;

    return (
        <div className={styles.overlay} role="status" aria-live="polite" aria-label="Loading">
            <div
                className={styles.spinner}
                style={{ borderTopColor: colors.accent }}
            />
        </div>
    );
}

export default GlobalLoader;
