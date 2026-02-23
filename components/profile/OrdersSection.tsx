import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, ChevronRight, PackageCheck } from "lucide-react";

export function OrdersSection() {

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Recent Purchases</h3>

            <Card className="rounded-[1.5rem] border-slate-200/60 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-slate-50/50 px-6 py-4 flex justify-between items-center border-b border-slate-100">
                    <div className="flex gap-8">
                        <div className="hidden sm:block">
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Date</p>
                            <p className="text-sm font-semibold text-slate-700">Feb 24, 2024</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Order Number</p>
                            <p className="text-sm font-mono font-medium text-slate-700">#BK-99231</p>
                        </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 py-1 rounded-full font-medium shadow-none">
                        <PackageCheck className="w-3 h-3 mr-1.5" /> Delivered
                    </Badge>
                </div>

                <div className="p-6">
                    <div className="flex gap-6 items-center">
                        <div className="h-24 w-18 bg-slate-100 rounded-lg shadow-inner flex-shrink-0" />
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-lg">Purple Hibiscus</h4>
                            <p className="text-sm text-slate-500">Chimamanda Ngozi Adichie</p>
                            <div className="mt-3 flex items-center text-sm font-bold text-emerald-700">
                                ₦8,500 <span className="mx-2 text-slate-300 font-normal">|</span> <span className="text-slate-500 font-normal">1 Item</span>
                            </div>
                        </div>
                        <Button variant="outline" className="rounded-xl hidden md:flex border-slate-200">
                            Track Order <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}