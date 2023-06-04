export const createSearchPath = (value) => {
  const keys = ['model', 'color', 'year', 'country', 'driver', 'type'];
  const searchParams = keys.map((key) => {
    if (value[key]) {
      return `${key}=${value[key]}`;
    }
    return null;
  }).filter(Boolean);

  if (searchParams.length > 0) {
    return `${searchParams.join('&')}`;
  }

  return null;
};
