import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../config/themeColors';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import Modal from '../../components/Modal/Modal';
import BookingModal from '../../components/BookingModal/BookingModal';
import styles from './FavoritesPage.module.css';

function FavoritesPage() {
    const { theme } = useTheme();
    const colors = THEME_COLORS[theme];
    const { user } = useAuth();
    const { favorites, isFavorite, toggleFavorites } = useFavorites();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const handleToggleFavorite = (teacher) => {
        toggleFavorites(teacher);
    };

    const openBookingModal = (teacher) => {
        setSelectedTeacher(teacher);
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedTeacher(null);
    };

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Favorites</h1>

            <section className={styles.cards}>
                {favorites.map((teacher, index) => (
                    <TeacherCard
                        key={teacher.id ?? index}
                        teacher={teacher}
                        colors={colors}
                        onBookLesson={openBookingModal}
                        isFavorite={isFavorite(teacher)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}

                {favorites.length === 0 && (
                    <p className={styles.empty}>No favorite teachers yet.</p>
                )}
            </section>

            <Modal isOpen={isBookingModalOpen} onClose={closeBookingModal}>
                {selectedTeacher && (
                    <BookingModal
                        teacher={selectedTeacher}
                        colors={colors}
                        onClose={closeBookingModal}
                    />
                )}
            </Modal>
        </main>
    );
}

export default FavoritesPage;
