import { apiSlice } from "./apiSlice";
// import { USERS_DATA_URL} from "../../constants/apiConfig";

export const placeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaces: builder.query({
      query: () => ({
        url: `/place/all`,
      }),
      providesTags: ["Place"],
    }),
    getPlace: builder.query({
      // the postman is different here
      query: (id) => ({
        url: `/place/get/${id}`,
      }),
      providesTags: ["Place"],
    }),
    searchPlaces: builder.query({ // must be modified and reviewed since it is not correct for search
      query: ({ subCategory, name, category, area }) => ({
        url: `/place/search?name=${name}&subCategory=${subCategory}&category=${category}&area=${area}`,
      }),
      providesTags: ["Place"],
    }),
    searchPlaceByLocation: builder.query({
      query: ({ category, subCategory, location }) => ({
        url: `place/?category=${category}&subCategory=${subCategory}&location=${location.join(',')}`,
    }),
    providesTags: ["Place"],
  }),
    addPlace: builder.mutation({
      query: (data) => ({
        url: `/place/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Place"],
    }),
    updatePlace: builder.mutation({
      query: (id, value) => ({
        url: `/place/update/${id}`,
        method: "PUT",
        body: value,
      }),
      invalidatesTag: ["Place"],
    }),
    deletePlace: builder.mutation({
      query: (id) => ({
        url: `/place/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Place"],
    }),
  }),
});

export const {
  useGetAllPlacesQuery,
  useGetPlaceQuery,
  useSearchPlacesQuery,
  useSearchPlaceByLocationQuery,
  useAddPlaceMutation,
  useUpdatePlaceMutation,
  useDeletePlaceMutation,
} = placeApiSlice;
