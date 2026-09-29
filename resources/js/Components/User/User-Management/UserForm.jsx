import { Button } from "@/Components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import InputText from "../Shared/InputText";
import SelectInput from "../Shared/SelectInput";
import { useForm } from "@inertiajs/react";
import Modal from "../Shared/Modal";
import { isFormValid } from "@/lib/utils";
import { useEffect } from "react";

const STATUS_LIST = ["Active", "Inactive"];

const UserForm = ({ isOpen, setIsOpen, selectedUser, setSelectedUser }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: null,
        name: "",
        email: "",
        status: "Active",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("user.post"), {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    useEffect(() => {
        setData({
            id: selectedUser?.id || null,
            name: selectedUser?.name || "",
            email: selectedUser?.email || "",
            status: selectedUser?.status || "Active",
        });
    }, [selectedUser]);

    return (
        <Modal
            setOpen={setIsOpen}
            isOpen={isOpen}
            title={data.id ? "Update user" : "Add user"}
            subtitle={data.id ? "Update user account" : "Register new user"}
            onDismiss={() => setSelectedUser(null)}
        >
            <form onSubmit={submit}>
                <div className="space-y-5">
                    <InputText
                        value={data.name}
                        setValue={(v) => setData("name", v)}
                        lbl="Full name"
                        error={errors.name}
                        placeholder="Enter full name"
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
                        value={data.status}
                        setValue={(v) => setData("status", v)}
                        lbl="Select status"
                        arrayList={STATUS_LIST}
                        error={errors.status}
                        placeholder="Select status"
                    />
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
                            disabled={
                                processing ||
                                !isFormValid({
                                    name: data.name,
                                    email: data.email,
                                    status: data.status,
                                })
                            }
                            className="bg-blue-600 font-semibold text-white hover:bg-blue-700"
                        >
                            {processing
                                ? data.id
                                    ? "Updating..."
                                    : "Creating..."
                                : data.id
                                  ? "Update account"
                                  : "Create account"}
                        </Button>
                    </div>
                </DialogFooter>
            </form>
        </Modal>
    );
};

export default UserForm;
