import { Droplet, CheckCircle2, CalendarClock, Clock } from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";
import { cn } from "@/lib/utils";

const STYLES = {
    "Total Donations": { icon: Droplet,       iconBg: "bg-red-100",   iconColor: "text-red-500",   caption: "All-time records" },
    Completed:         { icon: CheckCircle2,  iconBg: "bg-green-100", iconColor: "text-green-600", caption: "Successful donations" },
    Scheduled:         { icon: CalendarClock, iconBg: "bg-blue-100",  iconColor: "text-blue-600",  caption: "Upcoming donations" },
    Deferred:          { icon: Clock,         iconBg: "bg-amber-100", iconColor: "text-amber-600", caption: "Postponed donations" },
};

const Cards = ({ reports }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
            {reports.map((item) => {
                const style = STYLES[item.title] ?? STYLES["Total Donations"];
                const Icon = style.icon;

                return (
                    <Card key={item.title} className="rounded-2xl border-slate-200 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    {item.title}
                                </p>
                                <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", style.iconBg)}>
                                    <Icon className={cn("size-5", style.iconColor)} strokeWidth={2} />
                                </div>
                            </div>

                            <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
                            <p className="mt-1 text-sm text-slate-500">{style.caption}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default Cards;