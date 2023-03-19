// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const tvShowsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/.netlify/functions',
  }),
  endpoints: (builder) => ({
    //**!  FOR FETCHING TV SHOWS USING USER SEARCH QUERY */
    fetchTVShowsWithUserSearchQuery: builder.query({
      query: (searchQuery) =>
        `fetch-movies?startingParams=${'search/tv'}&searchQuery=${searchQuery}&page=${'1'}`,
    }),
    //! FOR FETCHING TV SHOWS
    fetchPopularTVShows: builder.query({
      query: () => `fetch-movies?startingParams=${'tv/popular'}&page=${'1'}`,
    }),
    fetchPopularTVShowsAiredIn2022: builder.query({
      query: () =>
        `fetch-movies?startingParams=${'tv/popular'}&gteAD=${'2022-01-01'}&lteAD${'2022-12-31'}&page=${'1'}`,
    }),
    fetchPopularTVShowsPage5: builder.query({
      query: () => `fetch-movies?startingParams=${'tv/popular'}&page=${'5'}`,
    }),
    fetchPopularTVShowsPage6: builder.query({
      query: () => `fetch-movies?startingParams=${'tv/popular'}&page=${'6'}`,
    }),
    fetchTopRatedTVShows: builder.query({
      query: () => `fetch-movies?startingParams=${'tv/top_rated'}&page=${'1'}`,
    }),
    fetchTopRatedTVShowsPage2: builder.query({
      query: () => `fetch-movies?startingParams=${'tv/top_rated'}&page=${'2'}`,
    }),
    fetchTopRatedTVShowsPage3: builder.query({
      query: () => `fetch-movies?startingParams=${'tv/top_rated'}&page=${'3'}`,
    }),
    //! FOR FETCHING TV SHOWS DETAILS
    fetchTVShowDetails: builder.query({
      query: (tvId) =>
        `fetch-movies?startingParams=${'tv'}&id=${tvId}`,
    }),
    fetchTVShowReviews: builder.query({
      query: (tvId) =>
        `fetch-movies?startingParams=${'tv'}&categoryParams=${'reviews'}&id=${tvId}&page=${'1'}`,
    }),

    fetchTVShowCredits: builder.query({
      query: (tvId) =>
        `fetch-movies?startingParams=${'tv'}&categoryParams=${'credits'}&id=${tvId}&page=${'1'}`,
    }),

    fetchTVShowTrailers: builder.query({
      query: (tvId) =>
        `fetch-movies?startingParams=${'tv'}&categoryParams=${'videos'}&id=${tvId}&page=${'1'}`,
    }),
    fetchTVShowKeywords: builder.query({
      query: (tvId) =>
        `fetch-movies?startingParams=${'tv'}&categoryParams=${'keywords'}&id=${tvId}&page=${'1'}`,
    }),
    fetchTVShowRecommendations: builder.query({
      query: (tvId) =>
        `fetch-movies?startingParams=${'tv'}&categoryParams=${'recommendations'}&id=${tvId}&page=${'1'}`,
    }),
    // fetchTVShow: builder.query({
    //   query: (tvId) =>
    //     `tv/${tvId}/recommendations?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
    // }),
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
  useFetchPopularTVShowsAiredIn2022Query,
  // useUpdateTaskMutation
} = tvShowsApi;
