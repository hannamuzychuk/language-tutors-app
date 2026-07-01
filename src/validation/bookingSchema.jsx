import * as yup from 'yup';

export const bookingSchema = yup.object({
    reason: yup.string().required('Reason is required'),
    name: yup.string().required('Name is required'),
    email: yup 
    .string()
    .email('Enter a valid name')
    .required('email is required'),
    phone: yup.string().required('Phone is required'),
});