import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, API_TAGS } from '../../constants/apiTags'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('token',token)
      if (token) {
        return headers.set("authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Error parsing token:", error);
    }
    
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: Object.values(API_TAGS),
  endpoints: (builder) => ({}),
});