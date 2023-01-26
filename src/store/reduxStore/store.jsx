import { configureStore } from '@reduxjs/toolkit';
import { filmApi } from './features/filmApi';
// import usersReducer from '../features/users/usersSlice'
// import postsReducer from '../features/posts/postsSlice'
// import commentsReducer from '../features/comments/commentsSlice'

export const store = configureStore({
  reducer: {
    //what used to be the combineReducers
    // Add the generated reducer as a specific top-level slice
    // unique key that defines where the Redux store will
    // for storing the cache
    [filmApi.reducerPath]: filmApi.reducer,
    // users: usersReducer,
    // posts: postsReducer,
    // comments: commentsReducer
  },
  middleware: (getDefaultMiddleware) =>
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    //The concat() method is used to merge two or more arrays.
    getDefaultMiddleware().concat(filmApi.middleware),
});
