import React, {useCallback, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {MenuService, TableService} from "../../services";
import {Grid, Typography} from "@mui/material";
import MenuCard from "./MenuCard";
import {useParams} from "react-router";
import {useSnackbar} from "notistack";

const Menu = observer(({tableId}) => {
    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [orderedItems, setOrderedItems] = useState([]);
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        setIsLoading(true);
        MenuService.getAllMenu()
            .then(resp => setMenuItems(resp.data))
            .finally(() => setIsLoading(false));
    },[setIsLoading, setMenuItems])

    const getItemByCategory = useCallback((category) =>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {menuItems.filter(x => x.category === category).map(x =>
                <Grid key={x.id} item xs={4}>
                    <MenuCard  menuItem={x}/>
                </Grid>
            )}
        </Grid>
    , [menuItems])

    return(
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
    )
    }
)

export default Menu;