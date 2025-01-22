import logo from "@/assets/logo.png";
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 md:flex-row md:items-start md:gap-4 md:text-left text-center">
      <img
        src={logo}
        alt="Logo"
        className="h-12 w-12 object-contain mx-auto md:mx-0"
      />
      <span className="text-sm font-bold text-slate-800">
        e-Telephone Directory 2025
        <br />
        <span className="text-xs sm:text-sm">
          All India Institute Of Medical Sciences
        </span>
      </span>
    </Link>
  );
};

export default Logo;
