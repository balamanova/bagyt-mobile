import {API_URL} from '../util/Constants';

const API_QUIZ = API_URL + '/rest/quiz';

export const getAllQuiz = () => {
  return fetch(`${API_QUIZ}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getQuizById = (id) => {
  return fetch(`${API_QUIZ}/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
