
import React, { useCallback } from "react";
import { observer } from 'mobx-react-lite';
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router";
import { TableService } from "../../services";

const TableCard = observer((
    { tableInfo }) => {
    const navigate = useNavigate();


    const handleOpen = useCallback(() => {
        TableService.openTable({
            tableNumber: tableInfo.number,
            customersCount: 2     // Mocked but should be set with a pop-in or something
        }).then(resp => navigate("/takeOrder/" + resp.data._id));
    }, [navigate, tableInfo])

    const navTableOrders = useCallback((info) => {
        if (info.taken && info.tableOrderId != null) {
            navigate(`/table-orders/${info.tableOrderId}`);
        }
    }, [navigate]);

    return (
        <Card variant="outlined" style={{ backgroundColor: (tableInfo.taken ? orange["A100"] : "") }}>
            <CardContent onClick={() => navTableOrders(tableInfo)}>
                <Typography textAlign={"center"}>Table n°{tableInfo.number} </Typography>
            </CardContent>
            <CardActions>
                {tableInfo.taken ? <Button size="small" color={"success"}>Add orders</Button>
                    : <Button size="small" color={"success"} onClick={() => handleOpen()}>Open</Button>}
                {tableInfo.taken ? <Button size="small" color={"error"}>Close</Button> : null}
            </CardActions>
        </Card >


    )
})

export default TableCard;