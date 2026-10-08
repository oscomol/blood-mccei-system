import React, { useState } from "react";
import Modal from "../Shared/Modal";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";

export default function ConfirmDeleteRecord({
    isConfirmOpen,
    setIsConfirmOpen,
    selectedDonation,
    setSelectedDonation,
}) {
    const [processing, setProcessing] = useState(false);

     const close = () => {
            setIsConfirmOpen(false);
            setSelectedDonation(null);
        };

        const confirmDelete = () => {
            if (!selectedDonation?.id) return;

            setProcessing(true);
            router.delete(route("donation.delete", selectedDonation.id), {
                onSuccess: () => close(),
                onFinish: () => setProcessing(false),
            });
        };

    return (
        <Modal
            setOpen={setIsConfirmOpen}
            isOpen={isConfirmOpen}
            title="Delete donation record"
            subtitle="This action cannot be undone."
            onDismiss={() => setSelectedDonation(null)}
            size="sm"
        >
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-500" />
                <p className="text-sm text-red-700">
                    Are you sure you want to delete this record ? This will
                    permanently remove their records.
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
                    onClick={() => confirmDelete(selectedDonation)}
                    disabled={processing}
                    className="bg-red-600 font-semibold text-white hover:bg-red-700"
                >
                    Delete Record
                </Button>
            </div>
        </Modal>
    );
}
