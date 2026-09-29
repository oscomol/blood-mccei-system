import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import ConfirmDeleteDonor from "@/Components/User/Donor-Management/ConfirmDeleteDonor";
import DonorForm from "@/Components/User/Donor-Management/DonorForm";
import DonorListTable from "@/Components/User/Donor-Management/DonorListTable";
import InputSearch from "@/Components/User/Shared/InputSearch";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DonorManagement = ({ donors, filters }) => {
    const [bloodType, setBloodType] = useState("All Blood Types");
    const [eligibiltyType, setEligibiltyType] = useState("All Eligibility");
    const [lifecycleType, setLifecycleType] = useState("All Lifecycle");

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const [search, setSearch] = useState("");
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            let qry = {search: search || undefined}
            if(bloodType && bloodType != "All Blood Types"){
                qry = {...qry, blood_type: bloodType}
            }

            if(eligibiltyType && eligibiltyType != "All Eligibility"){
                qry = {...qry, eligibility_type: eligibiltyType}
            }

            if(lifecycleType && lifecycleType != "All Lifecycle"){
                qry = {...qry, lifecycle_type: lifecycleType}
            }

            router.get(
                route("donor-management"),
                qry,
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, bloodType, eligibiltyType, lifecycleType]);

    const addDonor = () => {
        setSelectedDonor(null);
        setIsOpen(true);
    };

    const editDonor = (donor) => {
        setSelectedDonor(donor);
        setIsOpen(true);
    };

    const deleteDonor = (donor) => {
        setSelectedDonor(donor);
        setIsConfirmOpen(true);
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
                <DonorListTable {...{ donors, editDonor, deleteDonor, bloodType, setBloodType, eligibiltyType, setEligibiltyType, lifecycleType, setLifecycleType }} />
            </AuthenticatedLayout2>
            <DonorForm
                {...{ isOpen, setIsOpen, selectedDonor, setSelectedDonor }}
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
