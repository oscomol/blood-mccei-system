import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import ConfirmDeleteDonor from "@/Components/User/Donor-Management/ConfirmDeleteDonor";
import DonorForm from "@/Components/User/Donor-Management/DonorForm";
import DonorInfoModal from "@/Components/User/Donor-Management/DonorInfoModal";
import DonorListTable from "@/Components/User/Donor-Management/DonorListTable";
import InputSearch from "@/Components/User/Shared/InputSearch";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DonorManagement = ({ donors }) => {
    const [bloodType, setBloodType] = useState("All Blood Types");
    const [eligibiltyType, setEligibiltyType] = useState("All Eligibility");
    const [lifecycleType, setLifecycleType] = useState("All Lifecycle");

    const [selectedDonor, setSelectedDonor] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const [search, setSearch] = useState("");
    const isFirstRender = useRef(true);


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            let qry = { search: search || undefined };
            if (bloodType && bloodType != "All Blood Types") {
                qry = { ...qry, blood_type: bloodType };
            }

            if (eligibiltyType && eligibiltyType != "All Eligibility") {
                qry = { ...qry, eligibility_type: eligibiltyType };
            }

            if (lifecycleType && lifecycleType != "All Lifecycle") {
                qry = { ...qry, lifecycle_type: lifecycleType };
            }

            router.get(route("donor-management"), qry, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, bloodType, eligibiltyType, lifecycleType]);

    const addDonor = () => {
        setSelectedDonor(null);
        setIsConfirmOpen(false);
        setIsInfoModalOpen(false);
        setIsOpen(true);
    };

    const editDonor = (donor) => {
        setSelectedDonor(donor);
        setIsConfirmOpen(false);
        setIsInfoModalOpen(false);
        setIsOpen(true);
    };

    const deleteDonor = (donor) => {
        setSelectedDonor(donor);
        setIsOpen(false);
        setIsInfoModalOpen(false);
        setIsConfirmOpen(true);
    };

    const showDonorInfo = (donor) => {
        setSelectedDonor(donor);
        setIsOpen(false);
        setIsConfirmOpen(false);
        setIsInfoModalOpen(true);
    };

    const viewDonorRecords = (donor_id) => {
        setIsInfoModalOpen(false);
        let qry = { donor_id: donor_id };

        if (search && search != "") {
            qry = { ...qry, search: search };
        }

        if (bloodType && bloodType != "All Blood Types") {
            qry = { ...qry, blood_type: bloodType };
        }

        if (eligibiltyType && eligibiltyType != "All Eligibility") {
            qry = { ...qry, eligibility_type: eligibiltyType };
        }

        if (lifecycleType && lifecycleType != "All Lifecycle") {
            qry = { ...qry, lifecycle_type: lifecycleType };
        }

        router.get(route("donation-records"), qry);
    };

    return (
        <>
            <AuthenticatedLayout2
                title="Donor Management"
                subtitle="Manage registered blood donors and their lifecycle status"
                actionButton={
                    <div className="flex items-center gap-2">
                        <InputSearch
                            {...{
                                search,
                                setSearch,
                                placeholder: "Enter donor name",
                            }}
                        />
                        <Button
                            onClick={addDonor}
                            className="bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                        >
                            <Plus />
                            Register Donor
                        </Button>
                    </div>
                }
            >
                <DonorListTable
                    {...{
                        donors,
                        editDonor,
                        deleteDonor,
                        bloodType,
                        setBloodType,
                        eligibiltyType,
                        setEligibiltyType,
                        lifecycleType,
                        setLifecycleType,
                        showDonorInfo,
                    }}
                />
            </AuthenticatedLayout2>
            <DonorForm
                {...{ isOpen, setIsOpen, selectedDonor, setSelectedDonor }}
            />
            <DonorInfoModal
                {...{
                    isOpen: isInfoModalOpen,
                    setIsOpen: setIsInfoModalOpen,
                    donor: selectedDonor,
                    setSelectedDonor: setSelectedDonor,
                    viewDonorRecords: viewDonorRecords,
                }}
            />
            <ConfirmDeleteDonor
                {...{
                    selectedDonor,
                    setSelectedDonor,
                    isConfirmOpen,
                    setIsConfirmOpen,
                }}
            />
        </>
    );
};

export default DonorManagement;
