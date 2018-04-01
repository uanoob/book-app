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
