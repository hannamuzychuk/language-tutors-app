export function getTeacherLanguages(languages) {
  const unique = new Set();

  const addTokensFromString = (value) => {
    String(value)
      .split(/[;,/]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((token) => unique.add(token));
  };

  const collect = (value) => {
    if (value == null) return;

    if (typeof value === 'string') {
      addTokensFromString(value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(collect);
      return;
    }

    if (typeof value === 'object') {
      if ('name' in value) collect(value.name);
      if ('label' in value) collect(value.label);
      if ('value' in value) collect(value.value);
      Object.values(value).forEach(collect);
    }
  };

  collect(languages);
  return Array.from(unique);
}

export function getAllTeacherLanguages(teacher) {
  const candidates = [teacher?.languages, teacher?.language, teacher?.speaks];
  const unique = new Set();

  candidates.forEach((source) => {
    getTeacherLanguages(source).forEach((lang) => {
      if (lang) unique.add(lang);
    });
  });

  return Array.from(unique);
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
