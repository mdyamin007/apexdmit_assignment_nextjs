import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Material Purchase List with pagination
        materialList: builder.query({
            // Use the `page` parameter to specify the current page of results
            query: (page = 1) => ({
                url: `/auth/interview/material-purchase?page=${page}`, // Append the page query parameter
                method: 'GET',
            }),
            // Add a transformResponse to handle pagination response if needed
            transformResponse: (response) => {
                // You can manipulate the response here if needed
                return response;
            },
            // Optionally, define a providesTags for caching purposes
            providesTags: ['MaterialPurchases'],
        }),
    }),
});

// Export the auto-generated hook for the materialList query
export const { useMaterialListQuery } = authApiSlice;
