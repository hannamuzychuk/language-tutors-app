import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '../../validation/bookingSchema';
import styles from './BookingModal.module.css';
import { createBooking } from '../../firebase/bookingService';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useError } from '../../context/ErrorContext';

const REASONS = [
    'Career and business',
    'Lesson for kids',
    'Living abroad',
    'Exams and coursework',
    'Culture, travel or hobby',
];

function RadioOption({ name, value, label, register, checked, accentColor }) {
    return (
        <label className={styles.radioLabel}>
            <input
                type="radio"
                className={styles.radioInput}
                value={value}
                {...register(name)}
            />
            <span className={styles.radioControl} aria-hidden="true">
                <span
                    className={`${styles.radioRing} ${checked ? styles.radioRingChecked : ''}`}
                    style={checked ? { borderColor: accentColor } : undefined}
                >
                    {checked && (
                        <span
                            className={styles.radioDot}
                            style={{ backgroundColor: accentColor }}
                        />
                    )}
                </span>
            </span>
            <span className={styles.radioText}>{label}</span>
        </label>
    );
}

function BookingModal({ teacher, colors, onClose, onRequireAuth, selectedLanguage = '' }) {
    const { user } = useAuth();
    const { showError } = useError();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(bookingSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const selectedReason = watch('reason');

    const language =
        selectedLanguage && teacher.languages.includes(selectedLanguage)
            ? selectedLanguage
            : teacher.languages[0];

    const onSubmit = async (data) => {
        if (!user) {
            onRequireAuth?.();
            return;
        }

        setIsSubmitting(true);
        try {
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
            showError(error.message || 'Failed to book the lesson. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.bookingModal}>
            <div className={styles.header}>
                <h2 className={styles.title}>Book trial lesson</h2>
                <p className={styles.subtitle}>
                    Our experienced tutor will assess your current language level, discuss your
                    learning goals, and tailor the lesson to your specific needs.
                </p>
            </div>

            <div className={styles.teacher}>
                <img
                    className={styles.teacherAvatar}
                    src={teacher.avatar_url}
                    alt={teacher.name}
                    width={44}
                    height={44}
                />
                <div>
                    <p className={styles.teacherLabel}>Your teacher</p>
                    <p className={styles.teacherName}>
                        {teacher.name} {teacher.surname}
                    </p>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <p className={styles.question}>
                    What is your main reason for learning {language}?
                </p>

                <div className={styles.reasons}>
                    {REASONS.map((reason) => (
                        <RadioOption
                            key={reason}
                            name="reason"
                            value={reason}
                            label={reason}
                            register={register}
                            checked={selectedReason === reason}
                            accentColor={colors.accent}
                        />
                    ))}
                </div>

                {errors.reason && (
                    <p className={styles.error}>{errors.reason.message}</p>
                )}

                <div className={styles.inputs}>
                    <div className={styles.field}>
                        <input
                            className={styles.input}
                            type="text"
                            {...register('name')}
                            placeholder="Full Name"
                        />
                        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                    </div>
                    <div className={styles.field}>
                        <input
                            className={styles.input}
                            type="email"
                            {...register('email')}
                            placeholder="Email"
                        />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>
                    <div className={styles.field}>
                        <input
                            className={styles.input}
                            type="tel"
                            {...register('phone')}
                            placeholder="Phone number"
                        />
                        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    style={{ backgroundColor: colors.btnPrimary, color: colors.btnText }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Booking...' : 'Book'}
                </button>
            </form>
        </div>
    );
}

export default BookingModal;
