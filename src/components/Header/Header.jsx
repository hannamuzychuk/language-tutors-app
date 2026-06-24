import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { THEME_COLORS } from '../../config/themeColors';
import { useTheme } from '../../context/ThemeContext';
import { logoutUser } from '../../firebase/authService';
import AuthModal from '../AuthModal/AuthModal';
import Modal from '../Modal/Modal';
import LoginIcon from '../icons/LoginIcon';
import Logo from '../Logo/Logo';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import styles from './Header.module.css';

function Header() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.headerLogo}>
          <Logo theme={theme} />
          <span>LearnLingo</span>
        </Link>

        <nav className={styles.headerNav}>
          <Link to="/">Home</Link>
          <Link to="/teachers">Teachers</Link>
          {user && <Link to="/favorites">Favorites</Link>}
        </nav>

        <div className={styles.headerRight}>
          <ThemeSwitcher />

          <div className={styles.headerAuth}>
          {user ? (
            <>
              <span className={styles.userEmail}>{user.email}</span>
              <button
                type="button"
                className={styles.logoutBtn}
                style={{
                  backgroundColor: colors.registerBg,
                  color: colors.registerText,
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={styles.loginBtn}
                onClick={openLoginModal}
              >
                <LoginIcon color={colors.accent} />
                Log in
              </button>
              <button
                type="button"
                className={styles.registerBtn}
                style={{
                  backgroundColor: colors.registerBg,
                  color: colors.registerText,
                }}
                onClick={openRegisterModal}
              >
                Registration
              </button>
            </>
          )}
          </div>
        </div>
      </div>

      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        <AuthModal onClose={closeAuthModal} initialMode={authMode} />
      </Modal>
    </header>
  );
}

export default Header;
