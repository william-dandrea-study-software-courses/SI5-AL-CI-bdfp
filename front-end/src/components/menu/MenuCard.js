import {observer} from "mobx-react-lite";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React, {useCallback, useState} from "react";


const MenuCard = observer(({menuItem, addInCart, removeFromCart}) => {

    const [itemsNumber, setItemsNumber] = useState(0);

    const canBeRemoved = useCallback(() => {
        if (itemsNumber > 0) {
            <Button size="small" color={"error"} onClick={() => removeFromCart(menuItem, setItemsNumber)}>Remove</Button>
        }
    }, [itemsNumber, menuItem, removeFromCart]);

    return(
        <Card variant={"outlined"}>
            <CardContent>
                <Typography textAlign={"center"}>{menuItem.shortName}</Typography>
                <Typography textAlign={"center"}>Nb dans la commande : {itemsNumber}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color={"success"} onClick={() => addInCart(menuItem, setItemsNumber)}>Add</Button>
                {(itemsNumber > 0) ?
                    <Button size="small" color={"error"} onClick={() => removeFromCart(menuItem, setItemsNumber)}>Remove</Button>
                :
                    <div/>
                }
            </CardActions>
        </Card>
    )
    }
)

export default MenuCard;