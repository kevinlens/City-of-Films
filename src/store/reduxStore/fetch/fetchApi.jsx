/* React-specific entry point that automatically generates
       hooks corresponding to the defined endpoints */
import { tvShowsApi } from './fetchTVShowsApi';
export const fetchApi = tvShowsApi.injectEndpoints({
  reducerPath: 'fetchApi',
  endpoints: (builder) => ({
    //**!  FOR FETCHING MOVIES USING USER SEARCH QUERY */
    fetchMoviesWithUserSearchQuery: builder.query({
      query: ({ searchQuery }) =>
        `search/movie?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&query=${searchQuery}&page=1&include_adult=true`,
    }),
    //**!  FOR FETCHING MOVIES */
    fetchNowPlayingMovies: builder.query({
      query: ({ monthsAgoDate, currentDate }) =>
        `movie/now_playing?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&primary_release_date.gte=${monthsAgoDate}&primary_release_date.lte=${currentDate}&region=US`,
    }),
    // --------------------------------------------------------
    fetchLatestMovies: builder.query({
      query: ({ last60DaysDate, currentDate }) =>
        `movie/now_playing?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&primary_release_date.gte=${last60DaysDate}&primary_release_date.lte=${currentDate}&region=US`,
    }),
    //API ONLY ALLOWS FOR MAX OF 20 ELEMENTS PER PAGE / API CALL
    fetchLatestMoviesPage2: builder.query({
      query: ({ last60DaysDate, currentDate }) =>
        `movie/now_playing?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=2&primary_release_date.gte=${last60DaysDate}&primary_release_date.lte=${currentDate}&region=US`,
    }),
    // --------------------------------------------------------
    fetchHighestRated: builder.query({
      query: ({ lastDecadeDate }) =>
        `movie/top_rated?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&primary_release_date.gte=${lastDecadeDate}`,
    }),
    fetchHighestRatedPage2: builder.query({
      query: ({ lastDecadeDate }) =>
        `movie/top_rated?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=2&primary_release_date.gte=${lastDecadeDate}`,
    }),
    fetchHighestRatedPage3: builder.query({
      query: ({ lastDecadeDate }) =>
        `movie/top_rated?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=3&primary_release_date.gte=${lastDecadeDate}`,
    }),
    // --------------------------------------------------------
    fetchPopularMovies: builder.query({
      query: () =>
        `movie/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
    }),
    fetchPopularMoviesPage2: builder.query({
      query: () =>
        `movie/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=2`,
    }),
    fetchPopularMoviesForYear2022: builder.query({
      query: () =>
        `movie/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&primary_release_date.gte=2022-01-01&primary_release_date.lte=2022-12-31&region=US`,
    }),
    fetchPopularMoviesForYear2021: builder.query({
      query: () =>
        `movie/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&primary_release_date.gte=2021-01-01&primary_release_date.lte=2021-12-31&region=US`,
    }),
    // --------------------------------------------------------
    fetchUpcomingMovies: builder.query({
      query: ({ currentDate }) =>
        `movie/upcoming?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&primary_release_date.gte=${currentDate}&region=US`,
    }),
    //**! FOR FETCHING MOVIE RECOMMENDATIONS*/
    fetchMovieRecommendation: builder.query({
      query: (movieId) =>
        `movie/${movieId}/recommendations?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
    }),
    //**! FOR FETCHING MOVIE DETAILS */
    fetchMovieDetails: builder.query({
      query: (movieId) =>
        `movie/${movieId}?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
    }),
    fetchMovieCredits: builder.query({
      query: (movieId) =>
        `movie/${movieId}/credits?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
    }),
    fetchMovieReviews: builder.query({
      query: (movieId) =>
        `movie/${movieId}/reviews?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
    }),
    fetchMovieTrailers: builder.query({
      query: (movieId) =>
        `movie/${movieId}/videos?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
    }),
    fetchMovieKeywords: builder.query({
      query: (movieId) =>
        `movie/${movieId}/keywords?api_key=8e6ba047d3bc0b9dddf8392f32410006`,
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
