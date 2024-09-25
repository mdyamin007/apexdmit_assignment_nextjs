// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from "@/lib/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://devapi.propsoft.ai/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access_token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['MaterialPurchases'],
  endpoints: (builder) => ({})
});

export const { useLoginMutation } = apiSlice;
