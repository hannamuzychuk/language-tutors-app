import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, loginSchema } from '../../validation/authSchema';
import { registerUser, loginUser } from '../../firebase/authService';
import { THEME_COLORS } from '../../config/themeColors';
import { useTheme } from '../../hooks/useTheme';
import { useError } from '../../hooks/useError';
import AuthForm from './AuthForm';
import styles from './AuthModal.module.css'; 

function AuthModalForm({ isRegister, onClose, onToggleModal, colors }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showError } = useError();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (isRegister) {
        await registerUser(data.email, data.password, data.name);
      } else {
        await loginUser(data.email, data.password);
      }

      onClose();
    } catch (error) {
      showError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AuthForm
        register={register}
        errors={errors}
        isRegister={isRegister}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        styles={styles}
        colors={colors}
        isSubmitting={isSubmitting}
      />

      <button type="button" className={styles.toggleBtn} onClick={onToggleModal}>
        {isRegister
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </button>
    </>
  );
}

function AuthModal({ onClose, initialMode = 'login', message }) {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];

  const toggleMode = () => setIsRegister((prev) => !prev);

  return (
    <div className={styles.authModal}>
      <h2 className={styles.title}>{isRegister ? 'Register' : 'Login'}</h2>

      {message && (
        <p
          className={styles.notice}
          style={{
            backgroundColor: `${colors.accent}33`,
            border: `1px solid ${colors.accent}73`,
          }}
        >
          {message}
        </p>
      )}

      <p className={styles.subtitle}>{isRegister
      ? 'Create an account to get started' : 'Log in to your account'}
      </p>

      <AuthModalForm
        key={isRegister ? 'register' : 'login'}
        isRegister={isRegister}
        onClose={onClose}
        onToggleModal={toggleMode}
        colors={colors}
      />
    </div>
  );
}

export default AuthModal;
