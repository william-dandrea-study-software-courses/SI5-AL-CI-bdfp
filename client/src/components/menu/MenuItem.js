import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import CardMedia from "@mui/material/CardMedia";
import React, {useCallback, useEffect, useState} from "react";

const MenuItem = observer(({ menuItem, addToCart, removeFromCart, numberOfItemsP }) => {

    const [itemsNumber, setItemsNumber] = useState(0);

    const addC = useCallback(() => {
        addToCart(menuItem._id)
        numberOfItems()
    }, [])

    const removeC = useCallback( () => {
        removeFromCart(menuItem._id)
        numberOfItems()
    }, [])

    const numberOfItems = useCallback(() => {
        setItemsNumber(numberOfItemsP(menuItem._id))
    }, [setItemsNumber]);

    return (
        <Card variant="outlined">
          <CardContent>
            <Typography textAlign={"center"}>{menuItem.shortName}</Typography>
            <Typography textAlign={"left"}>{menuItem.category}</Typography>
            <Typography textAlign={"right"}>Price : {menuItem.price}</Typography>
            <Typography textAlign={"right"}>Items in cart : {itemsNumber}</Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="194"
            image={menuItem.image}
            alt={menuItem.fullName}
          />
          <CardActions>
            <Button size="small" color={"success"} onClick={addC}>
              Add
            </Button>
            <Button size="small" color={"error"} onClick={removeC}>
              {" "}
              Delete{" "}
            </Button>
          </CardActions>
        </Card>
    );
});

export default MenuItem;
