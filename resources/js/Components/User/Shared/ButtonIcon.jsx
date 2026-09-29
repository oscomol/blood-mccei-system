import { Button } from "@/Components/ui/button";
import React from "react";

const COLOR_CLASSES = {
    green: "border-green-200 text-green-700 hover:border-green-300 hover:bg-green-50 hover:text-green-700",
    red:   "border-red-200 text-red-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700",
    blue:  "border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700",
    amber: "border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700",
    slate: "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700",
};

const ButtonIcon = ({ Icon, clr = "slate", onBtnClick, isDisabled = false }) => {
    return (
        <Button
            variant="outline"
            size="icon"
            disabled={isDisabled}
            onClick={onBtnClick}
            className={COLOR_CLASSES[clr] || COLOR_CLASSES.slate}
        >
            {Icon}
        </Button>
    );
};

export default ButtonIcon;
