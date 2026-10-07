import React from "react";
import { Card, CardHeader } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import UserAccountItem from "./UserAccountItem";
import PaginatedNav from "../Shared/PaginatedNav";

const UserAccountsTable = ({ users, editUser, deleteUser }) => {
    return (
        <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 px-4 pt-4 pb-2">
                <p className="text-base font-semibold text-slate-900">User Accounts</p>
                {/* <p className="text-xs text-slate-400">{users.total} accounts found</p> */}
            </CardHeader>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Display Name
                            </TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Username / Email
                            </TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Account Status
                            </TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((user, i) => (
                            <UserAccountItem key={user.id ?? i} user={user} i={i} editUser={editUser} deleteUser={deleteUser}/>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PaginatedNav {...{paginateData: users}} />
        </Card>
    );
};

export default UserAccountsTable;
