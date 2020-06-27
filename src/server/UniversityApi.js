import {API_URL} from '../util/Constants';

const API_UNIVERSITY = `${API_URL}/rest/university`;

export const getUniversityList = (page, searchText) => {
  return fetch(`${API_UNIVERSITY}?page=1&&searchText=${searchText}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getUniversityListFromFilterPage = (city, major, subject) => {
  var path = '?page=1';
  if (city !== '') path += `&&city=${city}`;
  if (major !== '') path += `&&major=${major}`;
  if (subject !== '') path += `&&subject=${subject}`;
  return fetch(`${API_UNIVERSITY}${path}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getAllCities = () => {
  return fetch(`${API_UNIVERSITY}/cities`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getUniversityById = (id) => {
  return fetch(`${API_UNIVERSITY}/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const sendComment = (text, user, id) => {
  fetch(`${API_UNIVERSITY}/comment/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      text,
      commentUser: user,
    }),
  });
};
