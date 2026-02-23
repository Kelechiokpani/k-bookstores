import { api } from "@/app/api";
import { Brand } from "./brandSlice";

export const brandApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Fetches all brands from the database
        getBrands: builder.query<Brand[], void>({
            query: () => "/brands",
            providesTags: ["Brands"],
        }),
    }),
});

export const { useGetBrandsQuery } = brandApi;