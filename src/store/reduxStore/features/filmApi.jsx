/* React-specific entry point that automatically generates
       hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const filmApi = createApi({
  reducerPath: 'filmApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/',
  }),
  endpoints: (builder) => ({
    fetchLatestPopularMovies: builder.query({
      query: ({monthsAgoDate, currentDate}) =>
        `3/movie/now_playing?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&primary_release_date.gte=${monthsAgoDate}&primary_release_date.lte=${currentDate}&region=US`,
    }),
    fetchMovieCasts: builder.query({
      query: (movieId) =>
        `3/movie/${movieId}/credits?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
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
  useFetchMovieCastsQuery,
  // useUpdateTaskMutation
} = filmApi;
