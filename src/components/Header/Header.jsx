import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.headerLogo}>
          <img src="/logo/logo_quest.png" alt="" width={28} height={28} />
          <span>LearnLingo</span>
        </Link>

        <nav className={styles.headerNav}>
          <Link to="/">Home</Link>
          <Link to="/teachers">Teachers</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
