import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { DialogFooter } from "@/Components/ui/dialog";
import { cn, formatDateForInput, isFormValid } from "@/lib/utils";
import Modal from "../Shared/Modal";
import InputText from "../Shared/InputText";
import SelectInput from "../Shared/SelectInput";

const inputClass =
    "border-[#c9d3e3] placeholder:text-[#8b97ae] focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500 focus:!ring-offset-0 focus:!outline-none";

const labelClass = "mb-2 block text-sm font-medium text-slate-800";

const GENDER = ["Male", "Female"];

const BLOOD_TYPE = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const ELIGIBILITY_STATUS = ["Eligible", "Not Eligible", "Pending"];

const LIFECYCLE_STATUS = ["New", "Active", "Deferred"];

const DonorForm = ({ isOpen, setIsOpen, selectedDonor, setSelectedDonor }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: null,
        first_name: "",
        middle_name: "",
        last_name: "",
        sex: "",
        date_of_birth: "",
        contact_number: "",
        email: "",
        blood_type: "",
        address: "",
        eligibility_status: "",
        lifecycle_status: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("donor.store"), {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    useEffect(() => {
        setData({
             id: selectedDonor?.id || null,
            first_name: selectedDonor?.first_name || "",
            middle_name: selectedDonor?.middle_name || "",
            last_name: selectedDonor?.last_name || "",
            sex: selectedDonor?.sex || "",
            date_of_birth: selectedDonor?.date_of_birth
                ? formatDateForInput(selectedDonor.date_of_birth)
                : "",
            contact_number: selectedDonor?.contact_number || "",
            email: selectedDonor?.email || "",
            blood_type: selectedDonor?.blood_type || "",
            address: selectedDonor?.address || "",
            eligibility_status: selectedDonor?.eligibility_status || "",
            lifecycle_status: selectedDonor?.lifecycle_status || "",
        });
    }, [selectedDonor]);


    return (
        <Modal
            setOpen={setIsOpen}
            isOpen={isOpen}
            title={selectedDonor?.id ? "Update Donor Info" : "Register New Donor"}
            size="xl"
            onDismiss={()=>setSelectedDonor(null)}
        >
            <form onSubmit={submit}>
                <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-3 overflow-y-auto pr-1 sm:grid-cols-2">
                    <InputText
                        value={data.first_name}
                        setValue={(v) => setData("first_name", v)}
                        lbl="First Name"
                        error={errors.first_name}
                        placeholder="Enter first name"
                    />

                    <InputText
                        value={data.middle_name}
                        setValue={(v) => setData("middle_name", v)}
                        lbl="Middle Name"
                        error={errors.middle_name}
                        placeholder="Enter middle name"
                    />

                    <InputText
                        value={data.last_name}
                        setValue={(v) => setData("last_name", v)}
                        lbl="Last Name"
                        error={errors.last_name}
                        placeholder="Enter last name"
                    />

                    <SelectInput
                        value={data.sex}
                        setValue={(v) => setData("sex", v)}
                        lbl="Select status"
                        arrayList={GENDER}
                        error={errors.status}
                        placeholder="Select gender"
                    />

                    <InputText
                        type="date"
                        value={data.date_of_birth}
                        setValue={(v) => setData("date_of_birth", v)}
                        lbl="Date of Birth"
                        error={errors.date_of_birth}
                        placeholder="Enter last name"
                    />

                    <InputText
                        type="number"
                        value={data.contact_number}
                        setValue={(v) => setData("contact_number", v)}
                        lbl="Contact number"
                        error={errors.contact_number}
                        placeholder="Enter contact number"
                    />

                    <InputText
                        type="email"
                        value={data.email}
                        setValue={(v) => setData("email", v)}
                        lbl="Email"
                        error={errors.email}
                        placeholder="Enter email"
                    />

                    <SelectInput
                        value={data.blood_type}
                        setValue={(v) => setData("blood_type", v)}
                        lbl="Blood Type"
                        arrayList={BLOOD_TYPE}
                        error={errors.blood_type}
                        placeholder="Select blood type"
                    />

                    <div className="flex flex-col gap-3">
                        <SelectInput
                            value={data.eligibility_status}
                            setValue={(v) => setData("eligibility_status", v)}
                            lbl="Eligibility status"
                            arrayList={ELIGIBILITY_STATUS}
                            error={errors.eligibility_status}
                            placeholder="Select eligibility status"
                        />

                        <SelectInput
                            value={data.lifecycle_status}
                            setValue={(v) => setData("lifecycle_status", v)}
                            lbl="Lifecycle status"
                            arrayList={LIFECYCLE_STATUS}
                            error={errors.lifecycle_status}
                            placeholder="Select lifecycle status"
                        />
                    </div>

                    <div>
                        <Label htmlFor="address" className={labelClass}>
                            Address
                        </Label>
                        <Textarea
                            id="address"
                            rows={2}
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className={cn(inputClass, "h-28 resize-none")}
                            placeholder="Enter donor address"
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
                            {
                                processing ?
                                (selectedDonor?.id ? "Saving changes...":"Saving donor..."):
                                (selectedDonor?.id ? "Save changes":"Save donor")
                            }
                        </Button>
                    </div>
                </DialogFooter>
            </form>
        </Modal>
    );
};

export default DonorForm;
