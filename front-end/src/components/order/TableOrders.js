import { observer } from 'mobx-react-lite';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { KitchenService } from '../../services';
import { Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSnackbar } from "notistack";
import React from 'react';
import OrderCard from './OrderCard';

const TableOrders = observer(() => {
    const [preparedItems, setPreparedItems] = useState([]);
    const { tableNumber } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const fetchPreparations = useCallback(async () => {
        let listPreparations = [];
        await KitchenService.getPreparationsReady(tableNumber).then(resp => {
            listPreparations = resp.data;
        });
        for (let item of listPreparations) {
            item.preparedItems.forEach(x => {
                x["ready"] = item._id;
            });
        }
        await KitchenService.getPreparationsStarted(tableNumber).then(resp => {
            listPreparations = listPreparations.concat(resp.data);
        });
        let allPreparedItems = [];
        for (let prep of listPreparations) {
            allPreparedItems = allPreparedItems.concat(prep.preparedItems);
        }
        setPreparedItems(allPreparedItems);
    }, [tableNumber, setPreparedItems]);

    useEffect(() => {
        fetchPreparations();
    }, [fetchPreparations]);

    const handleChange = (preparationsId) => {
        KitchenService.takenToTable(preparationsId).then(() => {
            fetchPreparations();
            enqueueSnackbar("The order has been taken to the table", { variant: "success" });
        });
    }

    return (
        <div>
            <div style={{ position: "absolute" }} onClick={() => navigate("/")}>
                <ArrowBackIosIcon />
            </div>
            < Typography textAlign={"center"} marginBottom={2}>Orders list of the table n°{tableNumber}</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {preparedItems.map((x, index) =>
                    <Grid item xs={6} key={index}>
                        <OrderCard orderInfo={x} ready={x} handleChange={handleChange} />
                    </Grid>
                )}
            </Grid>
        </div >
    )
});

export default TableOrders;