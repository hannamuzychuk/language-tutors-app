import * as yup from 'yup';

export const bookingSchema = yup.object({
    reason: yup.string().required('Reason is required'),
    name: yup.string().required('Name is required'),
    email: yup 
    .string()
    .email('Enter a valid name')
    .required('Email is required'),
    phone: yup
        .string()
        .matches(/^\d+$/, 'Phone must contain only digits')
        .required('Phone is required'),
});