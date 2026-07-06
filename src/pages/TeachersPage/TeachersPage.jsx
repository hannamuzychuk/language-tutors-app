import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../config/themeColors';
import styles from './TeachersPage.module.css';
import TeachersFilters from '../../components/TeachersFilter/TeachersFilters';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { getTeachersBatch } from '../../firebase/teachersService';
import { levelsMatch, getTeacherLevels } from '../../utils/levelUtils';
import Modal from '../../components/Modal/Modal';
import BookingModal from '../../components/BookingModal/BookingModal';
import AuthModal from '../../components/AuthModal/AuthModal';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useLoading } from '../../context/LoadingContext';
import { useError } from '../../context/ErrorContext';

function TeachersPage() {
    const { theme } = useTheme();
    const colors = THEME_COLORS[theme];
    const { user } = useAuth();
    const { isFavorite, toggleFavorites } = useFavorites();
    const { isLoadingKey, withLoading, LOADING_KEYS } = useLoading();
    const { showError } = useError();
    const [filters, setFilters] = useState({ language: '', level: '', price: '' });
    const [teachers, setTeachers] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalMessage, setAuthModalMessage] = useState('');

    useEffect(() => {
        const loadInitialTeachers = async () => {
            try {
                await withLoading(LOADING_KEYS.TEACHERS, async () => {
                    const { teachers: batch, lastKey: key, hasMore: more } = await getTeachersBatch();
                    setTeachers(batch);
                    setLastKey(key);
                    setHasMore(more);
                });
            } catch (error) {
                showError(error.message || 'Failed to load teachers.');
            }
        };

        loadInitialTeachers();
    }, [withLoading, showError, LOADING_KEYS.TEACHERS]);

    const filteredTeachers = teachers.filter((teacher) => {
        if (filters.language && !teacher.languages.includes(filters.language)) return false;
        if (filters.level) {
            const hasLevel = getTeacherLevels(teacher.levels).some((level) =>
                levelsMatch(level, filters.level)
            );
            if (!hasLevel) return false;
        }
        if (filters.price && teacher.price_per_hour > parseInt(filters.price)) return false;
        return true;
    });

    const openBookingModal = (teacher) => {
        setSelectedTeacher(teacher);
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedTeacher(null);
    };

    const openAuthModal = (message = '') => {
        setAuthModalMessage(message);
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
        setAuthModalMessage('');
    };

    useEffect(() => {
        if (user && isAuthModalOpen) {
            closeAuthModal();
        }
    }, [user, isAuthModalOpen]);

    const handleToggleFavorite = (teacher) => {
        if (!user) {
            openAuthModal('Please log in or register to add and view your favorite teachers.');
            return;
        }
        toggleFavorites(teacher);
    };

    const handleLoadMore = async () => {
        if (!hasMore || isLoadingKey(LOADING_KEYS.TEACHERS_MORE)) return;

        try {
            await withLoading(LOADING_KEYS.TEACHERS_MORE, async () => {
                const { teachers: batch, lastKey: key, hasMore: more } = await getTeachersBatch(lastKey);
                setTeachers((prev) => [...prev, ...batch]);
                setLastKey(key);
                setHasMore(more);
            });
        } catch (error) {
            showError(error.message || 'Failed to load more teachers.');
        }
    };

    const handleBookingRequireAuth = () => {
        closeBookingModal();
        openAuthModal('Please log in or register to book a trial lesson.');
    };

    return (
        <main className={styles.page}>
            <TeachersFilters onChange={setFilters} />
            <section className={styles.cards}>
                {filteredTeachers.map((teacher, index) => (
                    <TeacherCard
                        key={teacher.id ?? index}
                        teacher={teacher}
                        colors={colors}
                        onBookLesson={openBookingModal}
                        isFavorite={isFavorite(teacher)}
                        onToggleFavorite={handleToggleFavorite}
                        activeLevel={filters.level}
                    />
                ))}

                {!isLoadingKey(LOADING_KEYS.TEACHERS) && filteredTeachers.length === 0 && (
                    <p className={styles.noTeachers}>No teachers found for selected filters.</p>
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
                    disabled={isLoadingKey(LOADING_KEYS.TEACHERS_MORE)}
                >
                    {isLoadingKey(LOADING_KEYS.TEACHERS_MORE) ? 'Loading...' : 'Load more'}
                </button>
            )}

            <Modal isOpen={isBookingModalOpen} onClose={closeBookingModal}>
                {selectedTeacher && (
                    <BookingModal
                        teacher={selectedTeacher}
                        colors={colors}
                        onClose={closeBookingModal}
                        onRequireAuth={handleBookingRequireAuth}
                        selectedLanguage={filters.language}
                    />
                )}
            </Modal>

            <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
              <AuthModal
                  onClose={closeAuthModal}
                  initialMode="login"
                  message={authModalMessage}
              />
            </Modal>
        </main>
    );
}

export default TeachersPage;
