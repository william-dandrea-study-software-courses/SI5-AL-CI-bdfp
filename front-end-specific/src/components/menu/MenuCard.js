import { observer } from "mobx-react-lite";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import React, { useState } from "react";


const MenuCard = observer(({ menuItem, addInCart, removeFromCart }) => {
        const [itemsNumber, setItemsNumber] = useState(0);

        return (
            <Card variant={"outlined"}>
                <CardContent>
                    <Typography textAlign={"center"}>{menuItem.shortName}</Typography>
                    <Typography textAlign={"center"}>In cart : {itemsNumber}</Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    height="194"
                    image={menuItem.image}
                    alt={menuItem.fullName}
                />
                <CardActions>
                    <Button size="small" color={"success"} onClick={() => addInCart(menuItem, setItemsNumber)}>Add</Button>
                    {(itemsNumber > 0) ?
                        <Button size="small" color={"error"} onClick={() => removeFromCart(menuItem, setItemsNumber)}>Remove</Button>
                        :
                        <div />
                    }
                </CardActions>
            </Card>
        )
    }
)

export default MenuCard;