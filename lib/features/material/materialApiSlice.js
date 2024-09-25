import { apiSlice } from "../api/apiSlice";

export const materialApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMaterialList: builder.query({
            query: (page = 1) => ({
                url: `/auth/interview/material-purchase?page=${page}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['MaterialPurchases'],
        }),
    }),
});

export const { useGetMaterialListQuery } = materialApiSlice;
