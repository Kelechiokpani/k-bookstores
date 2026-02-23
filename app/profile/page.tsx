"use client";

import ProfilePage from "@/components/profile/ProfileSection";
import { AddressSection } from "@/components/profile/AddressSection";
import { OrdersSection } from "@/components/profile/OrdersSection";
import { Loader2, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {useGetMeQuery} from "@/features/auth/authApi";

const Profile = () => {
    const { data: user, isLoading, isError } = useGetMeQuery();

    // 1. Loading State
    if (isLoading) {
        return (
            <div className="flex h-[70vh] w-full items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-emerald-700" />
            </div>
        );
    }

    // 2. Auth Required / No User Found State
    if (isError || !user) {
        return (
            <div className="container flex h-[80vh] items-center justify-center px-4">
                <div className="max-w-md w-full text-center space-y-6 p-8 bg-white rounded-3xl border shadow-xl shadow-slate-200/50">
                    <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
                        <Lock className="h-10 w-10 text-emerald-700" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-slate-900">Login to Continue</h1>
                        <p className="text-slate-500 text-sm">
                            Please sign in to access your orders, saved addresses, and profile settings.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/sign-in">
                            <Button className="w-full bg-emerald-700 hover:bg-emerald-800 py-6 text-base rounded-xl group">
                                Sign In
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button variant="ghost" className="w-full text-slate-600">
                                Don't have an account? Create one
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <Link href="/books" className="text-xs font-medium text-emerald-700 hover:underline">
                            Back to Bookstore
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Main Dashboard (Authorized)
    return (
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-12 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <ProfilePage />
                <AddressSection />
            </div>
            <div className="w-full pt-4">
                <OrdersSection />
            </div>
        </div>
    );
};

export default Profile;