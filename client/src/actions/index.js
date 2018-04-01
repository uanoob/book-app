import axios from 'axios';

export default function getBooks(limit = 5, start = 0, order = 'asc', list = '') {
  const request = axios
    .get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then((response) => {
      if (list) {
        return [...list, ...response.data];
      }
      return response.data;
    });

  return {
    type: 'GET_BOOKS',
    payload: request,
  };
}
