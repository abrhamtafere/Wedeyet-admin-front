import { apiSlice } from "./apiSlice";
// import { USERS_DATA_URL} from "../../constants/apiConfig";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // addData: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_DATA_URL}`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Data"],
    // }),
    // getUsersByProject: builder.query({
    //   query: (id) => ({
    //     url: `${USERS_DATA_URL}/projects/${id}`,
    //   }),
    //   providesTags: ["Data"],
    // }),
    // getProject: builder.query({
    //   query: (id) => ({
    //     url: `${USERS_DATA_URL}/projects/projectInfo/${id}`,
    //   }),
    //   providesTags: ["Project"],
    //   transformResponse: (response) => {
    //     // Transform the response data here
    //     const projectsData = response.map((project) => ({
    //       ...project,
    //       id: project.project_id, // Assuming project_id is the property in the response data
    //     }));

    //     return projectsData;
    //   },
    // }),
    // getAllProjects: builder.query({
    //   query: () => ({
    //     url: `${USERS_DATA_URL}/projects`,
    //   }),
    //   providesTags: ["Project"],
    //   transformResponse: (response) => {
    //     // Transform the response data here
    //     const projectsData = response.map((project) => ({
    //       ...project,
    //       id: project.project_id, // Assuming project_id is the property in the response data
    //     }));

    //     return projectsData;
    //   },
    // }),
    // addProject: builder.mutation({
    //   query: (formData) => ({
    //     url: `${USERS_DATA_URL}/project`,
    //     method: "POST",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["Project"],
    // }),
    // updateProjectInfo: builder.mutation({
    //   query: (editValues) => ({
    //     url: `${USERS_DATA_URL}/projects/update/info`,
    //     method: "PATCH",
    //     body: editValues,
    //   }),
    //   // Invalidate the cache for the "Data" tag and the specific project
    //   // invalidatesTags: (result, error, editValues) => [
    //   //   { type: "Data" },
    //   //   { type: "Data", id: editValues.project_id },
    //   // ],
    //   invalidatesTags: ["Project"],
    // }),
    // // deleteProject: builder.mutation({
    // //   query: (editValues) => ({
    // //     url: `${USERS_DATA_URL}/projects/delete/info`,
    // //     method: "DElETE",
    // //     body: editValues,
    // //   }),
    // //   invalidatesTags: ["Delete"],
    // // }), http://localhost:5000/api/superadmins/userReport
    // fetchProjectReport: builder.query({
    //   query: ({ startDate, endDate, projectId }) => ({
    //     url: '/superadmins/projectReport', //for test since superadmins only see it
    //     // url: `${USERS_DATA_URL}/projectReport`,
    //     method: 'PATCH', // Change the method to PATCH
    //     body: {
    //       start_date: startDate,
    //       end_date: endDate,
    //       Project_id: projectId,
    //     },
    //   }),
    //   providesTags: ["Project"],
    // }),
    // ProjectReport: builder.query({
    //   query: ({ startDate, endDate }) => ({
    //     url: '/superadmins/userReport', //for test since superadmins only see it
    //     // url: `${USERS_DATA_URL}/userReport`,
    //     method: 'PATCH', // Change the method to PATCH
    //     body: {
    //       start_date: startDate,
    //       end_date: endDate,
    //     },
    //   }),
    //   providesTags: ["Project", "Data"],
    // }),
    //
    addService: builder.mutation({
      query: (data) => ({
        url: `/service/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateService: builder.mutation({
      query: (id, editValues) => ({
        url: `/service/update/${id}`,
        method: "PUT",
        body: editValues,
      }),
      invalidatesTags: ["Category"],
    }),
    //     /service/delete/
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Category"]
    }),
    getAllCategory: builder.query({
      //get_all_subservices by service
      query: () => ({
        url: `/service/category/all`,
      }),
      providesTags: ["Category"],
    }),
    getAllServices: builder.query({
      //get all services
      query: () => ({
        url: `/service/all`,
      }),
      providesTags: ["Category"],
    }),
    getServiceById: builder.query({
      //get service
      query: (id) => ({
        url: `/service/get/${id}`,
      }),
      providesTags: ["Category"],
    }),
    getAllSubServicesById: builder.query({
      //all subservices by service id (under a specific service)
      query: (id) => ({
        url: `/service/category/${id}`,
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetServiceByIdQuery,
  useGetAllSubServicesByIdQuery,
  useGetAllServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = categoryApiSlice;
