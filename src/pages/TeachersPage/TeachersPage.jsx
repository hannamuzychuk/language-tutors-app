import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../config/themeColors';
import styles from './TeachersPage.module.css';
import TeachersFilters from '../../components/TeachersFilter/TeachersFilters';

function TeachersPage() {
    const {theme} = useTheme();
    const colors = THEME_COLORS[theme];
    const [filters, setFilters] = useState({language: '', level: '', price: ''});
    return (
        <main className={styles.page}>
         <TeachersFilters onChange={setFilters} />
         {/* lista kart z informacjami o nauczycielu */}
         {/* przycisk "Load more" */}

        </main>
    )
}

export default TeachersPage;