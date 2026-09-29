import React from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import {
    Droplet,
    BookOpen,
    UserPlus,
    ClipboardList,
    Package,
    FileText,
    BarChart3,
    Users2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DONATIONS_DATA = [
    { name: "Juan dela Cruz", id: "DON001", date: "2024-08-10", bloodType: "O+", status: "Completed" },
    { name: "Maria Dizon", id: "DON002", date: "2024-07-25", bloodType: "A+", status: "Completed" },
    { name: "Juan dela Cruz", id: "DON003", date: "2024-05-05", bloodType: "O+", status: "Completed" },
    { name: "Ricardo Garcia", id: "DON004", date: "2024-06-20", bloodType: "B+", status: "Deferred" },
    { name: "Roberto Mendoza", id: "DON005", date: "2024-08-01", bloodType: "O-", status: "Completed" },
];

const STATUS_BADGE = {
    Completed: "bg-emerald-100 text-emerald-700",
    Deferred: "bg-amber-100 text-amber-700",
};

const AVATAR_COLORS = [
    "bg-blue-100 text-blue-700",
    "bg-indigo-100 text-indigo-700",
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
];

function initialsOf(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
}

const QUICK_ACTIONS = [
    { label: "Add Donor", icon: Droplet, iconColor: "text-red-500" },
    { label: "Record Donation", icon: ClipboardList, iconColor: "text-slate-600" },
    { label: "Update Inventory", icon: Package, iconColor: "text-blue-600" },
    { label: "Review Requests", icon: FileText, iconColor: "text-amber-600", highlight: true },
    { label: "View Reports", icon: BarChart3, iconColor: "text-indigo-600" },
    { label: "Manage Users", icon: Users2, iconColor: "text-slate-700" },
];

function CardTitleRow({ icon: Icon, title, subtitle, action }) {
    return (
        <CardHeader className="flex-row items-start justify-between space-y-0 border-b border-slate-100 pb-4">
            <div className="flex items-start gap-2.5">
                <Icon className="mt-0.5 size-5 text-blue-600" />
                <div>
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                    {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
                </div>
            </div>
            {action}
        </CardHeader>
    );
}

const RecentDonationsQuickActions = () => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Recent Donations */}
            <Card className="rounded-2xl border-slate-200 shadow-sm lg:col-span-2">
                <CardTitleRow
                    icon={Droplet}
                    title="Recent Donations"
                    subtitle="Latest recorded donations"
                    action={
                        <button type="button" className="text-sm font-medium text-slate-500 hover:text-slate-700">
                            View all
                        </button>
                    }
                />
                <CardContent className="divide-y divide-slate-100 p-0">
                    {DONATIONS_DATA.map((d, i) => (
                        <div key={d.id} className="flex items-center justify-between px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                                        AVATAR_COLORS[i % AVATAR_COLORS.length]
                                    )}
                                >
                                    {initialsOf(d.name)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">{d.name}</p>
                                    <p className="mt-0.5 text-xs text-slate-400">
                                        {d.id} &middot; {d.date}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">
                                    {d.bloodType}
                                </span>
                                <span
                                    className={cn(
                                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                                        STATUS_BADGE[d.status]
                                    )}
                                >
                                    {d.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardTitleRow icon={BookOpen} title="Quick Actions" />
                <CardContent className="flex flex-col gap-2.5 p-5">
                    {QUICK_ACTIONS.map((action) => (
                        <button
                            key={action.label}
                            type="button"
                            className={cn(
                                "flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50",
                                action.highlight ? "border-amber-200 bg-amber-50/40" : "border-slate-200"
                            )}
                        >
                            <action.icon className={cn("size-4", action.iconColor)} />
                            {action.label}
                        </button>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default RecentDonationsQuickActions;