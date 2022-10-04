import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageTable } from "../pages";

export const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageTable />}></Route>
    </Routes>
  </BrowserRouter>
);
