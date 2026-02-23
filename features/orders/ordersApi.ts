import { api } from "@/app/api";
import { Order } from "./orderSlice";

export const orderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Creates a new order
        createOrder: builder.mutation<Order, Partial<Order>>({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data
            }),
            // Clears cart and refreshes order list
            invalidatesTags: ["Orders", "Cart"]
        }),

        // Fetches the logged-in user's order history
        getMyOrders: builder.query<Order[], void>({
            query: () => "/orders/my",
            providesTags: ["Orders"]
        }),

        // Fetch a specific order by ID
        getOrderDetails: builder.query<Order, string>({
            query: (id) => `/orders/${id}`,
            providesTags: (result, error, id) => [{ type: "Orders", id }]
        })
    })
});

export const {
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useGetOrderDetailsQuery
} = orderApi;