import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StartPage, GlobalCartPage } from '../pages'



export const AllRoutes = () =>
    <BrowserRouter>
        <Routes>
            <Route element={<StartPage />} exact path="/"></Route>
            <Route element={<GlobalCartPage />} exact path="/global-cart/:tableNumber"></Route>
        </Routes>
    </BrowserRouter>