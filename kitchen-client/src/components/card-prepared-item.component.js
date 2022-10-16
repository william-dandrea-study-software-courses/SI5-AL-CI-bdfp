import {Button, Card, CardContent, Typography} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import {KitchenService} from "../services/kitchen.service";

const CardPreparedItem = observer(({ preparedItem }) => {

    const launchAndFinishPreparation = () => {
        KitchenService.startPreparation(preparedItem._id).then(() => {
            KitchenService.finishPreparation(preparedItem._id).then(() => {
                window.location.reload();
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <Card>
            <CardContent>
                <Typography textAlign={"center"}>
                    {preparedItem._id}
                </Typography>
                <Typography textAlign={"center"}>
                    {preparedItem.shortName}
                </Typography>

                <Button onClick={launchAndFinishPreparation}>
                    Launch and finish Preparation
                </Button>

            </CardContent>
        </Card>
    );
});

export default CardPreparedItem;
