import React from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Package, ClipboardList } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

const INVENTORY_DATA = [
    { type: "A+", units: 48, status: "normal" },
    { type: "A-", units: 14, status: "low" },
    { type: "B+", units: 35, status: "normal" },
    { type: "B-", units: 4, status: "critical" },
    { type: "AB+", units: 22, status: "normal" },
    { type: "AB-", units: 8, status: "low" },
    { type: "O+", units: 55, status: "normal" },
    { type: "O-", units: 12, status: "low" },
];

const STATUS_COLOR = {
    normal: "#3b82f6",
    low: "#f59e0b",
    critical: "#ef4444",
};

const REQUESTS_DATA = [
    { requester: "Nurse Ana Reyes", date: "2024-08-20", units: 3, bloodType: "O-", status: "Pending" },
    { requester: "Nurse Jose Bautista", date: "2024-08-18", units: 2, bloodType: "A+", status: "Approved" },
    { requester: "Nurse Ana Reyes", date: "2024-08-15", units: 5, bloodType: "B+", status: "Fulfilled" },
    { requester: "Nurse Jose Bautista", date: "2024-08-12", units: 1, bloodType: "AB+", status: "Rejected" },
];

const STATUS_BADGE = {
    Pending: "bg-amber-100 text-amber-700",
    Approved: "bg-blue-100 text-blue-700",
    Fulfilled: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-600",
};

function CardTitleRow({ icon: Icon, iconBg, iconColor, title, subtitle, action }) {
    return (
        <CardHeader className="flex-row items-start justify-between space-y-0 border-b border-slate-100 pb-4">
            <div className="flex items-start gap-3">
                <div className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg", iconBg)}>
                    <Icon className={cn("size-4", iconColor)} />
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                    <p className="text-xs text-slate-400">{subtitle}</p>
                </div>
            </div>
            {action}
        </CardHeader>
    );
}

const BloodInventoryRequests = () => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Blood Inventory by Type */}
            <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardTitleRow
                    icon={Package}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    title="Blood Inventory by Type"
                    subtitle="Current available units"
                />
                <CardContent className="pt-4">
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={INVENTORY_DATA} margin={{ left: -20, right: 10, top: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="type" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: "#f1f5f9" }}
                                contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", fontSize: 13 }}
                            />
                            <Bar dataKey="units" radius={[6, 6, 0, 0]} maxBarSize={40}>
                                {INVENTORY_DATA.map((entry) => (
                                    <Cell key={entry.type} fill={STATUS_COLOR[entry.status]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Recent Blood Requests */}
            <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardTitleRow
                    icon={ClipboardList}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    title="Recent Blood Requests"
                    subtitle="Latest submitted requests"
                    action={
                        <button type="button" className="text-sm font-medium text-slate-500 hover:text-slate-700">
                            View all
                        </button>
                    }
                />
                <CardContent className="divide-y divide-slate-100 p-0">
                    {REQUESTS_DATA.map((req, i) => (
                        <div key={i} className="flex items-center justify-between px-5 py-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{req.requester}</p>
                                <p className="mt-0.5 text-xs text-slate-400">
                                    {req.date} &middot; {req.units} units
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">
                                    {req.bloodType}
                                </span>
                                <span
                                    className={cn(
                                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                                        STATUS_BADGE[req.status]
                                    )}
                                >
                                    {req.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default BloodInventoryRequests;