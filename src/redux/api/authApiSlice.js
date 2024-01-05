import { apiSlice } from "./apiSlice";
// import { USERS_DATA_URL} from "../../constants/apiConfig";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubServices: builder.query({ //get all subServices
      query: () => ({
        url: `/subService/all`,
      }),
      providesTags: ["SubService"],
    }),
    getSubService: builder.query({ //get a subService   
      query: (id) => ({
        url: `/subservice/get/${id}`,
      }),
      providesTags: ["SubService"],
    }),
    addSubService: builder.mutation({
      query: (data) => ({
        url: `/subservice/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubService"]
    }),
    updateSubService: builder.mutation({
      query: (id, value) => ({
        url: `/${id}`,
        method: "PUT",
        body: value,
      }),
      invalidatesTag: ["SubCategory"]
    }),
    deleteSubService: builder.mutation({
      query: (id) => ({
        url: `/subservice/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['SubService']
    })
  }),
});

export const {
  useGetAllSubServicesQuery,
  useGetSubServiceQuery,
  useAddSubServiceMutation,
  useUpdateSubServiceMutation,
} = authApiSlice;

