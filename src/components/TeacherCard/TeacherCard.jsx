import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import bookIcon from '../icons/book-open-01.svg';
import starIcon from '../icons/Star.svg';
import styles from './TeacherCard.module.css';

function getReviewAvatarUrl(review) {
    if (review.reviewer_avatar_url) return review.reviewer_avatar_url;
    if (review.avatar_url) return review.avatar_url;
    if (review.reviewer_id) {
        return `https://ftp.goit.study/img/avatars/${review.reviewer_id}.jpg`;
    }
    return null;
}

function TeacherCard({teacher, colors, onBookLesson, isFavorite, onToggleFavorite}) {

    const fullName = `${teacher.name} ${teacher.surname}`;
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <article className={styles.card}>
            <div className={styles.avatarWrap}>
                <img
                    className={styles.avatar}
                    src={teacher.avatar_url}
                    alt={fullName}
                    style={{ borderColor: colors.accent }}
                />
                <span className={styles.onlineDot} />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.nameBlock}>
                        <p className={styles.language}>{teacher.languages[0]}</p>
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
                                Rating: {teacher.rating}
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
                    <p>Speaks: {teacher.languages.join(', ')}</p>
                    <p>Lesson Info: {teacher.lesson_info}</p>
                    <p>Conditions: {teacher.conditions.join(' ')}</p>
                </div>

                {isExpanded && (
                    <p className={styles.experience}>{teacher.experience}</p>
                )}

                {isExpanded && teacher.reviews?.length > 0 && (
                    <div className={styles.reviews}>
                        {teacher.reviews.map((review, index) => {
                            const reviewAvatarUrl = getReviewAvatarUrl(review);

                            return (
                            <article key={index} className={styles.review}>
                                <div className={styles.reviewUser}>
                                    {reviewAvatarUrl ? (
                                        <img
                                            className={styles.reviewAvatar}
                                            src={reviewAvatarUrl}
                                            alt={review.reviewer_name}
                                            width={44}
                                            height={44}
                                        />
                                    ) : (
                                        <span className={styles.reviewAvatarFallback}>
                                            {review.reviewer_name[0]}
                                        </span>
                                    )}
                                    <div>
                                        <p className={styles.reviewName}>{review.reviewer_name}</p>
                                        <div className={styles.reviewRating}>
                                            <img src={starIcon} alt="" aria-hidden="true" className={styles.icon} width={16} height={16} />
                                            <span>{review.reviewer_rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.reviewComment}>{review.comment}</p>
                            </article>
                            );
                        })}
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
                    {teacher.levels.map((level, index) => (
                        <span
                            key={level}
                            className={styles.levelTag}
                            style={
                                index === 0
                                    ? { backgroundColor: colors.accent, border: 'none' }
                                    : undefined
                            }
                        >
                            #{level}
                        </span>
                    ))}
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