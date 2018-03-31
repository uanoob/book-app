import { combineReducers } from 'redux';

import booksReducer from './books_reducer';
import usersReducer from './users_reducer';

const rootReducer = combineReducers({ booksReducer, usersReducer });

export default rootReducer;
