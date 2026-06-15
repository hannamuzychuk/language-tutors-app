import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, loginSchema } from '../../validation/authSchema';
import { registerUser, loginUser } from '../../firebase/authService';
import AuthForm from './AuthForm';
import styles from './AuthModal.module.css'; 

function AuthModalForm({ isRegister, onClose, onToggleModal }) {
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setAuthError('');

      if (isRegister) {
        await registerUser(data.email, data.password);
      } else {
        await loginUser(data.email, data.password);
      }

      onClose();
    } catch (error) {
      setAuthError(error.message);
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
      />

      {authError && <p className={styles.error}>{authError}</p>}

      <button type="button" className={styles.toggleBtn} onClick={onToggleModal}>
        {isRegister
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </button>
    </>
  );
}

function AuthModal({ onClose, initialMode = 'login' }) {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');

  const toggleMode = () => setIsRegister((prev) => !prev);

  return (
    <div className={styles.authModal}>
      <h2 className={styles.title}>{isRegister ? 'Register' : 'Login'}</h2>

      <p className={styles.subtitle}>{isRegister
      ? 'Create an account to get started' : 'Log in to your account'}
      </p>

      <AuthModalForm
        key={isRegister ? 'register' : 'login'}
        isRegister={isRegister}
        onClose={onClose}
        onToggleModal={toggleMode}
      />
    </div>
  );
}

export default AuthModal;
