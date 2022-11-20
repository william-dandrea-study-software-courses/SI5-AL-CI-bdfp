import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PageAccueil, PageMenu} from "../pages";


export const AllRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PageAccueil/>}></Route>
            <Route path="/menu" element={<PageMenu />}></Route>
        </Routes>
    </BrowserRouter>
);