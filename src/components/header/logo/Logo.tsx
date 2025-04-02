import logo from "@/assets/logo.png";
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
    return (
        <Link
            to="/"
            className="flex items-center gap-2 text-center md:flex-row md:items-start md:gap-4 md:text-left"
        >
            <img
                src={logo}
                alt="Logo"
                className="object-contain w-12 h-12 mx-auto md:mx-0"
            />
            <span className="text-[min(4vw,1.2rem)] font-medium text-slate-800">
                e-Telephone Directory 2025
                <br />
                <span className="text-[min(4vw,0.9rem)]">
                    All India Institute Of Medical Sciences <br />
                    Ansari Nagar Delhi 110029
                </span>
            </span>
        </Link>
    );
};

export default Logo;
