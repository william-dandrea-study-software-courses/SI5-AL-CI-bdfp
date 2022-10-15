import React from "react";
import { TableList } from "../components";
import { SnackbarProvider } from "notistack";

const PageTable = () => {

    return (
        <SnackbarProvider>
            <TableList />
        </SnackbarProvider>
    )
}

export default PageTable;