import React from 'react';
import TableOrders from '../components/order/TableOrders';
import { SnackbarProvider } from "notistack";

const PageTableOrders = () => {
    return (
        <SnackbarProvider>
            <TableOrders />
        </SnackbarProvider>
    );
};

export default PageTableOrders;