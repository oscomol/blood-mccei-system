import Modal from "../Shared/Modal";
import { Button } from "@/Components/ui/button";
import { AlertTriangle } from "lucide-react";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

const ConfirmUserModal = ({ selectedUser, setSelectedUser, isConfirmOpen, setIsConfirmOpen }) => {
    const [processing, setProcessing] = useState(false);

    const close = () => {
        setIsConfirmOpen(false);
        setSelectedUser(null);
    };

    const confirmDelete = () => {
        if (!selectedUser?.id) return;

        setProcessing(true);
        router.delete(route("user.delete", selectedUser.id), {
            onSuccess: () => close(),
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <Modal
            setOpen={setIsConfirmOpen}
            isOpen={isConfirmOpen}
            title="Delete user"
            subtitle="This action cannot be undone."
            onDismiss={() => setSelectedUser(null)}
            size="sm"
        >
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-500" />
                <p className="text-sm text-red-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{selectedUser?.name}</span>? This will
                    permanently remove their account.
                </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-4">
                <Button type="button" variant="outline" onClick={close}>
                    Cancel
                </Button>
                <Button
                    type="button"
                    onClick={confirmDelete}
                    disabled={processing}
                    className="bg-red-600 font-semibold text-white hover:bg-red-700"
                >
                    {processing ? "Deleting..." : "Delete user"}
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmUserModal;
