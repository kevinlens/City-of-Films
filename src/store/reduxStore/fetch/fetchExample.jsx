// ! Just an example of another endpoint injection (to show that you could have more than one)
/* React-specific entry point that automatically generates
       hooks corresponding to the defined endpoints */
import { tvShowsApi } from './fetchTVShowsApi';
export const fetchExample = tvShowsApi.injectEndpoints({
  reducerPath: 'fetchExample',
  endpoints: (builder) => ({
    fetchTopRatedTVShows: builder.query({
      query: () =>
        `tv/top_rated?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=1`,
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
  useFetchTopRatedTVShowsQuery,
  // useUpdateTaskMutation
} = fetchExample;
