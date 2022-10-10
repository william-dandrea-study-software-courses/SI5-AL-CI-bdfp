import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";

const TableCard = observer((
    { tableInfo }) => {
    const navigate = useNavigate();

    const navTableOrders = useCallback((info) => {
        if (info.taken && info.tableOrderId != null) {
            navigate(`/table-orders/${info.tableOrderId}`);
        }
    }, [navigate]);

    return (
        <Card variant="outlined" style={{ backgroundColor: (tableInfo.taken ? orange[800] : "") }}>
            <CardContent onClick={() => navTableOrders(tableInfo)}>
                <Typography textAlign={"center"}>Table n°{tableInfo.number}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color={"success"}>Open</Button>
                <Button size="small" color={"error"}>Close</Button>
            </CardActions>
        </Card >


    )
})

export default TableCard;