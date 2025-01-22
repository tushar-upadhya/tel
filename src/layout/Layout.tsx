import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="container p-4 mx-auto">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};

export default Layout;
