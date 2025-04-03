/* eslint-disable @typescript-eslint/no-explicit-any */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import LogInForm from "./login-form/LogInForm";

const LogInSignup: React.FC = () => {
    const loginSubmit = (data: any) => {
        console.log("Login Data:", data);
    };

    //   const SignupSubmit = (data: any) => {
    //     console.log("Signup Data:", data);
    //   };

    return (
        <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg">
            <Tabs defaultValue="login" className="w-full">
                {/* Tabs List */}
                <TabsList className="flex justify-center mb-6 transition-all duration-200">
                    <TabsTrigger
                        value="login"
                        className="w-1/2 transition-all duration-200"
                    >
                        Login
                    </TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <TabsContent value="login">
                    <LogInForm onSubmit={loginSubmit} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LogInSignup;
