import { useEffect, useState } from 'react';
import { THEME_COLORS } from '../../config/themeColors';
import { useAuth } from '../../hooks/useAuth';
import { useError } from '../../hooks/useError';
import { useFavorites } from '../../hooks/useFavorites';
import { useLoading } from '../../hooks/useLoading';
import { useTheme } from '../../hooks/useTheme';
import styles from './TeachersPage.module.css';
import TeachersFilters from '../../components/TeachersFilter/TeachersFilters';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { getTeachersBatch } from '../../firebase/teachersService';
import { levelsMatch, getTeacherLevels } from '../../utils/levelUtils';
import { getAllTeacherLanguages } from '../../utils/teacherUtils';
import Modal from '../../components/Modal/Modal';
import BookingModal from '../../components/BookingModal/BookingModal';
import AuthModal from '../../components/AuthModal/AuthModal';

const TEACHERS_PER_PAGE = 4;

function normalizeText(value) {
    return String(value ?? '').trim().toLowerCase();
}

function languageMatches(teacherLanguages, selectedLanguage) {
    const normalizedSelected = normalizeText(selectedLanguage);
    if (!normalizedSelected) return true;

    const normalizedTeacherLanguages = teacherLanguages.map(normalizeText).filter(Boolean);

    return normalizedTeacherLanguages.some(
        (teacherLanguage) =>
            teacherLanguage === normalizedSelected ||
            teacherLanguage.includes(normalizedSelected) ||
            normalizedSelected.includes(teacherLanguage)
    );
}

function mergeTeachersById(prevTeachers, nextTeachers) {
    const merged = [...prevTeachers];
    const seen = new Set(prevTeachers.map((teacher) => teacher.id));

    nextTeachers.forEach((teacher) => {
        if (!seen.has(teacher.id)) {
            merged.push(teacher);
            seen.add(teacher.id);
        }
    });

    return merged;
}

function TeachersPage() {
    const { theme } = useTheme();
    const colors = THEME_COLORS[theme];
    const { user } = useAuth();
    const { isFavorite, toggleFavorites } = useFavorites();
    const { isLoadingKey, withLoading, LOADING_KEYS } = useLoading();
    const { showError } = useError();
    const [filters, setFilters] = useState({ language: '', level: '', price: '' });
    const [teachers, setTeachers] = useState([]);
    const [allTeachers, setAllTeachers] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [hasLoadedAllTeachers, setHasLoadedAllTeachers] = useState(false);
    const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalMessage, setAuthModalMessage] = useState('');
    const isFilteringActive = Boolean(filters.language || filters.level || filters.price);

    useEffect(() => {
        let isMounted = true;

        const loadInitialTeachers = async () => {
            try {
                await withLoading(LOADING_KEYS.TEACHERS, async () => {
                    const response = await getTeachersBatch();
                    if (!isMounted) return;
                    setTeachers(response.teachers);
                    setLastKey(response.lastKey);
                    setHasMore(response.hasMore);
                    setAllTeachers(response.teachers);
                    setHasLoadedAllTeachers(false);
                });
            } catch (error) {
                if (isMounted) {
                    showError(error.message || 'Failed to load teachers.');
                }
            }
        };

        loadInitialTeachers();

        return () => {
            isMounted = false;
        };
    }, [withLoading, showError, LOADING_KEYS.TEACHERS]);

    useEffect(() => {
        if (!isFilteringActive || hasLoadedAllTeachers) return;

        let isMounted = true;
        const loadAllTeachersForFilters = async () => {
            try {
                await withLoading(LOADING_KEYS.TEACHERS_MORE, async () => {
                    let cursor = null;
                    let more = true;
                    const everyTeacher = [];

                    while (more) {
                        const response = await getTeachersBatch(cursor);
                        everyTeacher.push(...response.teachers);
                        cursor = response.lastKey;
                        more = response.hasMore;
                    }

                    if (!isMounted) return;
                    setAllTeachers(mergeTeachersById([], everyTeacher));
                    setHasLoadedAllTeachers(true);
                });
            } catch (error) {
                if (isMounted) {
                    showError(error.message || 'Failed to load teachers for filters.');
                }
            }
        };

        loadAllTeachersForFilters();

        return () => {
            isMounted = false;
        };
    }, [isFilteringActive, hasLoadedAllTeachers, withLoading, showError, LOADING_KEYS.TEACHERS_MORE]);

    const teachersSource = isFilteringActive ? allTeachers : teachers;

    const filteredTeachers = teachersSource.filter((teacher) => {
        const languages = getAllTeacherLanguages(teacher);

        if (
            filters.language &&
            !languageMatches(languages, filters.language) &&
            !JSON.stringify(teacher).toLowerCase().includes(normalizeText(filters.language))
        ) {
            return false;
        }
        if (filters.level) {
            const hasLevel = getTeacherLevels(teacher.levels).some((level) =>
                levelsMatch(level, filters.level)
            );
            if (!hasLevel) return false;
        }
        if (filters.price && teacher.price_per_hour > parseInt(filters.price)) return false;
        return true;
    });
    const displayedTeachers = isFilteringActive
        ? filteredTeachers.slice(0, visibleCount)
        : filteredTeachers;
    const showLoadMore = isFilteringActive ? visibleCount < filteredTeachers.length : hasMore;
    const isFiltersLoading =
        isFilteringActive &&
        !hasLoadedAllTeachers &&
        isLoadingKey(LOADING_KEYS.TEACHERS_MORE);

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

    const handleToggleFavorite = (teacher) => {
        if (!user) {
            openAuthModal('Please log in or register to add and view your favorite teachers.');
            return;
        }
        toggleFavorites(teacher);
    };

    const handleLoadMore = async () => {
        if (isFilteringActive) {
            setVisibleCount((prev) => prev + TEACHERS_PER_PAGE);
            return;
        }

        if (!hasMore) return;

        try {
            await withLoading(LOADING_KEYS.TEACHERS_MORE, async () => {
                const response = await getTeachersBatch(lastKey);
                setTeachers((prev) => mergeTeachersById(prev, response.teachers));
                setAllTeachers((prev) => mergeTeachersById(prev, response.teachers));
                setLastKey(response.lastKey);
                setHasMore(response.hasMore);
            });
        } catch (error) {
            showError(error.message || 'Failed to load more teachers.');
        }
    };

    const handleFiltersChange = (nextFilters) => {
        setFilters(nextFilters);
        setVisibleCount(TEACHERS_PER_PAGE);
    };

    const handleBookingRequireAuth = () => {
        closeBookingModal();
        openAuthModal('Please log in or register to book a trial lesson.');
    };

    return (
        <main className={styles.page}>
            <TeachersFilters onChange={handleFiltersChange} teachers={teachers} />
            <section className={styles.cards}>
                {isFiltersLoading ? (
                    <div className={styles.loadingTeachers} role="status" aria-live="polite">
                        <span
                            className={styles.loadingSpinner}
                            style={{ borderTopColor: colors.accent }}
                            aria-hidden="true"
                        />
                    </div>
                ) : (
                    <>
                        {displayedTeachers.map((teacher, index) => (
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
                    </>
                )}
            </section>

            {showLoadMore && !isFiltersLoading && (
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

            <Modal isOpen={isBookingModalOpen} onClose={closeBookingModal} fullHeight>
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
