import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "../components";
import { PageTable } from "../pages";
import PageTableDetails from "../pages/PageTableDetails";

export const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<PageTable />}></Route>
      <Route path="/tables/:tableNumber" element={<PageTableDetails />}></Route>
      <Route path="/:tableNumber/menu" element={<Menu />}></Route>
    </Routes>
  </BrowserRouter>
);
