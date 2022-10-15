import {Button, Card, CardActions, CardContent, Divider, Grid, Typography} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import {TableService} from "../../services";

const OrderPreparationCard = observer(({ preparation }) => {
    console.log(preparation)

    const servePreparation = () => {
        TableService.serveTable(preparation.preparation_id).then(v => {
            console.log(v)
            window.location.reload(true);
        })
    }

    return (
        <Card>
            <CardContent>
                <Typography textAlign={"center"}>
                    Status : {preparation.status}
                </Typography>

                <Divider></Divider>
                {preparation.items?.map((item) => (
                    <Grid item xs={4} key={item.id}>
                        {item.short_name}
                    </Grid>
                ))}
            </CardContent>
            {preparation.status === "READY_TO_BE_SERVED"
                ?   <CardActions>
                        <Button onClick={servePreparation}>
                            Serve preparation
                        </Button>
                    </CardActions>
                : <div></div>
            }

        </Card>
    );
});

export default OrderPreparationCard;
