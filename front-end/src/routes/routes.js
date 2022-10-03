import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {PageTable} from "../pages";


export const AllRoutes = () =>
    <BrowserRouter>
        <Routes>
            <Route element={<PageTable/>} exact path="/"></Route>
        </Routes>
    </BrowserRouter>
