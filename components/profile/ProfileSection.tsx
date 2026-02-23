"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, User, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import {useGetMeQuery, useLogoutMutation, useUpdateProfileMutation} from "@/features/auth/authApi";

export default function ProfilePage() {
    const router = useRouter();
    const { toast } = useToast()

    // 1. Data Fetching
    const { data: user, isLoading: isFetching } = useGetMeQuery();

    console.log(user, "user")
    // 2. Mutations
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [logout] = useLogoutMutation();

    // 3. Local Form State
    const [formData, setFormData] = useState({ name: "", bio: "" });



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile(formData).unwrap();
            toast({
                title: "Success!",
                description: "Profile updated successfully!.",
            })
        } catch (err) {
            toast({
                title: "Failed!",
                description: "Failed to update profiles!.",
            })
        }
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            router.push("/login");
            toast({
                title: "Success!",
                description: "Logged out  successfully!.",
            })
        } catch (err) {
            toast({
                title: "Failed!",
                description: "Logout Failed!.",
            })
        }
    };

    if (isFetching) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold"> Profile</h2>

                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar Section */}
                    <div className="relative group">
                        <div className="h-24 w-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 overflow-hidden">
                            <User className="h-10 w-10" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 bg-emerald-700 text-white p-2 rounded-lg shadow-lg hover:bg-emerald-800 transition-colors">
                            <Package className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="flex-1 w-full space-y-4">
                        {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>*/}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500">Full Name</label>
                            <input
                                type="text"
                                value={user?.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full p-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-emerald-700 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500">Email Address</label>
                            <input
                                type="email"
                                readOnly
                                value={user?.email || ""}
                                className="w-full p-2.5 bg-slate-100 border rounded-lg text-slate-500 cursor-not-allowed outline-none"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            className="bg-emerald-700 hover:bg-emerald-800 min-w-[140px]"
                        >
                            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin"/> : "Save Changes"}
                        </Button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}