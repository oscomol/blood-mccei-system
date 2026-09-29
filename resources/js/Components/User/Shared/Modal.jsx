import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";

const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    full: "sm:max-w-[95vw]",
};

const Modal = ({
    children,
    isOpen,
    setOpen,
    title,
    subtitle,
    onDismiss,
    size = "md",
}) => {
    const handleOpenChange = (open) => {
        setOpen(open);
        if (!open && onDismiss) {
            onDismiss();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className={cn(sizeClasses[size])}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {subtitle && subtitle}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
