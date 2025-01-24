import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="container p-4 mx-auto">
        <Outlet />
              <Toaster />
              <ReactQueryDevtools/>
      </main>
    </div>
  );
};

export default Layout;
