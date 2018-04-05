import axios from 'axios';

import {
  GET_BOOKS,
  GET_BOOK_W_REVIEWER,
  CLEAR_BOOK_W_REVIEWER,
  ADD_BOOK,
  CLEAR_NEWBOOK,
  GET_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  CLEAR_BOOK,
} from './types';

export const getBooks = (limit = 5, start = 0, order = 'asc', list = '') => {
  const request = axios
    .get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then((response) => {
      if (list) {
        return [...list, ...response.data];
      }
      return response.data;
    });

  return {
    type: GET_BOOKS,
    payload: request,
  };
};

export const getBookWithRewiewer = (id) => {
  const request = axios.get(`/api/getBook?id=${id}`);

  return (dispatch) => {
    request.then(({ data }) => {
      const book = data;

      axios.get(`/api/get_reviewer?id=${book.ownerId}`).then(({ data }) => {
        const response = {
          book,
          reviewer: data,
        };
        dispatch({
          type: GET_BOOK_W_REVIEWER,
          payload: response,
        });
      });
    });
  };
};

export const clearBookWithRewiewer = () => ({
  type: CLEAR_BOOK_W_REVIEWER,
  payload: {
    book: {},
    reviewer: {},
  },
});

export const addBook = (book) => {
  const request = axios.post('/api/book', book).then(response => response.data);
  return {
    type: ADD_BOOK,
    payload: request,
  };
};

export const clearNewBook = () => ({
  type: CLEAR_NEWBOOK,
  payload: {},
});

export const getBook = (id) => {
  const request = axios(`/api/getbook?id=${id}`).then(response => response.data);
  return {
    type: GET_BOOK,
    payload: request,
  };
};

export const updateBook = (data) => {
  const request = axios.post('/api/book_update', data).then(response => response.data);
  return {
    type: UPDATE_BOOK,
    payload: request,
  };
};

export const deleteBook = (id) => {
  const request = axios.delete(`/api/book_delete?id=${id}`).then(response => response.data);
  return {
    type: DELETE_BOOK,
    payload: request,
  };
};

export const clearBook = () => ({
  type: CLEAR_BOOK,
  payload: {
    book: null,
    updatebook: false,
    postdeleted: false,
  },
});
