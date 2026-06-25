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

    useEffect(() => {
        const unsubscribe = getTeachers((data) => {
          setTeachers(data);
        });
        return () => unsubscribe();
      }, []);

    return (
        <main className={styles.page}>
         <TeachersFilters onChange={setFilters} />
         <section className={styles.cards}>
            {teachers.map((teacher, index) => (
                <TeacherCard key={teacher.id ?? index} teacher={teacher} colors={colors} />
            ))}
         </section>
         {/* "Load more" */}

        </main>
    )
}

export default TeachersPage;