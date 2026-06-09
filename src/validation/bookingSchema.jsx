import * as yup from 'yup';

export const bookingSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup 
    .string()
    .email('Enter a valid name')
    .required('email is required'),
    date: yup.string().required('Data is required'),
    comment: yup.string().required('Comment is required'),
});