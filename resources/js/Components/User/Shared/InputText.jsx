import InputError from "@/Components/InputError";
import { Input } from "@/Components/ui/input";
import React from "react";
import { Label } from "@/Components/ui/label";

const inputClass =
    "border-[#c9d3e3] placeholder:text-[#8b97ae] focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500 focus:!ring-offset-0 focus:!outline-none";



const InputText = ({type="text", value, setValue, lbl, error, placeholder, required=true}) => {
    return (
        <div>
            <Label
                htmlFor={lbl}
                className="mb-2 block text-sm font-medium text-slate-800"
            >
                {lbl}
            </Label>
            <Input
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                id="name"
                placeholder={placeholder}
                className={inputClass}
                required={required}
            />
            {error && <InputError message={error} className="mt-1" />}
        </div>
    );
};

export default InputText;
