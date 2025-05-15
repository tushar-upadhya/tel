import Layout from "@/layout/Layout";
import FavoritesPage from "@/pages/favorites/FavoritesPage";
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/login-page/LoginPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter basename="/telephone">
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
