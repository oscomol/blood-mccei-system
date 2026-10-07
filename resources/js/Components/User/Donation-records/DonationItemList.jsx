import { TableCell, TableRow } from "@/Components/ui/table";
import { Edit, Trash } from "lucide-react";
import { cn, formatDateForInput } from "@/lib/utils";
import ButtonIcon from "../Shared/ButtonIcon";

const STATUS_BADGE = {
    Completed: "bg-emerald-100 text-emerald-700",
    Deferred: "bg-amber-100 text-amber-700",
};

const DonationItemList = ({ d, editRecord, confirmDeleteDonation }) => {
    return (
        <TableRow>
            {/* <TableCell>
                <p>{d.donor_name}</p>
            </TableCell>
            <TableCell>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">
                    {d.blood_type}
                </span>
            </TableCell> */}
            <TableCell className="text-slate-600">
                {d.donation_date_display}
            </TableCell>
            <TableCell className="text-slate-600">
                {d.next_eligible_date_display}
            </TableCell>
             <TableCell>
                <span
                    className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                        STATUS_BADGE[d.donation_status],
                    )}
                >
                    {d.donation_status}
                </span>
            </TableCell>
            <TableCell
                className="max-w-[220px] truncate text-slate-500"
                title={d.remarks || ""}
            >
                {d.remarks || "—"}
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2 text-sm">
                    <ButtonIcon
                        Icon={<Edit />}
                        clr="green"
                        onBtnClick={() => editRecord(d)}
                        isDisabled={false}
                    />
                    <ButtonIcon
                        Icon={<Trash />}
                        clr="red"
                        onBtnClick={() => confirmDeleteDonation(d)}
                        isDisabled={false}
                    />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default DonationItemList;
