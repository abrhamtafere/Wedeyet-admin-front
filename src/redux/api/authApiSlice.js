import { apiSlice } from "./apiSlice";
// import { USERS_DATA_URL} from "../../constants/apiConfig";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/auth/get/`,
      }),
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/auth/get/${id}`,
      }),
      providesTags: ["User"],
    }),
    getCurrrentUser: builder.query({
      query: (id) => ({
        url: `/auth/get/${id}`,
      }),
      providesTags: ["User"],
    }),
    getLogoutUser: builder.query({
      query: () => ({
        url: `/auth/logout`,
      }),
      // providesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (id, value) => ({
        url: `/auth/update/${id}`,
        method: "PUT",
        body: value,
      }),
      invalidatesTag: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetCurrrentUserQuery,
  useGetLogoutUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApiSlice;
