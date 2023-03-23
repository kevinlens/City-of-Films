/* React-specific entry point that automatically generates
       hooks corresponding to the defined endpoints */
import { tvShowsApi } from './fetchTVShowsApi';
export const fetchApi = tvShowsApi.injectEndpoints({
  reducerPath: 'fetchApi',
  endpoints: (builder) => ({
    //**!  FOR FETCHING MOVIES USING USER SEARCH QUERY */
    fetchMoviesWithUserSearchQuery: builder.query({
      query: ({ searchQuery }) =>
        `fetch-movies?startingParams=${'search/movie'}&searchQuery=${searchQuery}&page=${'1'}`
    }),
    //**!  FOR FETCHING MOVIES */
    fetchNowPlayingMovies: builder.query({
      query: ({ monthsAgoDate, currentDate }) =>
        `fetch-movies?startingParams=${'movie/now_playing'}&gte=${monthsAgoDate}&lte${currentDate}&page=${'1'}`

    }),
    // --------------------------------------------------------
    fetchLatestMovies: builder.query({
      query: ({ last60DaysDate, currentDate }) =>
        `fetch-movies?startingParams=${'movie/now_playing'}&gte=${last60DaysDate}&lte${currentDate}&page=${'1'}`

    }),
    //API ONLY ALLOWS FOR MAX OF 20 ELEMENTS PER PAGE / API CALL
    fetchLatestMoviesPage2: builder.query({
      query: ({ last60DaysDate, currentDate }) =>
        `fetch-movies?startingParams=${'movie/now_playing'}&page=${'2'}&gte=${last60DaysDate}&lte${currentDate}`
    }),
    // --------------------------------------------------------
    fetchHighestRated: builder.query({
      query: ({ lastDecadeDate }) =>
        `fetch-movies?startingParams=${'movie/top_rated'}&page=${'1'}&gte=${lastDecadeDate}`
    }),
    fetchHighestRatedPage2: builder.query({
      query: ({ lastDecadeDate }) =>
        `fetch-movies?startingParams=${'movie/top_rated'}&page=${'2'}&gte=${lastDecadeDate}`

    }),
    fetchHighestRatedPage3: builder.query({
      query: ({ lastDecadeDate }) =>
        `fetch-movies?startingParams=${'movie/top_rated'}&page=${'3'}&gte=${lastDecadeDate}`
    }),
    // --------------------------------------------------------
    fetchPopularMovies: builder.query({
      query: () =>
        `fetch-movies?startingParams=${'movie/popular'}&page=${'1'}`
    }),
    fetchPopularMoviesPage2: builder.query({
      query: () =>
        `fetch-movies?startingParams=${'movie/popular'}&page=${'2'}`
    }),
    fetchPopularMoviesForYear2022: builder.query({
      query: () =>
        `fetch-movies?startingParams=${'movie/popular'}&gte=${'2022-01-01'}&lte${'2022-12-31'}&page=${'1'}`
    }),
    fetchPopularMoviesForYear2021: builder.query({
      query: () =>
        `fetch-movies?startingParams=${'movie/popular'}&gte=${'2021-01-01'}&lte${'2021-12-31'}&page=${'1'}`
    }),
    // --------------------------------------------------------
    fetchUpcomingMovies: builder.query({
      query: ({ currentDate }) =>
        `fetch-movies?startingParams=${'movie/upcoming'}&gte=${currentDate}&page=${'1'}`

    }),
    //**! FOR FETCHING MOVIE RECOMMENDATIONS*/
    fetchMovieRecommendation: builder.query({
      query: (movieId) =>
        `fetch-movies?startingParams=${'movie'}&categoryParams=${'recommendations'}&id=${movieId}&page=${'1'}`

    }),
    //**! FOR FETCHING MOVIE DETAILS */
    fetchMovieDetails: builder.query({
      query: (movieId) =>
        `fetch-movies?startingParams=${'movie'}&id=${movieId}`

    }),
    fetchMovieCredits: builder.query({
      query: (movieId) =>
        `fetch-movies?startingParams=${'movie'}&categoryParams=${'credits'}&id=${movieId}&page=${'1'}`

    }),
    fetchMovieReviews: builder.query({
      query: (movieId) =>
        `fetch-movies?startingParams=${'movie'}&categoryParams=${'reviews'}&id=${movieId}&page=${'1'}`

    }),
    fetchMovieTrailers: builder.query({
      query: (movieId) =>
        `fetch-movies?startingParams=${'movie'}&categoryParams=${'videos'}&id=${movieId}&page=${'1'}`

    }),
    fetchMovieKeywords: builder.query({
      query: (movieId) =>
        `fetch-movies?startingParams=${'movie'}&categoryParams=${'keywords'}&id=${movieId}&page=${'1'}`
    }),
    // fetchCastImagePath: builder.query({
    //   query: (castId) =>
    //     `person/{castId}/images?api_key=8e6ba047d3bc0b9dddf8392f32410006`,
    // }),
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
  useFetchMoviesWithUserSearchQueryQuery,
  useFetchNowPlayingMoviesQuery,
  useFetchLatestMoviesQuery,
  useFetchLatestMoviesPage2Query,
  useFetchHighestRatedQuery,
  useFetchHighestRatedPage2Query,
  useFetchHighestRatedPage3Query,
  useFetchMovieDetailsQuery,
  useFetchPopularMoviesQuery,
  useFetchPopularMoviesPage2Query,
  useFetchUpcomingMoviesQuery,
  useFetchMovieCreditsQuery,
  useFetchMovieReviewsQuery,
  useFetchMovieTrailersQuery,
  useFetchMovieRecommendationQuery,
  useFetchMovieKeywordsQuery,
  useFetchPopularMoviesForYear2022Query,
  useFetchPopularMoviesForYear2021Query,
  // useUpdateTaskMutation
} = fetchApi;
