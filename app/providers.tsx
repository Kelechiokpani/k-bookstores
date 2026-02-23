// "use client"
// import { Provider } from "react-redux"
// import { store } from "./store"
//
// export function Providers({ children }: { children: React.ReactNode }) {
//     return <Provider store={store}>{children}</Provider>
// }


"use client";

import { Provider } from "react-redux";
import { store } from "@/app/store";
import React from "react"; // Ensure React is imported

// Define the Interface for the props
interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}