/* React-specific entry point that automatically generates
hooks corresponding to the defined endpoints */
import { tvShowsApi } from './fetchTVShowsApi';
export const fetchCastInfo = tvShowsApi.injectEndpoints({
  reducerPath: 'fetchCastInfo',
  endpoints: (builder) => ({
    fetchCastDetails: builder.query({
      query: (castId) =>
        `person/${castId}?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
    }),
    fetchCastCombinedCredits: builder.query({
      query: (castId) =>
        `person/${castId}/combined_credits?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US`,
    }),
    fetchCastImages: builder.query({
      query: (castId) =>
        `person/${castId}/images?api_key=8e6ba047d3bc0b9dddf8392f32410006`,
    }),

  }),
});

export const {
  useFetchCastDetailsQuery,
  useFetchCastCombinedCreditsQuery,
  useFetchCastImagesQuery,
  // useUpdateTaskMutation
} = fetchCastInfo;
