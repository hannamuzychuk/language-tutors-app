import { ref, onValue, set, remove , off } from 'firebase/database';
import { db } from './config';


export function getTeacherKey(teacher) {
    return teacher.id ?? `${teacher.name}_${teacher.surname}`;
}

export function subscribeFavorite(userId, callback) {
    const favoritesRef = ref(db, `users/${userId}/favorites`);

    onValue(favoritesRef, (snapshot) => {
        const data = snapshot.val();

        if(!data)
            return callback([]);

        const favorites = Object.values(data);
        callback(favorites);
    });

    return () => off(favoritesRef);
}

export async function addFavorite(userId, teacher) {
    const teacherKey = getTeacherKey(teacher);
    const favoritesRef = ref(db, `users/${userId}/favorites/${teacherKey}`);

    await set(favoritesRef, teacher);
}

export async function removeFavorite(userId, teacher) {
    const teacherKey = getTeacherKey(teacher);
    const favoriteRef = ref(db, `users/${userId}/favorites/${teacherKey}`);

    await remove(favoriteRef);
}