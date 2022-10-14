import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TableService } from '../../services';
import { Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from 'react';
import OrderCard from './OrderCard';

const TableOrders = observer(() => {
    const [tableOrders, setTableOrders] = useState({});
    const [isOrdersLoading, setIsOrdersLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsOrdersLoading(true);
        TableService.getTableOrdersById(id)
            .then(resp => setTableOrders(resp.data))
            .finally(() => setIsOrdersLoading(false));
    }, [setTableOrders, setIsOrdersLoading, id]);

    return (
        <div>
            <div style={{ position: "absolute" }} onClick={() => navigate("/")}>
                <ArrowBackIosIcon />
            </div>
            < Typography textAlign={"center"} marginBottom={2}>Liste des commandes de la table n°{tableOrders.tableNumber}</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {tableOrders.lines?.map(x =>
                    <Grid item xs={6}>
                        <OrderCard orderInfo={x} />
                    </Grid>
                )}
            </Grid>
        </div >
    )
});

export default TableOrders;