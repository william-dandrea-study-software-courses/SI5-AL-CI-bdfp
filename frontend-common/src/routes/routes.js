import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StartPage, GlobalCartPage } from '../pages'
import DuringPreparationPage from "../pages/DuringPreparationPage";



export const AllRoutes = () =>
    <BrowserRouter>
        <Routes>
            <Route element={<StartPage />} exact path="/"></Route>
            <Route element={<GlobalCartPage />} exact path="/global-cart/:tableNumber"></Route>
            <Route element={<DuringPreparationPage />} exact path="/following-command/:tableNumber">></Route>
        </Routes>
    </BrowserRouter>
