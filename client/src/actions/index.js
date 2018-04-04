import axios from 'axios';

export function getBooks(limit = 5, start = 0, order = 'asc', list = '') {
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

export function getBookWithRewiewer(id) {
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
          type: 'GET_BOOK_W_REVIEWER',
          payload: response,
        });
      });
    });
  };
}

export function clearBookWithRewiewer() {
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: {
      book: {},
      reviewer: {},
    },
  };
}

export function addBook(book) {
  const request = axios.post('/api/book', book).then(response => response.data);
  return {
    type: 'ADD_BOOK',
    payload: request,
  };
}

export function clearNewBook() {
  return {
    type: 'CLEAR_NEWBOOK',
    payload: {},
  };
}

export function getBook(id) {
  const request = axios(`/api/getbook?id=${id}`).then(response => response.data);
  return {
    type: 'GET_BOOK',
    payload: request,
  };
}

export function updateBook(data) {
  const request = axios.post('/api/book_update', data).then(response => response.data);
  return {
    type: 'UPDATE_BOOK',
    payload: request,
  };
}

export function deleteBook(id) {
  const request = axios.delete(`/api/book_delete?id=${id}`).then(response => response.data);
  return {
    type: 'DELETE_BOOK',
    payload: request,
  };
}

export function clearBook() {
  return {
    type: 'CLEAR_BOOK',
    payload: {
      book: null,
      updatebook: false,
      postdeleted: false,
    },
  };
}

export function getUserPosts(userId) {
  const request = axios.get(`/api/user_posts?id=${userId}`).then(response => response.data);
  return {
    type: 'GET_USER_POSTS',
    payload: request,
  };
}

export function loginUser({ email, password }) {
  const request = axios.post('/api/login', { email, password }).then(response => response.data);

  return {
    type: 'LOGIN_USER',
    payload: request,
  };
}

export function auth() {
  const request = axios.get('/api/auth').then(response => response.data);

  return {
    type: 'USER_AUTH',
    payload: request,
  };
}
