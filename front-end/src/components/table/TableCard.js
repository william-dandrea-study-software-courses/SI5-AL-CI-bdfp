import React from "react";
import { observer } from 'mobx-react-lite';
import {Card, CardContent, Typography} from "@mui/material";

const TableCard = observer((
    {tableInfo}) => {

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography textAlign={"center"}>Table n°{tableInfo.number}</Typography>

            </CardContent>
        </Card>

    )
})

export default TableCard;