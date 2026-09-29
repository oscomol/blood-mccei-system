import { Button } from "@/Components/ui/button";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { UserPlus, Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import UserAccountsTable from "@/Components/User/User-Management/UserAccountsTable";
import UserForm from "@/Components/User/User-Management/UserForm";
import ConfirmUserModal from "@/Components/User/User-Management/ConfirmUserModal";
import InputSearch from "@/Components/User/Shared/InputSearch";

const UserManagement = ({ users }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [search, setSearch] = useState("");
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                route("user-management"),
                { search: search || undefined },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    const addUser = () => {
        setSelectedUser(null);
        setIsOpen(true);
    };

    const editUser = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const deleteUser = (user) => {
        setSelectedUser(user);
        setIsConfirmOpen(true);
    };

    return (
        <>
            <AuthenticatedLayout2
                title="User Management"
                subtitle="Manage system user accounts and role assignments"
                actionButton={
                    <div className="flex items-center gap-2">
                         <InputSearch {...{search, setSearch, placeholder: "Search name or email"}} />
                        <Button
                            onClick={addUser}
                            className="bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                        >
                            <UserPlus />
                            Add User
                        </Button>
                    </div>
                }
            >
                <UserAccountsTable {...{ users, editUser, deleteUser }} />
            </AuthenticatedLayout2>
            <UserForm {...{ isOpen, setIsOpen, selectedUser, setSelectedUser }} />
            <ConfirmUserModal
                {...{ selectedUser, setSelectedUser, isConfirmOpen, setIsConfirmOpen }}
            />
        </>
    );
};

export default UserManagement;
