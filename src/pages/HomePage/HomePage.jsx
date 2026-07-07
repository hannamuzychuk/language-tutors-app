import { Link } from 'react-router-dom';
import HeroThemeBlock from '../../components/HeroThemeBlock/HeroThemeBlock';
import { THEME_COLORS } from '../../config/themeColors';
import { useTheme } from '../../hooks/useTheme';
import styles from './HomePage.module.css';

const stats = [
  { value: '32,000 +', label: 'Experienced tutors' },
  { value: '300,000 +', label: '5-star tutor reviews' },
  { value: '120 +', label: 'Subjects taught' },
  { value: '200 +', label: 'Tutor nationalities' },
];

function HomePage() {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div
          className={styles.heroContent}
          style={{ backgroundColor: colors.heroBg }}
        >
          <h1 style={{ color: colors.text }}>
            Unlock your potential with the best{' '}
            <span
              className={styles.highlight}
              style={{
                backgroundColor: colors.highlightBg,
                color: colors.highlightText,
              }}
            >
              language
            </span>{' '}
            tutors
          </h1>

          <p style={{ color: colors.text }}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>

          <Link
            to="/teachers"
            className={styles.heroBtn}
            style={{
              backgroundColor: colors.btnPrimary,
              color: colors.btnText,
            }}
          >
            Get started
          </Link>
        </div>

        <div
          className={styles.heroImage}
          style={{ backgroundColor: colors.heroImageBg }}
          aria-hidden="true"
        >
          {theme === 'gray' ? (
            <>
              <div
                className={`${styles.heroImageShape} ${styles.shape1}`}
                style={{ backgroundColor: colors.shape1 }}
              />
              <div
                className={`${styles.heroImageShape} ${styles.shape2}`}
                style={{ backgroundColor: colors.shape2 }}
              />
              <div
                className={`${styles.heroImageShape} ${styles.shape3}`}
                style={{ backgroundColor: colors.shape2 }}
              />
            </>
          ) : (
            <HeroThemeBlock theme={theme} />
          )}
        </div>
      </section>

      <section
        className={styles.stats}
        style={{ borderColor: colors.statsBorder }}
      >
        <ul className={styles.statsList}>
          {stats.map((item) => (
            <li key={item.label} className={styles.statsItem}>
              <span className={styles.statsValue} style={{ color: colors.text }}>
                {item.value}
              </span>
              <span className={styles.statsLabel}>{item.label}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default HomePage;
