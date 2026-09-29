import React, { useState } from "react";
import { Card, CardHeader } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import DonorItemList from "./DonorItemList";
import PaginatedNav from "../Shared/PaginatedNav";
import { RefreshCcwIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";

const inputClass =
    "border-[#c9d3e3] placeholder:text-[#8b97ae] focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500 focus:!ring-offset-0 focus:!outline-none min-w-[9rem]";

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

const ELIGIBILITY = ["All Eligibility", "Eligible", "Not Eligible", "Pending"];

const LIFECYCLE = ["All Lifecycle", "New", "Active", "Inactive", "Deferred"];

const DonorListTable = ({
    donors,
    editDonor,
    deleteDonor,
    bloodType,
    setBloodType,
    eligibiltyType,
    setEligibiltyType,
    lifecycleType,
    setLifecycleType,
}) => {
    const showReset =
        bloodType != "All Blood Types" ||
        eligibiltyType != "All Eligibility" ||
        lifecycleType != "All Lifecycle";

    const reset = () => {
        setBloodType("All Blood Types");
        setEligibiltyType("All Eligibility");
        setLifecycleType("All Lifecycle");
    };

    return (
        <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between gap-4 overflow-x-auto">
                    <div className="shrink-0">
                        <p className="text-base font-semibold text-slate-900 whitespace-nowrap">
                            Donor List
                        </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <Select
                            value={bloodType}
                            onValueChange={(v) => setBloodType(v)}
                        >
                            <SelectTrigger
                                className={`${inputClass} h-9 w-[110px] text-sm shrink-0`}
                            >
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
                            value={eligibiltyType}
                            onValueChange={(v) => setEligibiltyType(v)}
                        >
                            <SelectTrigger
                                className={`${inputClass} h-9 w-[110px] text-sm shrink-0`}
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {ELIGIBILITY.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={lifecycleType}
                            onValueChange={(v) => setLifecycleType(v)}
                        >
                            <SelectTrigger
                                className={`${inputClass} h-9 w-[110px] text-sm shrink-0`}
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {LIFECYCLE.map((item) => (
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
                                <RefreshCcwIcon className="size-3.5" />
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
                            <TableHead className={thClass}>Name</TableHead>
                            <TableHead className={thClass}>Email</TableHead>
                            <TableHead className={thClass}>Contact</TableHead>
                            <TableHead className={thClass}>
                                Blood Type
                            </TableHead>
                            <TableHead className={thClass}>
                                Eligibility
                            </TableHead>
                            <TableHead className={thClass}>Lifecycle</TableHead>
                            <TableHead className={thClass}>
                                Registered
                            </TableHead>
                            <TableHead className={thClass}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {donors.data.map((d) => (
                            <DonorItemList
                                key={d.id}
                                d={d}
                                editDonor={editDonor}
                                deleteDonor={deleteDonor}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>

            {donors.last_page > 1 && (
                <PaginatedNav {...{ paginateData: donors }} />
            )}
        </Card>
    );
};

export default DonorListTable;
