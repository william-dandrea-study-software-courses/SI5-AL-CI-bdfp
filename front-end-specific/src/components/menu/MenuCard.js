import { observer } from "mobx-react-lite";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import React, { useState } from "react";


const MenuCard = observer(({ menuItem, addInCart, removeFromCart }) => {
        const [itemsNumber, setItemsNumber] = useState(0);

        return (
            <Card variant={"outlined"}>
                <CardContent>
                    <Typography textAlign={"center"}>{menuItem.shortName}</Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    height="194"
                    image={menuItem.image}
                    alt={menuItem.fullName}
                />
                <CardActions>
                    <Button size="small" color={"success"} onClick={() => addInCart(menuItem, setItemsNumber)}>Add</Button>
                    <Button size="small" color={"error"} onClick={() => removeFromCart(menuItem, setItemsNumber)}>Remove</Button>
                </CardActions>
            </Card>
        )
    }
)

export default MenuCard;