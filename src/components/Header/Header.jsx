import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
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
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
    closeMenu();
  };

  const openRegisterModal = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
    closeMenu();
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleLogout = () => {
    logoutUser();
    closeMenu();
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleViewportChange = () => {
      if (mediaQuery.matches) closeMenu();
    };

    mediaQuery.addEventListener('change', handleViewportChange);
    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    const scrollY = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.headerLogo}>
          <Logo theme={theme} />
          <span>LearnLingo</span>
        </Link>

        <nav className={styles.headerNav} aria-label="Main navigation">
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

        <div className={styles.headerMobileBar}>
          <ThemeSwitcher />
          <button
            type="button"
            className={styles.burgerBtn}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <button
            type="button"
            className={styles.mobileBackdrop}
            onClick={closeMenu}
            aria-label="Close menu"
          />
          <div className={styles.mobilePanel}>
            <button
              type="button"
              className={styles.mobileCloseBtn}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <IoClose size={28} />
            </button>

            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
              <Link to="/teachers" onClick={closeMenu}>
                Teachers
              </Link>
              {user && (
                <Link to="/favorites" onClick={closeMenu}>
                  Favorites
                </Link>
              )}
            </nav>

            <div className={styles.mobileAuth}>
              {user ? (
                <>
                  <span className={styles.mobileUserEmail}>{user.email}</span>
                  <button
                    type="button"
                    className={styles.mobileLogoutBtn}
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
                    className={styles.mobileLoginBtn}
                    onClick={openLoginModal}
                  >
                    <LoginIcon color={colors.accent} />
                    Log in
                  </button>
                  <button
                    type="button"
                    className={styles.mobileRegisterBtn}
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
      )}

      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        <AuthModal onClose={closeAuthModal} initialMode={authMode} />
      </Modal>
    </header>
  );
}

export default Header;
