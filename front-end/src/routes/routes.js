import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PageTable } from "../pages";
import PageTableOrders from '../pages/PageTableOrders';


export const AllRoutes = () =>
    <BrowserRouter>
        <Routes>
            <Route element={<PageTable />} exact path="/"></Route>
            <Route element={<PageTableOrders />} exact path="/table-orders/:id"></Route>
        </Routes>
    </BrowserRouter>
