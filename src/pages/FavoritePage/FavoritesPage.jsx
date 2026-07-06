import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../config/themeColors';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import Modal from '../../components/Modal/Modal';
import BookingModal from '../../components/BookingModal/BookingModal';
import styles from './FavoritesPage.module.css';

const FAVORITES_PER_PAGE = 4;

function FavoritesPage() {
    const { theme } = useTheme();
    const colors = THEME_COLORS[theme];
    const { user, loading } = useAuth();
    const { favorites, isFavorite, toggleFavorites } = useFavorites();
    const [visibleCount, setVisibleCount] = useState(FAVORITES_PER_PAGE);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    useEffect(() => {
        setVisibleCount((prev) => Math.min(prev, favorites.length || FAVORITES_PER_PAGE));
    }, [favorites.length]);

    const visibleFavorites = favorites.slice(0, visibleCount);
    const hasMore = visibleCount < favorites.length;

    if (loading) {
        return (
            <main className={styles.page}>
                <h1 className={styles.title}>Favorites</h1>
            </main>
        );
    }

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

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + FAVORITES_PER_PAGE, favorites.length));
    };

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Favorites</h1>

            <section className={styles.cards}>
                {visibleFavorites.map((teacher, index) => (
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

            {hasMore && (
                <button
                    type="button"
                    className={styles.loadMoreBtn}
                    style={{
                        backgroundColor: colors.btnPrimary,
                        color: colors.btnText,
                    }}
                    onClick={handleLoadMore}
                >
                    Load more
                </button>
            )}

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
