import { Button } from "@/Components/ui/button";
import BloodInventoryRequests from "@/Components/User/Dashboard/BloodInventoryRequests";
import Cards from "@/Components/User/Dashboard/Cards";
import MonthlyDonation from "@/Components/User/Dashboard/MonthlyDonation";
import RecentDonationsQuickActions from "@/Components/User/Dashboard/RecentDonationsQuickActions";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { Head, router } from "@inertiajs/react";
import { File, PlusCircle } from "lucide-react";
import React from "react";

const Dashboard = ({ stats, monthlyDonation, bloodTypes, recentDonations }) => {
    const addDonor = () => {
        router.visit(route("donor-management"));
    };

    return (
        <AuthenticatedLayout2
            title="Dashboard"
            subtitle="MCCEI Blood Donor Lifecycle Tracking System — Overview"
            actionButton={
                <div className="flex gap-3">
                    {/* <Button
                        variant="outline"
                        className="border-gray-300 text-gray-600 hover:text-gray-700"
                    >
                        <File />
                        View Reports
                    </Button> */}
                    <Button
                        onClick={addDonor}
                        className="bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                    >
                        <PlusCircle />
                        Add Donor
                    </Button>
                </div>
            }
        >
            <Head title='Dashboard' />
            <div className="flex flex-col gap-4">
                <Cards {...{stats}} />
                <MonthlyDonation {...{monthlyDonation, bloodTypes}} />
                {/* <BloodInventoryRequests /> */}
                <RecentDonationsQuickActions {...{recentDonations, addDonor}} />
            </div>
        </AuthenticatedLayout2>
    );
};

export default Dashboard;
