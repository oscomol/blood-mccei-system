import React from "react";
import Modal from "../Shared/Modal";
import { DialogFooter } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const bloodTone = "bg-red-50 text-red-700 border-red-200";

const statusTone = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    gray: "bg-slate-100 text-slate-600 border-slate-200",
};

const ELIGIBILITY_BADGE = {
    Eligible: "bg-emerald-100 text-emerald-700",
    "Not Eligible": "bg-red-100 text-red-600",
    Pending: "bg-amber-100 text-amber-700",
};

const LIFECYCLE_BADGE = {
    Active: "bg-emerald-100 text-emerald-700",
    Deferred: "bg-amber-100 text-amber-700",
    New: "bg-blue-100 text-blue-700",
};

function Pill({ tone, children }) {
    return (
        <span
            className={`rounded-full border px-3 text-sm font-semibold ${tone}`}
        >
            {children}
        </span>
    );
}

function Field({ label, value, className = "" }) {
    return (
        <div className={`rounded-xl bg-slate-50 px-4 py-3 ${className}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="mt-1 break-words text-base text-slate-900">
                {value || "—"}
            </p>
        </div>
    );
}

const initials = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n, i) => (i === 0 ? n[0].toUpperCase() : n[0].toLowerCase()))
        .join("");

export default function DonorInfoModal({
    isOpen,
    setIsOpen,
    donor,
    setSelectedDonor,
    viewDonorRecords,
}) {
    if (!donor) return null;

    return (
        <Modal
            setOpen={setIsOpen}
            isOpen={isOpen}
            title={`Donor Profile`}
            size="xl"
            onDismiss={() => setSelectedDonor(null)}
        >
            <div className="space-y-6">
                <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white">
                        {initials(donor.full_name)}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            {donor.full_name}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Pill tone={bloodTone}>{donor.blood_type}</Pill>
                            <span
                                className={cn(
                                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                                    ELIGIBILITY_BADGE[donor.eligibility_status],
                                )}
                            >
                                {donor.eligibility_status}
                            </span>
                            <span
                                className={cn(
                                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                                    LIFECYCLE_BADGE[donor.lifecycle_status],
                                )}
                            >
                                {donor.lifecycle_status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Donor ID" value={`D00${donor.id}`} />
                    <Field label="Sex" value={donor.sex} />
                    <Field
                        label="Date of birth"
                        value={donor.birth_date_formatted}
                    />
                    <Field label="Contact" value={donor.contact_number} />
                    <Field label="Email" value={donor.email} />
                    <Field
                        label="Registration date"
                        value={donor.created_at_formatted}
                    />
                    <Field
                        label="Address"
                        value={donor.address}
                        className="sm:col-span-2"
                    />
                </div>
            </div>

            <DialogFooter>
                <div className="flex items-center justify-end gap-4 mt-3">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button
                        onClick={() => viewDonorRecords(donor.id)}
                        className="gap-2 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
                    >
                        <ClipboardList className="h-4 w-4" />
                        View Records
                    </Button>
                </div>
            </DialogFooter>
        </Modal>
    );
}
