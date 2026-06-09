function AuthForm({ register, isRegister, onSubmit, handleSubmit, errors }) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Email
                <input type="email" {...register('email')} placeholder="Enter your email" />
            </label>
            {errors.email && <p className="error">{errors.email.message}</p>}

            <label>
                Password 
                <input type="password" {...register('password')} placeholder="Enter your password" />
            </label>
            {errors.password && <p className="error">{errors.password.message}</p>}

            {isRegister && (
                <>
                <label>
                    Confirm Password 
                    <input type="password" {...register('confirmPassword')} placeholder="Confirm your password" />
                </label>
                {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                </>
            )}

            <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>
    );
}

export default AuthForm;