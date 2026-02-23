import { api } from "@/app/api"
import { User } from "@/lib/types";


export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // --- AUTHENTICATION ---
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: data
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            }),
            // Invalidates User tag to force a fresh fetch of user details on login
            invalidatesTags: ["User"]
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ["User"]
        }),

        // --- USER PROFILE ---
        getMe: builder.query<User, void>({
            query: () => "/auth/profile",
            providesTags: ["User"]
        }),

        updateProfile: builder.mutation<User, Partial<User>>({
            query: (data) => ({
                url: "/auth/profile",
                method: "PATCH", // Using PATCH as it's better for partial updates
                body: data
            }),
            invalidatesTags: ["User"]
        })
    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useGetMeQuery,
    useLogoutMutation,
    useUpdateProfileMutation
} = authApi

