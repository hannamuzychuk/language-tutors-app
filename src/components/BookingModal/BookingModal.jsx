import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '../../validation/bookingSchema';
import styles from './BookingModal.module.css';
import { createBooking } from '../../firebase/bookingService';
import { useState } from 'react';


const REASONS = [
    'Career and business',
    'Lesson for kids',
    'Living abroad',
    'Exams and coursework',
    'Culture, travel or hobby',
  ];

function BookingModal({teacher, colors, onClose}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(bookingSchema),
    });

    const [submitError, setSubmitError] = useState('');

    const language = teacher.languages[0];

    const onSubmit = async (data) => {
        try { 
        setSubmitError('');

        const bookingToSave = {
            reason: data.reason,
            name: data.name,
            email: data.email,
            phone: data.phone,
            teacherName: `${teacher.name} ${teacher.surname}`,
            teacherId: teacher.id ?? null,
            createdAt: new Date().toISOString(),
        };

        await createBooking(bookingToSave);
        onClose();
    } catch (error) {
        setSubmitError(error.message || 'Failed to book the lesson. Please try again.');
    }
};

    return (
        <div className={styles.bookingModal}>
            <h2 className={styles.title}>Book a trial lesson</h2>
            <p className={styles.subtitle}>Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.</p>
            <div className={styles.teacher}>
                <img src={teacher.avatar_url} alt={teacher.name} width={44} height={44}/>
                <div>
                    <p className={styles.teacherLabel}>Your teacher</p>
                    <p className={styles.teacherName}>{teacher.name} {teacher.surname}</p>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <p className={styles.question}>
                    What is your main reason for learning {language}?
                </p>
                <div className={styles.reasons}>
                    {REASONS.map((reason) => (
                        <label key={reason} className={styles.radioLabel}>
                            <input type="radio" {...register('reason')} value={reason} style={{accentColor: colors.accent}} />
                            {reason}
                        </label>
                    ))}
                </div>
                {errors.reason && (
                    <p className={styles.error}>{errors.reason.message}</p>
                )}
                <div className={styles.inputs}>
                    <div className={styles.field}>
                        <input className={styles.input} type="text" {...register('name')} placeholder="Full name" />
                        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                    </div>
                    <div className={styles.field}>
                        <input className={styles.input} type="text" {...register('email')} placeholder="Email" />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>
                    <div className={styles.field}>
                        <input className={styles.input} type="text" {...register('phone')} placeholder="Phone number" />
                        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
                    </div>
                </div>
                {submitError && <p className={styles.error}>{submitError}</p>}
            <button type="submit" className={styles.submitBtn} style={{backgroundColor: colors.btnPrimary, color: colors.btnText}}>Send</button>
            </form>
            
        </div>
    );
}

export default BookingModal;
