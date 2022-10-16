import { Card, CardContent, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

const OrderCard = observer(({ orderInfo, tableInfo }) => {
    return (
        <Card>
            <CardContent>
                <Typography textAlign={"center"}>
                    {" "}
                    {orderInfo.itemShortName} x {orderInfo.howManyItem}
                </Typography>
                <Typography textAlign={"left"}>
                    {orderInfo.sentToPreparation ? "sent" : "pending"}
                </Typography>
                <Typography textAlign={"left"}>
                    {orderInfo.sentToPreparation ? "sent" : "pending"}
                </Typography>
            </CardContent>
        </Card>
    );
});

export default OrderCard;
