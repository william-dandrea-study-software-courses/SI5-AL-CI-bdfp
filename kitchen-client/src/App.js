import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {KitchenService} from "./services/kitchen.service";
import CardPreparedItemComponent from "./components/card-prepared-item.component";
import {Divider, Grid} from "@mui/material";

function App() {

    const [preparedItemsBar, setPreparedItemsBar] = useState([])
    const [preparedItemsColdDish, setPreparedItemsColdDish] = useState([])
    const [preparedItemsHotDish, setPreparedItemsHotDish] = useState([])

    useEffect(() => {
        KitchenService.getPreparedItemsBar().then(pi => {
            setPreparedItemsBar(pi)
        });
        KitchenService.getPreparedItemsColdDish().then(pi => {
            setPreparedItemsColdDish(pi)
        });
        KitchenService.getPreparedItemsHotDish().then(pi => {
            setPreparedItemsHotDish(pi)
        });
    }, [setPreparedItemsBar, setPreparedItemsColdDish, setPreparedItemsHotDish,])

    return (
        <div className="App">
            <h1>Kitchen Service</h1>

            <Divider></Divider>
            <h2>Bar</h2>
            {preparedItemsBar.map((x) => (
                <Grid item xs={6} key={x._id}>
                    <CardPreparedItemComponent preparedItem={x} />
                </Grid>
            ))}


            <Divider></Divider>
            <h2>Hot Dish</h2>
            {preparedItemsHotDish.map((x) => (
                <Grid item xs={6} key={x._id}>
                    <CardPreparedItemComponent preparedItem={x} />
                </Grid>
            ))}

            <Divider></Divider>
            <h2>Cold Dish</h2>
            {preparedItemsColdDish.map((x) => (
                <Grid item xs={6} key={x._id}>
                    <CardPreparedItemComponent preparedItem={x} />
                </Grid>
            ))}


        </div>
    );
}

export default App;
