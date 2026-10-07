import { Button } from "@/Components/ui/button";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DonationListTable from "@/Components/User/Donation-records/DonationListTable";
import DonationForm from "@/Components/User/Donation-records/DonationForm";
import InputSearch from "@/Components/User/Shared/InputSearch";
import { router } from "@inertiajs/react";
import ConfirmDeleteRecord from "@/Components/User/Donation-records/ConfirmDeleteRecord";

const DonationRecords = ({ donors, donations, reports, donor_info }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);

    const [search, setSearch] = useState("");
    const [bloodType, setBloodType] = useState("All Blood Types");
    const [statusType, setStatusType] = useState("All Status");

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            let qry = { search: search || undefined, donor_id: donor_info?.id || undefined };

            if (bloodType && bloodType != "All Blood Types") {
                qry = { ...qry, blood_type: bloodType };
            }

            if (statusType && statusType != "All Status") {
                qry = { ...qry, status_type: statusType };
            }

            router.get(route("donation-records"), qry, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, bloodType, statusType]);

    const addRecord = () => {
        setSelectedDonation(null);
        setIsOpen(true);
    };

    const editRecord = (record) => {
        setSelectedDonation(record);
        setIsOpen(true);
    };

    const confirmDeleteDonation = (record) => {
        setSelectedDonation(record);
        setIsOpen(false);
        setIsConfirmOpen(true)
    }

    const deleteRecord = (record) => {
        console.log(record)
    }

    return (
        <>
            <AuthenticatedLayout2
                title="Donation Records"
                subtitle1ST={donor_info?.full_name}
                subtitle="Blood donation history and lifecycle tracking"
                actionButton={
                    <div className="flex items-center gap-2">
                        <InputSearch
                            {...{
                                search,
                                setSearch,
                                placeholder: "Search donation here",
                            }}
                        />
                        <Button
                            onClick={addRecord}
                            className="bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                        >
                            <Plus />
                            Add Donation
                        </Button>
                    </div>
                }
            >
                <div className="space-y-4">
                    {/* <Cards {...{ reports }} /> */}
                    <DonationListTable
                        {...{
                            donations,
                            editRecord,
                            bloodType,
                            setBloodType,
                            statusType,
                            setStatusType,
                            confirmDeleteDonation
                        }}
                    />
                </div>
            </AuthenticatedLayout2>
            <ConfirmDeleteRecord {...{isConfirmOpen, setIsConfirmOpen, deleteRecord, selectedDonation, setSelectedDonation}} />
            <DonationForm
                {...{
                    isOpen,
                    setIsOpen,
                    donors,
                    selectedDonation,
                    setSelectedDonation,
                    donor_info
                }}
            />
        </>
    );
};

export default DonationRecords;
