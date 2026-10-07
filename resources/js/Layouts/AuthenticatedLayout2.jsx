import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/Components/ui/sidebar";
import { Separator } from "@/Components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import AppSidebar from "./AppSidebar";
import { toast } from "sonner";
import { Toaster } from "@/Components/ui/sonner";

const AuthenticatedLayout2 = ({ children, title, subtitle, actionButton, subtitle1ST }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        } else if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <SidebarProvider>
            <AppSidebar {...{ title }} />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[collapsible=icon]/sidebar-wrapper:h-12 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-md">
                    <div className="flex items-center gap-2 px-6">
                        <SidebarTrigger className="-ml-1 h-9 w-9 rounded-xl hover:bg-gray-100/80 transition-all duration-200 hover:scale-105 text-gray-600 hover:text-gray-900" />
                        <Separator
                            orientation="vertical"
                            className="mr-4 h-5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 w-px"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="text-gray-500 hover:text-gray-500">
                                        MCCEI
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="text-gray-800">
                                        {title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className="flex-1 px-6 py-5 bg-blue-50">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold tracking-tight text-slate-900">
                                {subtitle1ST || title}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {subtitle}.
                            </p>
                        </div>
                        {actionButton && actionButton}
                    </div>
                    <div className="flex-1">{children}</div>
                </main>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    );
};

export default AuthenticatedLayout2;
