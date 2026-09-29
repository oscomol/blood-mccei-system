import React, { useState } from "react";
import { Card, CardHeader } from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import DonationItemList from "./DonationItemList";
import PaginatedNav from "../Shared/PaginatedNav";
import { Button } from "@/Components/ui/button";
import { RefreshCwIcon } from "lucide-react";

const thClass = "text-xs font-semibold uppercase tracking-wide text-slate-400";

const BLOOD_TYPE = [
    "All Blood Types",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
];

const STATUS = ["All Status", "Completed", "Pending", "Deferred", "Failed"];

const inputClass =
    "border-[#c9d3e3] placeholder:text-[#8b97ae] focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500 focus:!ring-offset-0 focus:!outline-none min-w-[9rem]";

const DonationListTable = ({
    donations,
    editRecord,
    bloodType,
    setBloodType,
    statusType,
    setStatusType,
}) => {
    const showReset =
        bloodType != "All Blood Types" || statusType != "All Status";

    const reset = () => {
        setBloodType("All Blood Types");
        setStatusType("All Status");
    };

    return (
        <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between ">
                    <div>
                        <p className="text-base font-semibold text-slate-900">
                            Donation List
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select
                            value={bloodType}
                            onValueChange={(v) => setBloodType(v)}
                        >
                            <SelectTrigger className={inputClass}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {BLOOD_TYPE.map((b) => (
                                    <SelectItem key={b} value={b}>
                                        {b}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={statusType}
                            onValueChange={(v) => setStatusType(v)}
                        >
                            <SelectTrigger className={inputClass}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUS.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {showReset && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 shrink-0 gap-1.5"
                                onClick={reset}
                            >
                                <RefreshCwIcon className="size-3.5" />
                                Reset
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className={thClass}>Donor</TableHead>
                            <TableHead className={thClass}>
                                Blood Type
                            </TableHead>
                            <TableHead className={thClass}>
                                Donation Date
                            </TableHead>
                            <TableHead className={thClass}>Status</TableHead>
                            <TableHead className={thClass}>
                                Next Eligible Date
                            </TableHead>
                            <TableHead className={thClass}>Remarks</TableHead>
                            <TableHead className={thClass}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {donations.data.map((d) => (
                            <DonationItemList
                                key={d.id}
                                d={d}
                                editRecord={editRecord}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>

            {donations.last_page > 1 && (
                <PaginatedNav {...{ paginateData: donations }} />
            )}
        </Card>
    );
};

export default DonationListTable;
