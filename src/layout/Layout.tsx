import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex-grow overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4 container mx-auto">
                        <Outlet />

                        <Toaster />
                    </div>
                </ScrollArea>
            </div>

            <Footer />
        </div>
    );
};

export default Layout;
