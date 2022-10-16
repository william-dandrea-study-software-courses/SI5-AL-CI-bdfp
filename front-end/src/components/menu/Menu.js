import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { MenuService, DiningService } from "../../services";
import { Grid, Typography, Button } from "@mui/material";
import { orange } from "@mui/material/colors";
import MenuCard from "./MenuCard";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";

const Menu = observer(() => {
    const [menuItems, setMenuItems] = useState([]);

    const [orderedItems, setOrderedItems] = useState([]);
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        MenuService.getAllMenu().then(resp => setMenuItems(resp.data));
    }, [setMenuItems])

    const addToCart = useCallback((menuItem, setHowMany) => {
        let newItems = orderedItems;
        const index = orderedItems.findIndex(item => item.menuItemId === menuItem._id);
        if (index >= 0) {
            newItems[index].howMany = newItems[index].howMany + 1
            setHowMany(newItems[index].howMany);
        } else {
            newItems.push({
                menuItemId: menuItem._id,
                menuItemShortName: menuItem.shortName,
                howMany: 1
            });
            setHowMany(1);
        }
        setOrderedItems(newItems);
        enqueueSnackbar(menuItem.shortName + " has been added to the order", { variant: "success" });
    }, [enqueueSnackbar, orderedItems]);

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const finalizeOrder = useCallback(async () => {
        for (const item of orderedItems) {
            await DiningService.addMenuItemToTableOrder(item, id);
        }
        DiningService.prepareTable(id).then(() => {
            enqueueSnackbar("The order has been sent to the kitchen");
            delay(1000).then(() => navigate("/"));
        });
    }, [enqueueSnackbar, id, orderedItems, navigate]);


    const removeFromCart = useCallback((menuItem, setHowMany) => {
        let newItems = orderedItems;
        const index = orderedItems.findIndex(item => item.menuItemId === menuItem._id);
        if (index >= 0) {
            newItems[index].howMany > 1 ?
                (newItems[index].howMany = newItems[index].howMany - 1) && setHowMany(newItems[index].howMany) :
                (newItems = newItems.filter(item => item.menuItemId !== menuItem._id)) && setHowMany(0);
            enqueueSnackbar(menuItem.shortName + " has been removed from the order", { variant: "error" })
        }
        setOrderedItems(newItems);
    }, [orderedItems, setOrderedItems, enqueueSnackbar]);

    const getItemByCategory = useCallback((category) =>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {menuItems.filter(x => x.category === category).map((x, index) =>
                <Grid key={index} item xs={6}>
                    <MenuCard
                        addInCart={addToCart}
                        removeFromCart={removeFromCart}
                        menuItem={x} />

                </Grid>
            )}
        </Grid>
        , [addToCart, menuItems, removeFromCart]);

    return (
        <>
            <Grid container direction={"column"}>
                <Typography textAlign={"center"} marginBottom={2} fontSize={"5vw"}>STARTER</Typography>
                {getItemByCategory('STARTER')}
                <Typography textAlign={"center"} marginBottom={2} fontSize={"5vw"}>MAIN</Typography>
                {getItemByCategory('MAIN')}
                <Typography textAlign={"center"} marginBottom={2} fontSize={"5vw"}>DESSERT</Typography>
                {getItemByCategory('DESSERT')}
                <Typography textAlign={"center"} marginBottom={2} fontSize={"5vw"}>BEVERAGE</Typography>
                {getItemByCategory('BEVERAGE')}
            </Grid>
            <Grid container position={"sticky"} bottom={"5%"} alignItems="center"
                justifyContent="center">
                <Grid item textAlign={"center"}
                    style={{ backgroundColor: orange["A100"], borderRadius: "5px", marginRight: "8px" }} xs={8}>
                    <Button fullWidth color={"info"} onClick={() => finalizeOrder()}>Validate the order</Button>
                </Grid>
            </Grid>
        </>

    )
});

export default Menu;