import { Link } from 'react-router-dom';
import homeGuest from '../../assets/images/home_guest.png';
import styles from './HomePage.module.css';

const stats = [
  { value: '32,000 +', label: 'Experienced tutors' },
  { value: '300,000 +', label: '5-star tutor reviews' },
  { value: '120 +', label: 'Subjects taught' },
  { value: '200 +', label: 'Tutor nationalities' },
];

function HomePage() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Unlock your potential with the best language tutors</h1>

          <p>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>

          <Link to="/teachers" className={styles.heroBtn}>
            Get started
          </Link>
        </div>

        <div className={styles.heroImage}>
          <img src={homeGuest} alt="Language tutors" />
        </div>
      </section>

      <section className={styles.stats}>
        <ul className={styles.statsList}>
          {stats.map((item) => (
            <li key={item.label} className={styles.statsItem}>
              <span className={styles.statsValue}>{item.value}</span>
              <span className={styles.statsLabel}>{item.label}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default HomePage;
