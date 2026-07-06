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
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
});