import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Users, UserCheck, Droplet, Package, ClipboardList, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SAMPLE_DATA = [
    {
        label: "TOTAL DONORS",
        value: 8,
        caption: "Registered donors",
        trend: "+3 this month",
        trendDirection: "up",
        icon: Users,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        label: "ELIGIBLE DONORS",
        value: 5,
        caption: "63% of total",
        trend: null,
        icon: UserCheck,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
    },
    {
        label: "TOTAL DONATIONS",
        value: 12,
        caption: "All-time records",
        trend: "+12 this month",
        trendDirection: "up",
        icon: Droplet,
        iconBg: "bg-red-100",
        iconColor: "text-red-500",
    },
    {
        label: "BLOOD UNITS",
        value: 183,
        caption: "Available in inventory",
        trend: null,
        icon: Package,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
    },
    {
        label: "PENDING REQUESTS",
        value: 2,
        caption: "Awaiting review",
        trend: "Needs attention",
        trendDirection: "down",
        icon: ClipboardList,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
    },
    {
        label: "LOW STOCK ALERTS",
        value: 4,
        caption: "Blood types affected",
        trend: "Action needed",
        trendDirection: "down",
        icon: AlertTriangle,
        iconBg: "bg-rose-100",
        iconColor: "text-rose-500",
    },
];

const Cards = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_DATA.map((item) => (
                <Card key={item.label} className="rounded-2xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                {item.label}
                            </p>
                            <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", item.iconBg)}>
                                <item.icon className={cn("size-4.5", item.iconColor)} strokeWidth={2} />
                            </div>
                        </div>

                        <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.caption}</p>

                        {item.trend && (
                            <p
                                className={cn(
                                    "mt-2 flex items-center gap-1 text-xs font-medium",
                                    item.trendDirection === "up" ? "text-emerald-600" : "text-red-500"
                                )}
                            >
                                {item.trendDirection === "up" ? (
                                    <ArrowUp className="size-3.5" />
                                ) : (
                                    <ArrowDown className="size-3.5" />
                                )}
                                {item.trend}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Cards;