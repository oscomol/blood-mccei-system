import React from "react";
import { TableCell, TableRow } from "@/Components/ui/table";
import { Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import ButtonIcon from "../Shared/ButtonIcon";


const STATUS_BADGE = {
    Active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
    Inactive: "bg-red-50 text-red-600 ring-1 ring-inset ring-red-500/10",
};

const AVATAR_COLORS = [
    "bg-indigo-600",
    "bg-blue-600",
    "bg-violet-600",
    "bg-sky-600",
];

function initialsOf(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
}

const UserAccountItem = ({ user, editUser, deleteUser }) => {

    return (
        <TableRow>
            <TableCell>
                 <span className="font-medium text-slate-900">
                        {user.name}
                    </span>
                {/* <div className="flex items-center gap-2.5">
                    <div
                        className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                            AVATAR_COLORS[i % AVATAR_COLORS.length],
                        )}
                    >
                        {initialsOf(user.name)}
                    </div>
                    <span className="font-medium text-slate-900">
                        {user.name}
                    </span>
                </div> */}
            </TableCell>
            <TableCell className="text-slate-500">{user.email}</TableCell>
            <TableCell>
                <span
                    className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                        STATUS_BADGE[user.status],
                    )}
                >
                    {user.status}
                </span>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2 text-sm">
                    <ButtonIcon
                        Icon={<Edit />}
                        clr="green"
                        onBtnClick={() => editUser(user)}
                        isDisabled={false}
                    />
                    <ButtonIcon
                        Icon={<Trash />}
                        clr="red"
                        onBtnClick={() => deleteUser(user)}
                        isDisabled={false}
                    />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default UserAccountItem;
