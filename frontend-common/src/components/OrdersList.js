import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DiningService } from "../services";
import {Card, Typography} from "@mui/material";
import UserOrders from "./UserOrders";

const OrdersList = observer(() => {
    const [allUserOrders, setAllUserOrders] = useState([]);
    const { tableNumber } = useParams();

    useEffect(() => {

        DiningService.getAllUserCarts(tableNumber).then((response) => {
            if (response.data.user_carts.length > 0) {
                setAllUserOrders(response.data.user_carts);
                console.log(response.data.user_carts)
            }
        });

        /*
        const intervalId = setInterval(() => {

        }, 1 * 1000) // in milliseconds
        return () => clearInterval(intervalId);
        */
    }, [tableNumber]);

    return (
        <div>
            <Typography textAlign={"center"} marginBottom={2} variant="h1">Table orders</Typography>
                {allUserOrders?.map((x, index) =>
                    <Card style={{marginBottom: "20px"}} key={index}>
                        <UserOrders userCart={x}></UserOrders>
                    </Card>
                )}
        </div>
    )
});

export default OrdersList;
