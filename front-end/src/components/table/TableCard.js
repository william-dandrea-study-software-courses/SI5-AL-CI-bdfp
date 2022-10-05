import React from "react";
import { observer } from 'mobx-react-lite';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {orange} from "@mui/material/colors";

const TableCard = observer((
    {tableInfo}) => {

    return (
        <Card variant="outlined" style={{backgroundColor: (tableInfo.taken ? orange[800] : "")}}>
            <CardContent>
                <Typography textAlign={"center"}>Table n°{tableInfo.number}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color={"success"}>Open</Button>
                <Button size="small" color={"error"}>Close</Button>
            </CardActions>
        </Card>


    )
})

export default TableCard;