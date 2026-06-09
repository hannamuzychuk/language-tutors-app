import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup 
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
    password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = loginSchema.shape({
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required('Confirm password is required'),
});