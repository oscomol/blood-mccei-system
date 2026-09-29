import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Heart } from "lucide-react";
import LoginForm from "@/Components/Auth/LoginForm";

const stats = [
    { value: "145", label: "Registered Donors" },
    { value: "312", label: "Total Donations" },
    { value: "183", label: "Blood Units Available" },
];



export default function Login2() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Sign in" />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen grid lg:grid-cols-2 bg-[#12285f] font-['Inter',sans-serif]"
                style={{ backgroundImage: "linear-gradient(135deg,#0f2251 0%,#17346f 60%,#1a3a80 100%)" }}
            >
                {/* Left: branding */}
                <section className="relative hidden lg:flex flex-col justify-center overflow-hidden px-12 xl:px-16 py-12 text-white">
                    {/* decorative circles */}
                    <div className="pointer-events-none absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full bg-white/5" />
                    <div className="pointer-events-none absolute top-[38%] left-[28%] h-[300px] w-[300px] rounded-full bg-white/5" />
                    <div className="pointer-events-none absolute -bottom-32 left-[38%] h-[340px] w-[340px] rounded-full bg-fuchsia-500/10" />

                    <div className="relative max-w-lg">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-lg font-bold shadow-lg">
                            MC
                        </div>
                        <p className="mt-4 text-sm font-medium text-sky-200">
                            Mount Carmel College of Escalante, Inc.
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-rose-300">
                            <Heart className="h-5 w-5 fill-rose-400 text-rose-400" />
                            Saving Lives Together
                        </div>

                        <h1 className="mt-6 font-['Plus_Jakarta_Sans',sans-serif] text-5xl font-bold leading-[1.1]">
                            Blood Donor
                            <span className="block text-rose-400">Lifecycle</span>
                            Tracking System
                        </h1>

                        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-sky-100">
                            A centralized web-based platform for managing blood donor records,
                            eligibility verification, donation tracking, real-time inventory
                            monitoring, and descriptive analytics — with automated messenger
                            notifications.
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-3">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                                >
                                    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold">
                                        {s.value}
                                    </div>
                                    <div className="mt-1 text-xs leading-snug text-sky-100">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <LoginForm {...{showPassword, setShowPassword}} />
               
            </div>
        </>
    );
}