import {observer} from "mobx-react-lite";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React from "react";


const MenuCard = observer(({menuItem, addInCart, removeFromCart}) => {

    return(
        <Card variant={"outlined"}>
            <CardContent>
                <Typography textAlign={"center"}>{menuItem.shortName}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color={"success"} onClick={() => addInCart(menuItem)}>Add</Button>
                <Button size="small" color={"error"} onClick={() => removeFromCart(menuItem)}>Remove</Button>
            </CardActions>
        </Card>
    )
    }
)

export default MenuCard;