import { api } from "@/app/api";
import { Product } from "./productSlice";

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Fetches all products (accepts optional query params)
        getProducts: builder.query<Product[], string | void>({
            query: (params) => `/products${params ? `?${params}` : ""}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: "Products" as const, id: _id })),
                        { type: "Products", id: "LIST" },
                    ]
                    : [{ type: "Products", id: "LIST" }],
        }),

        // Fetches a single product by ID
        getProduct: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;