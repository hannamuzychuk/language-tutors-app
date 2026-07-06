import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

function PasswordInput({
  id,
  register,
  placeholder,
  error,
  styles,
  autoComplete = 'current-password',
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.passwordField}>
      <input
        type={isVisible ? 'text' : 'password'}
        id={id}
        className={styles.input}
        aria-label={placeholder}
        autoComplete={autoComplete}
        {...register(id)}
        placeholder={placeholder}
      />
      <button
        type="button"
        className={styles.togglePassword}
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
      >
        {isVisible ? (
          <IoEyeOutline size={20} aria-hidden="true" />
        ) : (
          <IoEyeOffOutline size={20} aria-hidden="true" />
        )}
      </button>
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
}

function AuthForm({
  register,
  isRegister,
  onSubmit,
  handleSubmit,
  errors,
  styles,
  colors,
  isSubmitting = false,
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {isRegister && (
        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            id="name"
            aria-label="Name"
            autoComplete="name"
            {...register('name')}
            placeholder="Name"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
      )}

      <div className={styles.field}>
        <input
          className={styles.input}
          type="email"
          id="email"
          aria-label="Email"
          autoComplete="email"
          {...register('email')}
          placeholder="Email"
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <PasswordInput
        id="password"
        register={register}
        placeholder="Password"
        error={errors.password}
        styles={styles}
        autoComplete={isRegister ? 'new-password' : 'current-password'}
      />

      <button
        type="submit"
        className={styles.submitBtn}
        style={{
          backgroundColor: colors.btnPrimary,
          color: colors.btnText,
        }}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Please wait...'
          : isRegister
            ? 'Register'
            : 'Login'}
      </button>
    </form>
  );
}

export default AuthForm;
