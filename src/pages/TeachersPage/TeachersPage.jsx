import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../config/themeColors';
import styles from './TeachersPage.module.css';
import TeachersFilters from '../../components/TeachersFilter/TeachersFilters';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { getTeachers } from '../../firebase/teachersService';

function TeachersPage() {
    const {theme} = useTheme();
    const colors = THEME_COLORS[theme];
    const [filters, setFilters] = useState({language: '', level: '', price: ''});
    const [teachers, setTeachers] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const unsubscribe = getTeachers((data) => {
          setTeachers(data);
        });
        return () => unsubscribe();
      }, []);

    useEffect(() => {
      setVisibleCount(3);
    }, [filters]);

      const filteredTeachers = teachers.filter((teacher) => {
        if (filters.language && !teacher.languages.includes(filters.language)) return false;
        if (filters.level && !teacher.levels.includes(filters.level)) return false;
        if (filters.price && teacher.price_per_hour > parseInt(filters.price)) return false;
        return true;
      });

      const visibleTeachers = filteredTeachers.slice(0, visibleCount);

    return (
        <main className={styles.page}>
         <TeachersFilters onChange={setFilters} />
         <section className={styles.cards}>
            {visibleTeachers.map((teacher, index) => (
                <TeacherCard key={teacher.id ?? index} teacher={teacher} colors={colors} />
            ))}

            {filteredTeachers.length === 0 && (
             <p className={styles.noTeachers} >No teachers found for selected filters.</p>
            )}
         </section>
         {visibleCount < filteredTeachers.length && (
            <button
                type="button"
                className={styles.loadMoreBtn}
                style={{
                    backgroundColor: colors.btnPrimary,
                    color: colors.btnText,
                }}
                onClick={() => setVisibleCount((prev) => prev + 3)}
            >
                Load more
            </button>
         )}

        </main>
    )
}

export default TeachersPage;