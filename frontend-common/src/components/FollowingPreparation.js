import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { KitchenService } from "../services";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { red, green, orange } from "@mui/material/colors";


const FollowingPreparation = () => {
    const { tableNumber } = useParams();
    const [preparedItems, setPreparedItems] = useState([]);

    useEffect(() => {
        KitchenService.getAllPreparations(tableNumber).then((response) => {
            setPreparedItems(response);
        });
    }, [setPreparedItems, tableNumber]);


    return (
        <div style={{ textAlign: "center" }}>
            <h1>Following preparations</h1>
            <Grid container justify="space-around" spacing={1}>
                {preparedItems?.map((item, index) =>
                    <Card key={index} item xs>
                        <CardContent style={{ backgroundColor: (item.startedAt == null ? red[500] : (item.finishedAt == null ? orange[500] : green[500])) }}>
                            <Typography textAlign={"center"} > {item.shortName} ({item.startedAt == null ? "Not started" : item.finishedAt == null ? "In preparation" : "Ready to be served"})</Typography>
                        </CardContent>
                    </Card >
                )}
            </Grid>
        </div >
    )
};


export default FollowingPreparation;
