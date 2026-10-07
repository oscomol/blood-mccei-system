import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { DialogFooter } from "@/Components/ui/dialog";
import { cn, formatDateForInput, isFormValid } from "@/lib/utils";
import SelectInput from "../Shared/SelectInput";
import InputText from "../Shared/InputText";
import Modal from "../Shared/Modal";

const inputClass =
    "border-[#c9d3e3] placeholder:text-[#8b97ae] focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500 focus:!ring-offset-0 focus:!outline-none";

const labelClass = "mb-2 block text-sm font-medium text-slate-800";

const BLOOD_TYPE = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const STATUS = ["Completed", "Scheduled", "Deferred"];

const DonationForm = ({
    isOpen,
    setIsOpen,
    donors,
    selectedDonation,
    setSelectedDonation,
    donor_info,
}) => {
    const { data, setData, post, errors, reset, processing } = useForm({
        id: null,
        donor_id: donor_info?.id || "",
        donation_date: "",
        blood_type: donor_info?.blood_type || "",
        donation_status: "Completed",
        next_eligible_date: "",
        remarks: "",
    });

    useEffect(() => {
        console.log(selectedDonation);
        if (!selectedDonation) return;
        console.log(selectedDonation + "AFTER");
        setData({
            id: selectedDonation?.id || null,
            donor_id: String(selectedDonation.donor_id ?? ""),
            donation_date: selectedDonation?.donation_date
                ? formatDateForInput(selectedDonation.donation_date)
                : "",
            blood_type: selectedDonation?.blood_type || "",
            donation_status: selectedDonation?.donation_status || "Completed",
            next_eligible_date: selectedDonation?.next_eligible_date
                ? formatDateForInput(selectedDonation.next_eligible_date)
                : "",
            remarks: selectedDonation?.remarks || "",
        });
    }, [selectedDonation]);

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("donation.createOrUpdate"), {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    return (
        <Modal
            setOpen={setIsOpen}
            isOpen={isOpen}
            subtitle={`New Donation for donor ${donor_info?.full_name}`}
            title={
                setSelectedDonation?.id
                    ? "Update donation record"
                    : "Record new donation"
            }
            size="xl"
            onDismiss={() => setSelectedDonation(null)}
        >
            <form onSubmit={submit}>
                <div className="grid w-full flex-1 grid-cols-1 gap-x-6 gap-y-3 pr-1 sm:grid-cols-2">
                    {/* <div>
                        <Label className={labelClass}>Donor</Label>
                        <Select
                            value={data.donor_id ? String(data.donor_id) : ""}
                            onValueChange={(v) => setData("donor_id", v)}
                        >
                            <SelectTrigger className={inputClass}>
                                <SelectValue placeholder="— Select Donor —" />
                            </SelectTrigger>
                            <SelectContent>
                                {donors.map((donor) => (
                                    <SelectItem
                                        key={donor.id}
                                        value={String(donor.id)}
                                    >
                                        {donor.full_name} -{" "}
                                        <span className="font-semibold">
                                            {donor.blood_type}
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <SelectInput
                        value={data.blood_type}
                        setValue={(v) => setData("blood_type", v)}
                        lbl="Blood Type"
                        arrayList={BLOOD_TYPE}
                        error={errors.blood_type}
                        placeholder="Select blood type"
                    /> */}

                    <InputText
                        type="date"
                        value={data.donation_date}
                        setValue={(v) => setData("donation_date", v)}
                        lbl="Donation Date"
                        error={errors.donation_date}
                        placeholder="Enter date"
                    />

                    <InputText
                        type="date"
                        value={data.next_eligible_date}
                        setValue={(v) => setData("next_eligible_date", v)}
                        lbl="Next Eligible Date"
                        error={errors.next_eligible_date}
                        placeholder="Enter date"
                    />

                    <div className="col-span-2">
                        <SelectInput
                            value={data.donation_status}
                            setValue={(v) => setData("donation_status", v)}
                            lbl="Donation Status"
                            arrayList={STATUS}
                            error={errors.donation_status}
                            placeholder="Select status"
                        />
                    </div>

                    <div className="col-span-2">
                        <Label htmlFor="remarks" className={labelClass}>
                            Remarks
                        </Label>
                        <Textarea
                            id="remarks"
                            rows={2}
                            placeholder="Clinical notes or observations..."
                            value={data.remarks}
                            onChange={(e) => setData("remarks", e.target.value)}
                            className={cn(inputClass, "resize-none")}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex items-center justify-end gap-4 mt-5">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="gap-2 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
                            disabled={processing || !isFormValid(data)}
                        >
                            <CheckCircle2 className="size-4" />
                            {processing
                                ? selectedDonation?.id
                                    ? "Saving changes..."
                                    : "Saving donation..."
                                : selectedDonation?.id
                                  ? "Save changes"
                                  : "Save donation"}
                        </Button>
                    </div>
                </DialogFooter>
            </form>
        </Modal>
    );
};

export default DonationForm;
