"use client";
import React, { useState } from "react";
import { User, MapPin, Package, LogOut, Menu, X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProfilePage from "@/components/profile/ProfileSection";
import { OrdersSection } from "@/components/profile/OrdersSection";
import { AddressSection } from "@/components/profile/AddressSection";
import { Button } from "@/components/ui/button";


export default function UserDashboard() {
    const [activeSection, setActiveSection] = useState("profile");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sidebarItems = [
        { id: "profile", label: "Account Info", icon: User },
        { id: "orders", label: "My Orders", icon: Package },
        { id: "address", label: "Addresses", icon: MapPin },
    ];

    // Helper to close menu and change section
    const handleSectionChange = (id: string) => {
        setActiveSection(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">

            {/* --- MOBILE HEADER --- */}
            <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b sticky top-0 z-50">

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu size={24} />
                </Button>
            </header>

            {/* --- MOBILE SIDEBAR (OVERLAY) --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] md:hidden"
                        />
                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-62 bg-white z-[70] md:hidden flex flex-col shadow-xl"
                        >
                            <div className="p-6 flex items-center justify-between border-b">
                                <span className="font-bold text-emerald-700">Settings</span>
                                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={20} />
                                </Button>
                            </div>
                            <nav className="flex-1 p-4 space-y-2">
                                {sidebarItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSectionChange(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all ${
                                            activeSection === item.id
                                                ? "bg-emerald-600 text-white shadow-md"
                                                : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        <item.icon size={20} />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                            <div className="p-4 border-t">
                                <Button variant="ghost" className="w-full justify-start gap-3 text-red-500">
                                    <LogOut size={20} /> Logout
                                </Button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* --- DESKTOP SIDEBAR --- */}
            <aside className="w-60 bg-white border-r hidden md:flex flex-col sticky top-0 h-screen">
                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                activeSection === item.id
                                    ? "bg-emerald-600 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>

            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 overflow-x-hidden">
                <div className="p-4 sm:p-6 md:p-10  mx-auto">
                    {/* Section Header (Mobile friendly) */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-800 capitalize">
                            {activeSection.replace('-', ' ')}
                        </h1>
                        <p className="text-slate-500 text-sm">Manage your {activeSection} and account preferences.</p>
                    </div>

                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeSection === "profile" && <ProfilePage />}
                        {activeSection === "orders" && <OrdersSection />}
                        {activeSection === "address" && <AddressSection />}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}