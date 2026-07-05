import { ref, query, get, orderByKey, startAfter, limitToFirst } from 'firebase/database';
import { db } from './config';

const TEACHERS_PER_PAGE = 4;

export async function getTeachersBatch(lastKey = null) {
    const teachersRef = ref(db, 'teachers');

    const teachersQuery = lastKey
        ? query(teachersRef, orderByKey(), startAfter(lastKey), limitToFirst(TEACHERS_PER_PAGE))
        : query(teachersRef, orderByKey(), limitToFirst(TEACHERS_PER_PAGE));

    const snapshot = await get(teachersQuery);

    const teachers = [];
    let newLastKey = null;

    snapshot.forEach((child) => {
        teachers.push({ id: child.key, ...child.val() });
        newLastKey = child.key;
    });

    return {
        teachers,
        lastKey: newLastKey,
        hasMore: teachers.length === TEACHERS_PER_PAGE,
    };
}