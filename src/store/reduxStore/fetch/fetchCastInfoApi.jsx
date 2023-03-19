/* React-specific entry point that automatically generates
hooks corresponding to the defined endpoints */
import { tvShowsApi } from './fetchTVShowsApi';
export const fetchCastInfo = tvShowsApi.injectEndpoints({
  reducerPath: 'fetchCastInfo',
  endpoints: (builder) => ({
    fetchCastDetails: builder.query({
      query: (castId) =>
        `fetch-movies?startingParams=${'person'}&categoryParams=${''}&id${castId}&page=${'1'}&searchQuery=${''}&others${''}&gte=${''}&lte${''}`

    }),
    fetchCastCombinedCredits: builder.query({
      query: (castId) =>
        `fetch-movies?startingParams=${'person'}&categoryParams=${'combined_credits'}&id${castId}&page=${'1'}&searchQuery=${''}&others${''}&gte=${''}&lte${''}`

    }),
    fetchCastImages: builder.query({
      query: (castId) =>
        `fetch-movies?startingParams=${'person'}&categoryParams=${'images'}&id${castId}&page=${'1'}&searchQuery=${''}&others${''}&gte=${''}&lte${''}`

    }),

  }),
});

export const {
  useFetchCastDetailsQuery,
  useFetchCastCombinedCreditsQuery,
  useFetchCastImagesQuery,
  // useUpdateTaskMutation
} = fetchCastInfo;
