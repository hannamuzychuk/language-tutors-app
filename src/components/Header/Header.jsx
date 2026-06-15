import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../firebase/authService';
import AuthModal from '../AuthModal/AuthModal';
import Modal from '../Modal/Modal';
import styles from './Header.module.css';

function Header() {
  const { user } = useAuth();
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
          <img src="/logo/logo_quest.png" alt="" width={28} height={28} />
          <span>LearnLingo</span>
        </Link>

        <nav className={styles.headerNav}>
          <Link to="/">Home</Link>
          <Link to="/teachers">Teachers</Link>
          {user && <Link to="/favorites">Favorites</Link>}
        </nav>

        <div className={styles.headerAuth}>
          {user ? (
            <>
              <span className={styles.userEmail}>{user.email}</span>
              <button type="button" onClick={handleLogout}>
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
                Log in
              </button>
              <button
                type="button"
                className={styles.registerBtn}
                onClick={openRegisterModal}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        <AuthModal onClose={closeAuthModal} initialMode={authMode} />
      </Modal>
    </header>
  );
}

export default Header;
