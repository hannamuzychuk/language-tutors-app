export function getTeacherLanguages(languages) {
  if (Array.isArray(languages)) {
    return languages;
  }

  if (languages && typeof languages === 'object') {
    return Object.values(languages).filter(Boolean);
  }

  return [];
}

export function getTeacherConditions(conditions) {
  if (Array.isArray(conditions)) {
    return conditions;
  }

  if (typeof conditions === 'string') {
    return [conditions];
  }

  if (conditions && typeof conditions === 'object') {
    return Object.values(conditions).filter(Boolean);
  }

  return [];
}

function parseTeachersFromSnapshot(snapshot) {
  const data = snapshot.val();

  if (!data) {
    return [];
  }

  return Object.entries(data)
    .filter(([, teacher]) => teacher != null)
    .map(([id, teacher]) => ({ ...teacher, id }));
}

export { parseTeachersFromSnapshot };
