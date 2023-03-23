/* React-specific entry point that automatically generates
hooks corresponding to the defined endpoints */
import { tvShowsApi } from './fetchTVShowsApi';
export const fetchCastInfo = tvShowsApi.injectEndpoints({
  reducerPath: 'fetchCastInfo',
  endpoints: (builder) => ({
    fetchCastDetails: builder.query({
      query: (castId) =>
        `fetch-movies?startingParams=${'person'}&categoryParams=${''}&id${castId}`

    }),
    fetchCastCombinedCredits: builder.query({
      query: (castId) =>
        `fetch-movies?startingParams=${'person'}&categoryParams=${'combined_credits'}&id${castId}`

    }),
    fetchCastImages: builder.query({
      query: (castId) =>
        `fetch-movies?startingParams=${'person'}&categoryParams=${'images'}&id${castId}`

    }),

  }),
});

export const {
  useFetchCastDetailsQuery,
  useFetchCastCombinedCreditsQuery,
  useFetchCastImagesQuery,
  // useUpdateTaskMutation
} = fetchCastInfo;
