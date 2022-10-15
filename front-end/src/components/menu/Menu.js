import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { MenuService, TableService } from "../../services";
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
        enqueueSnackbar(menuItem.shortName + " a été ajouté à la commande", { variant: "success" })
    }, [enqueueSnackbar, orderedItems]);

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const finalizeOrder = useCallback(async () => {
        for (const item of orderedItems) {
            await TableService.addMenuItemToTableOrder(item, id);
        }
        TableService.prepareTable(id).then(() => {
            enqueueSnackbar("La commande est partie en cuisine");
            delay(1000).then(() => navigate("/"));
        });
    }, [enqueueSnackbar, id, orderedItems, navigate]);


    const removeFromCart = useCallback((menuItem, setHowMany) => {
        let newItems = orderedItems;
        const index = orderedItems.findIndex(item => item.menuItemId === menuItem._id);
        if (index >= 0) {
            newItems[index].howMany > 1 ?
                (newItems[index].howMany = newItems[index].howMany - 1) && setHowMany(newItems[index].howMany):
                (newItems = newItems.filter(item => item.menuItemId !== menuItem._id)) && setHowMany(0);
            enqueueSnackbar(menuItem.shortName + " a été retiré de la commande", {variant : "success"})
        }
        setOrderedItems(newItems);
    }, [orderedItems, setOrderedItems]);

    const countItemInCart = (menuItem) => {
        return orderedItems.filter(x => x.menuItemId === menuItem._id)[0]?.howMany
    }

    const getItemByCategory = useCallback((category) =>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {menuItems.filter(x => x.category === category).map(x =>
                <Grid key={x.id} item xs={6}>
                    <MenuCard
                        addInCart={addToCart}
                        removeFromCart={removeFromCart}
                        menuItem={x} />

                </Grid>
            )}
        </Grid>
        , [orderedItems, addToCart, menuItems, removeFromCart]);

    return (
        <>
            <Grid container direction={"column"}>
                <Typography textAlign={"center"} marginBottom={2} fontSize={"5vw"}>Entrée</Typography>
                {getItemByCategory('STARTER')}
                <Typography textAlign={"center"} marginBottom={2} fontSize={"5vw"}>Plats</Typography>
                {getItemByCategory('MAIN')}
                <Typography textAlign={"center"} marginBottom={2} fontSize={"5vw"}>Desserts</Typography>
                {getItemByCategory('DESSERT')}
                <Typography textAlign={"center"} marginBottom={2} fontSize={"5vw"}>Boissons</Typography>
                {getItemByCategory('BEVERAGE')}
            </Grid>
            <Grid container position={"sticky"} bottom={"5%"} alignItems="center"
                justifyContent="center">
                <Grid item textAlign={"center"}
                    style={{ backgroundColor: orange["A100"], borderRadius: "5px", marginRight: "8px" }} xs={8}>
                    <Button fullWidth color={"info"} onClick={() => finalizeOrder()}>Finaliser la commande</Button>
                </Grid>
            </Grid>
        </>

    )
});

export default Menu;