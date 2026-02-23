import { api } from "@/app/api";
import { Category } from "./categorySlice";

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Fetches all categories
        getCategories: builder.query<Category[], void>({
            query: () => "/categories",
            providesTags: ["Categories"],
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;