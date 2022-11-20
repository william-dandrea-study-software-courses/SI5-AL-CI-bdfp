import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { MenuService, DiningService } from "../../services";
import { Grid, Typography, Button } from "@mui/material";
import { orange } from "@mui/material/colors";
import MenuCard from "./MenuCard";
import { useParams } from "react-router";
import {useSnackbar} from "notistack";


const Menu = observer(() => {
    const [menuItems, setMenuItems] = useState([]);

    const [orderedItems, setOrderedItems] = useState([]);
    const navigate = useNavigate();
    const snackbar = useSnackbar();

    useEffect(() => {
        MenuService.getAllMenu().then(resp => setMenuItems(resp.data));
        console.log(DiningService.userId);
    }, [setMenuItems])

    const addToCart = useCallback(async (menuItem) => {
        await DiningService.addItemToUserCart({id_item: menuItem._id});
        snackbar.enqueueSnackbar("Element ajouté à votre panier", {variant: 'success'})
    }, [snackbar]);


    const finalizeOrder = useCallback(async () => {
        navigate("/")
    }, [navigate]);


    const removeFromCart = useCallback(async (menuItem) => {
        try {
            await DiningService.removeItemFromCart({id_item: menuItem._id});
            snackbar.enqueueSnackbar("Element retiré de votre panier", {variant: 'success'})
        } catch (error){
            snackbar.enqueueSnackbar("L'élement n'est pas dans votre panier et ne peut donc pas être retiré", {variant: "error"});
        }

    }, [snackbar]);

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
                    <Button fullWidth color={"info"} onClick={() => finalizeOrder()}>Retourner à l'accueil</Button>
                </Grid>
            </Grid>
        </>

    )
});

export default Menu;