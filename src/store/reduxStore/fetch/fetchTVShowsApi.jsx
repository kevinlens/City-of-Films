// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const tvShowsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),
  endpoints: (builder) => ({
    //**!  FOR FETCHING TV SHOWS USING USER SEARCH QUERY */
    fetchTVShowsWithUserSearchQuery: builder.query({
      query: (searchQuery) =>
        `search/tv?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&query=${searchQuery}&include_adult=true`,
    }),
    //! FOR FETCHING TV SHOWS
    fetchPopularTVShows: builder.query({
      query: () =>
        `tv/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
    }),
    fetchPopularTVShowsAiredIn2022: builder.query({
      query: () =>
        `tv/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1&first_air_date.gte=2022-01-01&first_air_date.lte=2022-12-31`,
    }),
    fetchPopularTVShowsPage5: builder.query({
      query: () =>
        `tv/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=5`,
    }),
    fetchPopularTVShowsPage6: builder.query({
      query: () =>
        `tv/popular?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=6`,
    }),
    fetchTopRatedTVShows: builder.query({
      query: () =>
        `tv/top_rated?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
    }),
    fetchTopRatedTVShowsPage2: builder.query({
      query: () =>
        `tv/top_rated?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=2`,
    }),
    fetchTopRatedTVShowsPage3: builder.query({
      query: () =>
        `tv/top_rated?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=3`,
    }),
    //! FOR FETCHING TV SHOWS DETAILS
    fetchTVShowDetails: builder.query({
      query: (tvId) =>
        `tv/${tvId}?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
    }),
    fetchTVShowReviews: builder.query({
      query: (tvId) =>
        `tv/${tvId}/reviews?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
    }),

    fetchTVShowCredits: builder.query({
      query: (tvId) =>
        `tv/${tvId}/credits?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
    }),
    
    fetchTVShowTrailers: builder.query({
      query: (tvId) =>
        `tv/${tvId}/videos?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
    }),
    fetchTVShowKeywords: builder.query({
      query: (tvId) =>
        `tv/${tvId}/keywords?api_key=8e6ba047d3bc0b9dddf8392f32410006`,
    }),
    fetchTVShowRecommendations: builder.query({
      query: (tvId) =>
        `tv/${tvId}/recommendations?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
    }),
    
  }),
});
export const {
  useFetchTopRatedTVShowsQuery,
  useFetchTopRatedTVShowsPage2Query,
  useFetchTopRatedTVShowsPage3Query,
  useFetchPopularTVShowsQuery,
  useFetchPopularTVShowsPage5Query,
  useFetchPopularTVShowsPage6Query,
  useFetchTVShowDetailsQuery,
  useFetchTVShowReviewsQuery,
  useFetchTVShowCreditsQuery,
  useFetchTVShowTrailersQuery,
  useFetchTVShowKeywordsQuery,
  useFetchTVShowRecommendationsQuery,
  useFetchTVShowsWithUserSearchQueryQuery,
  useFetchPopularTVShowsAiredIn2022Query
  // useUpdateTaskMutation
} = tvShowsApi;
