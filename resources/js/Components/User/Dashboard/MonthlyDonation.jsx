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

const MonthlyDonation = ({monthlyDonation, bloodTypes}) => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Monthly Donation Trends */}
            <Card className="rounded-2xl border-slate-200 shadow-sm lg:col-span-2">
                <ChartHeader title="Monthly Donation Trends" subtitle="Historical donation activity — current year" />
                <CardContent className="pt-4">
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={monthlyDonation} margin={{ left: -20, right: 10, top: 10 }}>
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
                                data={bloodTypes}
                                dataKey="value"
                                nameKey="type"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                                stroke="none"
                            >
                                {bloodTypes.map((entry) => (
                                    <Cell key={entry.type} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", fontSize: 13 }} />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                        {bloodTypes.map((entry) => (
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