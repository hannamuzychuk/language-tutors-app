export function normalizeLevel(level) {
    return level?.replace(/-/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase() ?? '';
}

export function getTeacherLevels(levels) {
    return Array.isArray(levels) ? levels : Object.values(levels ?? {});
}

function getLevelCode(level) {
    const match = normalizeLevel(level).match(/^(a1|a2|b1|b2|c1|c2)\b/);
    return match?.[1] ?? '';
}

export function levelsMatch(teacherLevel, filterLevel) {
    if (!filterLevel) return false;

    if (normalizeLevel(teacherLevel) === normalizeLevel(filterLevel)) {
        return true;
    }

    const teacherCode = getLevelCode(teacherLevel);
    const filterCode = getLevelCode(filterLevel);

    return teacherCode !== '' && teacherCode === filterCode;
}
