import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { router } from "@inertiajs/react";

const navDisabledClass =
    "pointer-events-none flex h-8 items-center gap-1 px-2.5 text-sm opacity-50 cursor-not-allowed";

const goTo = (e, url) => {
    e.preventDefault();
    if (url) {
        router.visit(url, { preserveScroll: true, preserveState: true });
    }
};

const PaginatedNav = ({ paginateData }) => {
    return (
        <div className="border-t border-slate-100 flex items-center justify-between pt-2 pb-3 px-3">
            <p className="text-sm text-slate-500">
                Showing {paginateData.from} to {paginateData.to} out of <span className="font-semibold text-slate-700">{paginateData.total}</span> records.
            </p>
            <div className="flex justify-end">
                <Pagination>
                    <PaginationContent className="text-sm">
                        {paginateData.links.map((link, i) => {
                            const isPrev = link.label.includes("Previous");
                            const isNext = link.label.includes("Next");
                            const isEllipsis = link.label === "...";

                            if (isEllipsis) {
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            if (isPrev) {
                                return (
                                    <PaginationItem key={i}>
                                        {link.url ? (
                                            <PaginationPrevious
                                                href={link.url}
                                                onClick={(e) =>
                                                    goTo(e, link.url)
                                                }
                                                className="h-8 gap-1 px-2.5 text-sm cursor-pointer"
                                            />
                                        ) : (
                                            <span className={navDisabledClass}>
                                                <PaginationPrevious className="pointer-events-none" />
                                            </span>
                                        )}
                                    </PaginationItem>
                                );
                            }

                            if (isNext) {
                                return (
                                    <PaginationItem key={i}>
                                        {link.url ? (
                                            <PaginationNext
                                                href={link.url}
                                                onClick={(e) =>
                                                    goTo(e, link.url)
                                                }
                                                className="h-8 gap-1 px-2.5 text-sm cursor-pointer"
                                            />
                                        ) : (
                                            <span className={navDisabledClass}>
                                                <PaginationNext className="pointer-events-none" />
                                            </span>
                                        )}
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={i}>
                                    {link.url ? (
                                        <PaginationLink
                                            href={link.url}
                                            isActive={link.active}
                                            onClick={(e) => goTo(e, link.url)}
                                            className={`size-8 text-sm cursor-pointer ${
                                                link.active
                                                    ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white"
                                                    : ""
                                            }`}
                                        >
                                            {link.label}
                                        </PaginationLink>
                                    ) : (
                                        <PaginationLink
                                            isActive={link.active}
                                            className={`size-8 text-sm pointer-events-none cursor-not-allowed ${
                                                link.active
                                                    ? "bg-blue-600 text-white"
                                                    : "opacity-50"
                                            }`}
                                        >
                                            {link.label}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            );
                        })}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default PaginatedNav;
