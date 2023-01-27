/* React-specific entry point that automatically generates
       hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const filmApi = createApi({
  reducerPath: 'filmApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/movie/',
  }),
  endpoints: (builder) => ({
    fetchLatestPopularMovies: builder.query({
      query: ({monthsAgoDate, currentDate}) =>
        `now_playing?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&primary_release_date.gte=${monthsAgoDate}&primary_release_date.lte=${currentDate}&region=US`,
    }),
    fetchMovieDetails: builder.query({
      query: (movieId) =>
        `${movieId}?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
    }),
    fetchMovieReviews: builder.query({
      query: (movieId) =>
        `${movieId}/reviews?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
    }),
    // updateTask: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/tasks/${id}`,
    //     method: 'PUT',
    //     body: rest,
    //   }),
    // })
  }),
});

export const {
  useFetchLatestPopularMoviesQuery,
  useFetchMovieDetailsQuery,
  useFetchMovieReviewsQuery,
  // useUpdateTaskMutation
} = filmApi;
