import { observer } from 'mobx-react-lite';
import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const OrderCard = observer(({ orderInfo }) => {
    return (
        <Card>
            <CardContent>
                <Typography textAlign={"center"}>{orderInfo.item.shortName} x {orderInfo.howMany}</Typography>
            </CardContent>
        </Card>
    );
});

export default OrderCard;