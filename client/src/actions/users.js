import axios from 'axios';

import { GET_USER_POSTS, LOGIN_USER, USER_AUTH, GET_USERS, USER_REGISTER } from './types';

export const getUserPosts = (userId) => {
  const request = axios.get(`/api/user_posts?id=${userId}`).then(response => response.data);
  return {
    type: GET_USER_POSTS,
    payload: request,
  };
};

export const loginUser = ({ email, password }) => {
  const request = axios.post('/api/login', { email, password }).then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const auth = () => {
  const request = axios.get('/api/auth').then(response => response.data);

  return {
    type: USER_AUTH,
    payload: request,
  };
};

export const getUsers = () => {
  const request = axios.get('/api/users').then(response => response.data);
  return {
    type: GET_USERS,
    payload: request,
  };
};

export const userRegister = (user, userList) => {
  const request = axios.post('/api/register', user);
  return (dispatch) => {
    request.then(({ data }) => {
      const users = data.success ? [...userList, data.user] : userList;
      const response = {
        success: data.success,
        users,
      };
      dispatch({
        type: USER_REGISTER,
        payload: response,
      });
    });
  };
};
