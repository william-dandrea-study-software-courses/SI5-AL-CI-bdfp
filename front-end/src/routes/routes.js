import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PageTable, PageTakeOrder, PageTableOrders } from "../pages";



export const AllRoutes = () =>
    <BrowserRouter>
        <Routes>
            <Route element={<PageTable />} exact path="/"></Route>
            <Route element={<PageTakeOrder />} exact path="/takeOrder/:id"></Route>
            <Route element={<PageTableOrders />} exact path="/table-orders/:tableNumber"></Route>
        </Routes>
    </BrowserRouter>
