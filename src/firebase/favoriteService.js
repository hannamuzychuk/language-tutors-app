import { ref, onValue, set, remove } from 'firebase/database';
import { db } from './config';

function sanitizeFirebaseKey(key) {
    return String(key).replace(/[.#$/[\]]/g, '_');
}

export function getTeacherKey(teacher) {
    const rawKey = teacher.id ?? `${teacher.name}_${teacher.surname}`;
    return sanitizeFirebaseKey(rawKey);
}

function parseFavoritesSnapshot(data) {
    if (!data) {
        return [];
    }

    return Object.entries(data)
        .filter(([, teacher]) => teacher != null)
        .map(([id, teacher]) => ({
            ...teacher,
            id: teacher.id ?? id,
        }));
}

export function subscribeFavorite(userId, callback) {
    const favoritesRef = ref(db, `users/${userId}/favorites`);

    return onValue(favoritesRef, (snapshot) => {
        callback(parseFavoritesSnapshot(snapshot.val()));
    });
}

export async function addFavorite(userId, teacher) {
    const teacherKey = getTeacherKey(teacher);
    const favoritesRef = ref(db, `users/${userId}/favorites/${teacherKey}`);

    await set(favoritesRef, { ...teacher, id: teacherKey });
}

export async function removeFavorite(userId, teacher) {
    const teacherKey = getTeacherKey(teacher);
    const favoriteRef = ref(db, `users/${userId}/favorites/${teacherKey}`);

    await remove(favoriteRef);
}