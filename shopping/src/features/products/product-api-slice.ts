import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image : string;
  rating: {
    rate: string;
    count: string;
  };
  category : string;
};

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