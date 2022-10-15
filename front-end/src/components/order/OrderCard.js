import { observer } from 'mobx-react-lite';
import { Card, CardContent, Typography } from '@mui/material';
import { red, green, orange } from "@mui/material/colors";
import React from 'react';

const OrderCard = observer((props) => {

    const takenToTable = () => {
        if (props.orderInfo.ready) {
            props.handleChange(props.orderInfo.ready);
        }
    }

    return (
        <Card onClick={takenToTable} >
            <CardContent style={{ backgroundColor: (props.orderInfo.startedAt == null ? red[500] : (props.orderInfo.finishedAt == null ? orange[500] : green[500])) }}>
                <Typography textAlign={"center"} > {props.orderInfo.shortName}</Typography>
            </CardContent>
        </Card >
    );
});

export default OrderCard;