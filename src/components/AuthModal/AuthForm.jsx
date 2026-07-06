function AuthForm({ 
    register,
    isRegister,
    onSubmit,
    handleSubmit,
    errors,
    styles,
    colors,
}) {
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
                Email
            </label>
            <input 
                className={styles.input}
                type="email" 
                id="email"
                {...register('email')} 
                placeholder="Enter your email" />

            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
                Password 
            </label>
            <input
             type="password"
             id="password"
             className={styles.input}
             {...register('password')}
              placeholder="Enter your password" />

            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>

            {isRegister && (
                <div className={styles.field}>
                <label className={styles.label} htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                 type="password"
                 id="confirmPassword"
                 className={styles.input}
                 {...register('confirmPassword')}
                 placeholder="Confirm your password" />

                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                </div>
            )}

            <button
                type="submit"
                className={styles.submitBtn}
                style={{
                    backgroundColor: colors.btnPrimary,
                    color: colors.btnText,
                }}
            >
                {isRegister ? 'Register' : 'Login'}
            </button>
        </form>
    );
}

export default AuthForm;