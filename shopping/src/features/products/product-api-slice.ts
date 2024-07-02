import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Product from "../../types/Product";

export const apiProductSlice = createApi({  
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com',
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
  }),  
});

export const { useGetAllProductsQuery, useGetProductByIdQuery} = apiProductSlice;