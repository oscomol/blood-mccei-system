import React from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Droplet } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const TREND_DATA = [
    { month: "Jan", donations: 8, pending: 2 },
    { month: "Feb", donations: 14, pending: 3 },
    { month: "Mar", donations: 11, pending: 2 },
    { month: "Apr", donations: 19, pending: 4 },
    { month: "May", donations: 16, pending: 3 },
    { month: "Jun", donations: 21, pending: 5 },
    { month: "Jul", donations: 18, pending: 3 },
    { month: "Aug", donations: 25, pending: 4 },
    { month: "Sep", donations: 20, pending: 3 },
    { month: "Oct", donations: 17, pending: 2 },
    { month: "Nov", donations: 23, pending: 4 },
    { month: "Dec", donations: 14, pending: 2 },
];

const BLOOD_TYPE_DATA = [
    { type: "A+", value: 28, color: "#2563eb" },
    { type: "A-", value: 6, color: "#bfdbfe" },
    { type: "AB+", value: 10, color: "#1e3a8a" },
    { type: "AB-", value: 4, color: "#1e40af" },
    { type: "B+", value: 16, color: "#93c5fd" },
    { type: "B-", value: 5, color: "#3b82f6" },
    { type: "O+", value: 22, color: "#1d4ed8" },
    { type: "O-", value: 9, color: "#60a5fa" },
];

function ChartHeader({ title, subtitle }) {
    return (
        <CardHeader className="flex-row items-start gap-3 space-y-0 border-b border-slate-100 pb-4">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Droplet className="size-4 text-blue-600" />
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
        </CardHeader>
    );
}

const MonthlyDonation = () => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Monthly Donation Trends */}
            <Card className="rounded-2xl border-slate-200 shadow-sm lg:col-span-2">
                <ChartHeader title="Monthly Donation Trends" subtitle="Historical donation activity — current year" />
                <CardContent className="pt-4">
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={TREND_DATA} margin={{ left: -20, right: 10, top: 10 }}>
                            <defs>
                                <linearGradient id="donationFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", fontSize: 13 }}
                                labelStyle={{ fontWeight: 600 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="donations"
                                stroke="#2563eb"
                                strokeWidth={2.5}
                                fill="url(#donationFill)"
                                name="Donations"
                            />
                            <Area
                                type="monotone"
                                dataKey="pending"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                strokeDasharray="4 3"
                                fill="none"
                                name="Pending"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Donors by Blood Type */}
            <Card className="rounded-2xl border-slate-200 shadow-sm">
                <ChartHeader title="Donors by Blood Type" subtitle="Distribution" />
                <CardContent className="pt-4">
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={BLOOD_TYPE_DATA}
                                dataKey="value"
                                nameKey="type"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                                stroke="none"
                            >
                                {BLOOD_TYPE_DATA.map((entry) => (
                                    <Cell key={entry.type} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", fontSize: 13 }} />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                        {BLOOD_TYPE_DATA.map((entry) => (
                            <div key={entry.type} className="flex items-center gap-1.5 text-xs text-slate-500">
                                <span className="size-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
                                {entry.type}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MonthlyDonation;