import {API_URL} from '../util/Constants';

const API_MAJOR = API_URL + '/rest/major';

export const getAllSubjects = () => {
  return fetch(`${API_MAJOR}/subjects`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getMajors = () => {
  return fetch(`${API_MAJOR}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getMajorsBySubject = (subject) => {
  return fetch(`${API_MAJOR}/subjects/${subject}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getMajorById = (id) => {
  return fetch(`${API_MAJOR}/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getStatistics = (subject) => {
  return fetch(`${API_MAJOR}/statistics?subject=${subject}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const filterByPoint = (kazSchool, selKvota, point) => {
  return fetch(
    `${API_MAJOR}/points/filter?kazSchool=${kazSchool}&selKvota=${selKvota}&point=${point}`,
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
