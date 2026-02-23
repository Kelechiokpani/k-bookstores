"use client";
import { MapPin, Plus, MoreVertical, Home, Briefcase, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AddressSection() {
    // Mock data - replace with your actual fetch logic
    const addresses = [
        {
            id: 1,
            street: "123 Bookstore Avenue, Victoria Island",
            city: "Lagos",
            state: "Lagos",
            type: "Home",
            phone: "+234 801 234 5678",
            isDefault: true
        },
        {
            id: 2,
            street: "Plot 45, Tech Hub Crescent",
            city: "Yaba",
            state: "Lagos",
            type: "Work",
            phone: "+234 908 765 4321",
            isDefault: false
        }
    ];

    const getIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'home': return <Home className="w-4 h-4" />;
            case 'work': return <Briefcase className="w-4 h-4" />;
            default: return <Globe className="w-4 h-4" />;
        }
    };

    return (
        <section className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Shipping Addresses</h3>
                    <p className="text-sm text-slate-500">Manage your delivery locations for faster checkout.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-5 shadow-lg shadow-emerald-600/15 transition-all active:scale-95">
                    <Plus className="w-4 h-4 mr-2" /> Add New Address
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {addresses.map((addr) => (
                    <Card
                        key={addr.id}
                        className={`relative p-6 rounded-[1.5rem] border-2 transition-all duration-200 group ${
                            addr.isDefault
                                ? "border-emerald-500 bg-emerald-50/10 shadow-md"
                                : "border-slate-100 hover:border-slate-300 shadow-sm"
                        }`}
                    >
                        {/* Header: Badge and Options */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${addr.isDefault ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                                    {getIcon(addr.type)}
                                </div>
                                <span className="font-bold text-sm text-slate-700 uppercase tracking-wide">
                                    {addr.type}
                                </span>
                                {addr.isDefault && (
                                    <Badge className="bg-emerald-600 hover:bg-emerald-600 text-[10px] py-0 px-2">
                                        Default
                                    </Badge>
                                )}
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-600">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-xl p-2 border-slate-200">
                                    <DropdownMenuItem className="rounded-lg cursor-pointer">Edit Address</DropdownMenuItem>
                                    {!addr.isDefault && (
                                        <DropdownMenuItem className="rounded-lg cursor-pointer">Set as Default</DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem className="rounded-lg cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50">
                                        Remove
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Address Details */}
                        <div className="space-y-1.5">
                            <p className="font-semibold text-slate-800 leading-tight">
                                {addr.street}
                            </p>
                            <p className="text-sm text-slate-500 flex items-center">
                                <MapPin className="w-3 h-3 mr-1 opacity-70" />
                                {addr.city}, {addr.state}
                            </p>
                        </div>

                        {/* Footer: Phone Number */}
                        <div className="mt-6 pt-4 border-t border-slate-100/60">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Phone Number</p>
                            <p className="text-sm font-medium text-slate-700 mt-0.5">{addr.phone}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}