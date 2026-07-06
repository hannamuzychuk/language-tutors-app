import { ref, query, get, orderByKey, startAfter, limitToFirst } from 'firebase/database';
import { db } from './config';
import { parseTeachersFromSnapshot } from '../utils/teacherUtils';

const TEACHERS_PER_PAGE = 4;

export async function getTeachersBatch(lastKey = null) {
    const teachersRef = ref(db, 'teachers');

    const teachersQuery = lastKey
        ? query(teachersRef, orderByKey(), startAfter(lastKey), limitToFirst(TEACHERS_PER_PAGE))
        : query(teachersRef, orderByKey(), limitToFirst(TEACHERS_PER_PAGE));

    const snapshot = await get(teachersQuery);
    const teachers = parseTeachersFromSnapshot(snapshot);
    const newLastKey = teachers.length > 0 ? teachers[teachers.length - 1].id : null;

    return {
        teachers,
        lastKey: newLastKey,
        hasMore: teachers.length === TEACHERS_PER_PAGE,
    };
}
