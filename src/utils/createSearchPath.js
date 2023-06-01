export const createSearchPath = (value) => {
  const { model, color, year, country, driver, type } = value;

  if (model && color && year && country && driver && type) {
    return `model=${model}&color=${color}&year=${year}&country=${country}&driver=${driver}&type=${type}`;
  }

  if (model && color && year && country && driver) {
    return `model=${model}&color=${color}&year=${year}&country=${country}&driver=${driver}`;
  }

  if (model && color && year && country) {
    return `model=${model}&color=${color}&year=${year}&country=${country}`;
  }

  if (model && color && year) {
    return `model=${model}&color=${color}&year=${year}`;
  }
  if (model && color) {
    return `model=${model}&color=${color}`;
  }
  if (model) {
    return `model=${model}`;
  }
  if (year) {
    return `year=${year}`;
  }
  if (color) {
    return `color=${color}`;
  }
  if (country) {
    return `country=${country}`;
  }
  if (driver) {
    return `driver=${driver}`;
  }
  if (type) {
    return `type=${type}`;
  }

  return null;
};
