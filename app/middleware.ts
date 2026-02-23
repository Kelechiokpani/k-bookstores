import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { toast } from "@/components/ui/use-toast";
import { clearAuth } from '@/features/auth/authSlice';

export const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        // Narrow the type of payload
        const payload = action.payload as { status?: number; data?: { message?: string } };

        if (payload.status === 401) {
            toast({
                variant: "destructive",
                title: "Authentication Required",
                description: "Please login to add items to your cart or wishlist.",
            });

            api.dispatch(clearAuth());
        }
    }

    return next(action);
};