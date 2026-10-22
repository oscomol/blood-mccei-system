import React, { useState } from "react";
import Modal from "../Shared/Modal";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";

export default function ConfirmDeleteAccout({isConfirmOpen, setIsConfirmOpen}) {
    const [processing, setProcessing] = useState(false);

     const close = () => {
        setIsConfirmOpen(false);
    };

        const confirmDelete = () => {
            setProcessing(true);
            router.delete(route("profile.destroy"), {
                onSuccess: () => close(),
                onFinish: () => setProcessing(false),
            });
        };

    return (
        <Modal
            setOpen={setIsConfirmOpen}
            isOpen={isConfirmOpen}
            title="Delete Account"
            subtitle="This action cannot be undone."
            size="sm"
        >
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-500" />
                <p className="text-sm text-red-700">
                    Are you sure you want to delete your account ? This will
                    permanently remove your records.
                </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-4">
                <Button
                    type="button"
                    onClick={close}
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    onClick={() => confirmDelete()}
                    disabled={processing}
                    className="bg-red-600 font-semibold text-white hover:bg-red-700"
                >
                    Delete Account
                </Button>
            </div>
        </Modal>
    );
}
