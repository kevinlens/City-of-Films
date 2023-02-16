import { configureStore } from '@reduxjs/toolkit';
import { fetchApi } from './fetch/fetchApi';
// import usersReducer from '../fetch/users/usersSlice'
// import postsReducer from '../fetch/posts/postsSlice'
// import commentsReducer from '../fetch/comments/commentsSlice'

export const store = configureStore({
  reducer: {
    //what used to be the combineReducers
    // Add the generated reducer as a specific top-level slice
    // unique key that defines where the Redux store will
    // for storing the cache
    [fetchApi.reducerPath]: fetchApi.reducer,
    // users: usersReducer,
    // posts: postsReducer,
    // comments: commentsReducer
  },
  middleware: (getDefaultMiddleware) =>
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    //The concat() method is used to merge two or more arrays.
    getDefaultMiddleware().concat(fetchApi.middleware),
  });