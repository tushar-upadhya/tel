import logo from "@/assets/logo.png";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-center md:flex-row md:items-start md:gap-4 md:text-left"
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            className="object-contain w-12 h-12 mx-auto md:mx-0"
                        />
                        <span className="text-[min(5vw,1.4rem)] font-medium text-slate-800">
                            e-Telephone Directory 2025
                            <br />
                            <p className="text-[min(4vw,0.9rem)] leading-tight">
                                All India Institute Of Medical Sciences <br />
                                <span className="-mt-[4rem] text-muted-foreground">
                                    Ansari Nagar Delhi 110029
                                </span>
                            </p>
                        </span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Go to Homepage</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default Logo;
