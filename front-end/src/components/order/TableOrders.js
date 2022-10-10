import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TableOrdersService } from '../../services';
import { Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from 'react';
import OrderCard from './OrderCard';

const TableOrders = observer(() => {
    const [TableOrders, setTableOrders] = useState({});
    const [isOrdersLoading, setIsOrdersLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsOrdersLoading(true);
        TableOrdersService.getTableOrdersById(id)
            .then(resp => setTableOrders(resp.data))
            .finally(() => setIsOrdersLoading(false));
    }, [setTableOrders, setIsOrdersLoading]);

    return (
        <div>
            <div style={{ position: "absolute" }} onClick={() => navigate("/")}>
                <ArrowBackIosIcon />
            </div>
            < Typography textAlign={"center"} marginBottom={2}>Liste des commandes de la table n°{TableOrders.tableNumber}</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {TableOrders.lines?.map(item =>
                    <Grid item xs={6}>
                        <OrderCard orderInfo={item} />
                    </Grid>
                )}
            </Grid>
        </div >
    )
});

export default TableOrders;