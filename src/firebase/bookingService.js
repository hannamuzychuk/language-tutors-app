import { ref, push } from 'firebase/database';
import { db } from './config';

export async function createBooking(bookingData) {
    const bookingsRef = ref(db, 'bookings');
    const newBookingRef = await push(bookingsRef, bookingData);
    return newBookingRef.key;
}