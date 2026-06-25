import styles from './TeacherCard.module.css';

function TeacherCard({teacher, colors}) {

    const fullName = `${teacher.name} ${teacher.surname}`;
    return (
        <article className={styles.card}>
            <img
                className={styles.avatar}
                src={teacher.avatar_url}
                alt={fullName}
                style={{ borderColor: colors.accent }}
            />
            <div className={styles.content}>
                <div className={styles.header}>
                    <div>
                        <p className={styles.language}>{teacher.languages[0]}</p>
                        <h3 className={styles.name}>{fullName}</h3>
                    </div>

                    <div className={styles.meta}>
                        <span>Lessons online</span>
                        <span>Lessons done: {teacher.lessons_done}</span>
                        <span>Rating: {teacher.rating}</span>
                        <span>Price / 1 hour: {teacher.price_per_hour}$</span>
                    </div>
                </div>
                <div className={styles.details}>
                    <p>Speaks: {teacher.languages.join(', ')}</p>
                    <p>Lesson Info: {teacher.lesson_info}</p>
                    <p>Conditions: {teacher.conditions.join(' ')}</p>
                </div>

                <button type="button" className={styles.readMoreBtn}>Read more</button>

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

            </div>

        </article>
    )
}

export default TeacherCard;