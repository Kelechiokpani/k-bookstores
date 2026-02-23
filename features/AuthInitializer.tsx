"use client"
import { useEffect } from "react"
import { useGetMeQuery } from "@/features/auth/authApi"
import { setCredentials } from "@/features/auth/authSlice"
import { useAppDispatch } from "@/app/hooks"

export function AuthInitializer() {
    const dispatch = useAppDispatch()
    const { data } = useGetMeQuery()

    useEffect(() => {
        if (data) {
            dispatch(setCredentials({
                user: data,
                token: localStorage.getItem("token") || "",
            }))
        }
    }, [data, dispatch])

    return null
}
