import { observer } from "mobx-react-lite";
import {useCallback, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { DiningService } from "../services";
import {Button, Card, Typography} from "@mui/material";
import UserOrders from "./UserOrders";
import {useNavigate} from "react-router";

const OrdersList = observer(() => {
    const [allUserOrders, setAllUserOrders] = useState([]);
    const { tableNumber } = useParams();
    const navigate = useNavigate();

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

    const launchPreparation = useCallback(() => {
        DiningService.validateGlobalCart(tableNumber).then(result => {
            console.log(result)
            navigate(`/following-command/${tableNumber}`)
        })
    }, [navigate])

    return (
        <div>
            <Typography textAlign={"center"} marginBottom={2} variant="h1">Table orders</Typography>
                {allUserOrders?.map((x, index) =>
                    <Card style={{marginBottom: "20px"}} key={index}>
                        <UserOrders userCart={x}></UserOrders>
                    </Card>
                )}

            <Button variant="contained" color="success" style={{width: "100%"}} onClick={launchPreparation}>Validate cart and send to preparation</Button>
        </div>
    )
});

export default OrdersList;
