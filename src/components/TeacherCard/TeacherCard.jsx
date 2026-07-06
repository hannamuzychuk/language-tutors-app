import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import bookIcon from '../icons/book-open-01.svg';
import starIcon from '../icons/Star.svg';
import styles from './TeacherCard.module.css';
import { levelsMatch, getTeacherLevels } from '../../utils/levelUtils';

function getReviewAvatarUrl(review) {
    if (review.reviewer_avatar_url) return review.reviewer_avatar_url;
    if (review.avatar_url) return review.avatar_url;
    if (review.reviewer_id) {
        return `https://ftp.goit.study/img/avatars/${review.reviewer_id}.jpg`;
    }
    return null;
}

function formatRating(value) {
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) {
        return numeric.toFixed(1);
    }
    return String(value ?? '').replace(',', '.');
}

function ReviewAvatar({ review, styles }) {
    const [hasError, setHasError] = useState(false);
    const reviewAvatarUrl = getReviewAvatarUrl(review);

    if (!reviewAvatarUrl || hasError) {
        return (
            <span className={styles.reviewAvatarFallback}>
                {review.reviewer_name[0]}
            </span>
        );
    }

    return (
        <img
            className={styles.reviewAvatar}
            src={reviewAvatarUrl}
            alt={review.reviewer_name}
            width={44}
            height={44}
            onError={() => setHasError(true)}
        />
    );
}

function TeacherCard({teacher, colors, onBookLesson, isFavorite, onToggleFavorite, activeLevel = ''}) {

    const fullName = `${teacher.name} ${teacher.surname}`;
    const [isExpanded, setIsExpanded] = useState(false);

    const levels = getTeacherLevels(teacher.levels);

    return (
        <article className={styles.card}>
            <div className={styles.avatarWrap}>
                <div className={styles.avatar} style={{ borderColor: colors.accent }}>
                    <img
                        className={styles.avatarImage}
                        src={teacher.avatar_url}
                        alt={fullName}
                    />
                </div>
                <span className={styles.onlineDot} />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.nameBlock}>
                        <p className={styles.language}>Languages</p>
                        <h3 className={styles.name}>{fullName}</h3>
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaItems}>
                            <span className={styles.metaItem}>
                                <img src={bookIcon} alt="" aria-hidden="true" className={styles.icon} width={16} height={16} />
                                Lessons online
                            </span>

                            <span className={styles.divider} />

                            <span className={styles.metaItem}>
                                Lessons done: {teacher.lessons_done}
                            </span>

                            <span className={styles.divider} />

                            <span className={styles.metaItem}>
                                <img src={starIcon} alt="" aria-hidden="true" className={styles.icon} width={16} height={16} />
                                Rating: {formatRating(teacher.rating)}
                            </span>

                            <span className={styles.divider} />

                            <span className={styles.metaItem}>
                                Price / 1 hour: {teacher.price_per_hour}$
                            </span>
                        </div>

                        <button
                            type="button"
                            className={`${styles.heartBtn} ${isFavorite ? styles.heartActive : ''}`}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            onClick={() => onToggleFavorite(teacher)}
                        >
                            {isFavorite ? (
                                <FaHeart size={24} color={colors.accent} />
                            ) : (
                                <FaRegHeart size={24} color="#121417" />
                            )}
                        </button>
                    </div>
                </div>
                <div className={styles.details}>
                    <p>
                        <span className={styles.detailLabel}>Speaks:</span>{' '}
                        <span className={styles.speaksValue}>{teacher.languages.join(', ')}</span>
                    </p>
                    <p>
                        <span className={styles.detailLabel}>Lesson Info:</span>{' '}
                        <span>{teacher.lesson_info}</span>
                    </p>
                    <p>
                        <span className={styles.detailLabel}>Conditions:</span>{' '}
                        <span>{teacher.conditions.join(' ')}</span>
                    </p>
                </div>

                {isExpanded && (
                    <p className={styles.experience}>{teacher.experience}</p>
                )}

                {isExpanded && teacher.reviews?.length > 0 && (
                    <div className={styles.reviews}>
                        {teacher.reviews.map((review, index) => (
                            <article key={index} className={styles.review}>
                                <div className={styles.reviewUser}>
                                    <ReviewAvatar review={review} styles={styles} />
                                    <div>
                                        <p className={styles.reviewName}>{review.reviewer_name}</p>
                                        <div className={styles.reviewRating}>
                                            <img src={starIcon} alt="" aria-hidden="true" className={styles.icon} width={16} height={16} />
                                            <span>{formatRating(review.reviewer_rating)}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.reviewComment}>{review.comment}</p>
                            </article>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    className={styles.readMoreBtn}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>

                

                <div className={styles.levels}>
                    {levels.map((level, index) => {
                        const isActive = activeLevel
                            ? levelsMatch(level, activeLevel)
                            : index === 0;

                        return (
                        <span
                            key={`${level}-${index}`}
                            className={`${styles.levelTag} ${isActive ? styles.levelTagActive : ''}`}
                            style={
                                isActive
                                    ? {
                                          backgroundColor: colors.highlightBg,
                                          color: colors.highlightText,
                                      }
                                    : undefined
                            }
                        >
                            #{level}
                        </span>
                        );
                    })}
                </div>

                {isExpanded && (
                    <button
                        type="button"
                        className={styles.bookBtn}
                        style={{
                            backgroundColor: colors.btnPrimary,
                            color: colors.btnText,
                        }}
                        onClick={() => onBookLesson(teacher)}
                    >
                        Book trial lesson
                    </button>
                )}

            </div>

        </article>
    )
}

export default TeacherCard;