import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DiningService } from "../services";
import { Grid, Typography } from "@mui/material";
import UserOrders from "./UserOrders";

const OrdersList = observer(() => {
    const [allUserOrders, setAllUserOrders] = useState([]);
    const { tableNumber } = useParams();

    useEffect(() => {
        console.log(tableNumber);
        DiningService.getAllUserCarts(tableNumber).then((response) => {
            if (response.data.user_carts.length > 0) {
                setAllUserOrders(response.data.user_carts);
            }

        });
    }, [tableNumber]);

    return (
        <div>
            <Typography textAlign={"center"} marginBottom={2}>Table orders</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {allUserOrders?.map((x, index) =>
                    <Grid item xs={6} key={index}>
                        <UserOrders userCart={x}></UserOrders>
                    </Grid>
                )}
            </Grid>
        </div>

    )
});

export default OrdersList;