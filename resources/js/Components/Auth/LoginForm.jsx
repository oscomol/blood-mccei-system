import React, { useEffect, useState } from 'react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from '@inertiajs/react';
import InputError from '../InputError';

const LoginForm = ({showPassword, setShowPassword}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
            email: '',
            password: '',
            remember: false,
        });

      useEffect(() => {
            return () => {
                reset('password');
            };
        }, []);
    
        const submit = (e) => {
            e.preventDefault();
    
            post(route('login'));
        };

        useEffect(() => {
            console.log(errors)
        }, [errors])

    return (
         <section className="flex flex-col items-center justify-center px-4 py-10">
                    <div className="w-full max-w-[448px] rounded-3xl bg-white p-8 shadow-2xl">
                        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-slate-900">
                            Welcome back
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Sign in to your account to continue
                        </p>


                        <form className="mt-6 space-y-5" onSubmit={submit}>
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">
                                    Email / Username
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="text"
                                        value={data.email}
                                        onChange={e => setData("email", e.target.value)}
                                        placeholder="Enter your email or username"
                                        className="h-11 pl-10 border-[#c9d3e3] placeholder:text-[#8b97ae] focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500 focus:!ring-offset-0 focus:!outline-none"
                                        required
                                    />
                                </div>
                                 <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-800">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={data.password}
                                        onChange={e => setData("password", e.target.value)}
                                        placeholder="Enter your password"
                                         className="h-11 pl-10 border-[#c9d3e3] placeholder:text-[#8b97ae] focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500 focus:!ring-offset-0 focus:!outline-none pr-10"
                                         required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                 <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-slate-700">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    Remember me
                                </label>
                                <a href="#" className="font-medium text-blue-600 hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold text-white shadow-md hover:bg-blue-700"
                            >
                                {
                                    processing ? "Signing In...":"Sign In"
                                }
                            </Button>
                        </form>
                    </div>

                    <p className="mt-6 max-w-sm text-center text-xs text-sky-200">
                        Mount Carmel College of Escalante, Inc. — MCCEI Blood Donor Lifecycle
                        Tracking System v1.0
                    </p>
                </section>
    );
};

export default LoginForm;