import { api } from "@/app/api";
import { Address } from "./addressSlice";

export const addressApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Fetches all addresses for the logged-in user
        getAddresses: builder.query<Address[], void>({
            query: () => "/address",
            providesTags: ["Address"]
        }),

        // Adds a new address
        addAddress: builder.mutation<Address, Partial<Address>>({
            query: (data) => ({
                url: "/address",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Address"]
        }),

        // Optional: Delete an address
        deleteAddress: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/address/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Address"]
        })
    })
});

export const {
    useGetAddressesQuery,
    useAddAddressMutation,
    useDeleteAddressMutation
} = addressApi;