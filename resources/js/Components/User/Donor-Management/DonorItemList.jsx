import {
    TableCell,
    TableRow,
} from "@/Components/ui/table";
import { Edit, Eye, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import ButtonIcon from "../Shared/ButtonIcon";

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


const DonorItemList = ({ d, editDonor, deleteDonor }) => {
    return (
        <TableRow>
            <TableCell>
                <p className="font-medium text-slate-900">{d.full_name}</p>
            </TableCell>
            <TableCell className="text-slate-600">{d.email}</TableCell>
            <TableCell className="text-slate-600">{d.contact_number}</TableCell>
            <TableCell>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">
                    {d.blood_type}
                </span>
            </TableCell>
            <TableCell>
                <span
                    className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                        ELIGIBILITY_BADGE[d.eligibility],
                    )}
                >
                    {d.eligibility_status}
                </span>
            </TableCell>
            <TableCell>
                <span
                    className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                        LIFECYCLE_BADGE[d.lifecycle_status],
                    )}
                >
                    {d.lifecycle_status}
                </span>
            </TableCell>
            <TableCell className="text-slate-600">
                {d.created_at_formatted}
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2 text-sm">
                    <ButtonIcon
                        Icon={<Edit />}
                        clr="green"
                        onBtnClick={() => editDonor(d)}
                        isDisabled={false}
                    />
                    <ButtonIcon
                        Icon={<Trash />}
                        clr="red"
                        onBtnClick={() => deleteDonor(d)}
                        isDisabled={false}
                    />
                    <ButtonIcon
                        Icon={<Eye />}
                        onBtnClick={() => alert("user")}
                        isDisabled={false}
                    />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default DonorItemList;
