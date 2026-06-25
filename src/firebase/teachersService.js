import { ref, onValue } from 'firebase/database';
import { db } from './config';

export function getTeachers(callback) {
    const teachersRef = ref(db, 'teachers');

    return onValue(teachersRef, (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            return callback([]);
        }

        const teachers = Object.values(data);
        callback(teachers);
    });
}