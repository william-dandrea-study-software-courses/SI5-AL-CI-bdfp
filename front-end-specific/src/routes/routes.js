import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "../components";


export const AllRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Menu />}></Route>
        </Routes>
    </BrowserRouter>
);