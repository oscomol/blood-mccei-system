import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

const inputClass =
    "border-[#c9d3e3] placeholder:text-[#8b97ae] focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500 focus:!ring-offset-0 focus:!outline-none";

const SelectInput = ({value, setValue, lbl, arrayList, error, placeholder}) => {
    return (
        <div>
            <Label className="mb-2 block text-sm font-medium text-slate-800">
                {lbl}
            </Label>
            <Select
                value={value}
                onValueChange={(e) => setValue(e)}
            >
                <SelectTrigger className={inputClass}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {
                        arrayList.map((list) => (
                            <SelectItem key={list} value={list}>{list}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
             {error && <InputError message={error} className="mt-1" />}
        </div>
    );
};

export default SelectInput;
