import {useCallback, useEffect, useState} from "react";
import {DiningService} from "../services";
import {Button, Grid, Input, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SnackbarProvider, useSnackbar} from "notistack";


const PageAccueil = (callback, deps) => {

    const [userId, setUserId] = useState(DiningService.getUserId());
    const [tableNumber, setTableNumber] = useState(DiningService.getTableNumber());
    const navigate = useNavigate();
    const enqueueSnackbar = useSnackbar();
    
    useEffect(() => {
        console.log(DiningService.getUserId());
        setUserId(DiningService.getUserId());
        setTableNumber(DiningService.getTableNumber());
    }, [])

    const startOrder = useCallback(async () => {
        if (!userId){
            await DiningService.createUserCart(tableNumber);
        }
            navigate("/menu")
        }
    , [navigate, tableNumber, userId])

    const pay = useCallback(async () => {
        let billId = null;
        await DiningService.getTableBillId().then(resp => billId = resp);
        await DiningService.pay(billId).finally(enqueueSnackbar.enqueueSnackbar("Paiement effectué", {variant: 'success'}));
    })

    return (
        <SnackbarProvider>
            <Grid container direction={"column"} alignItems={"center"} style={{marginTop: "10%"}}>
                <Grid item xs={12}>
                    <Typography textAlign={"center"} variant={'h3'} paddingBottom={"10%"}> Bienvenue au restaurant IZDEGUIZ</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Input id="standard-basic" label="N° de table" variant="standard" onChange={(event) => setTableNumber(event.target.value)} inputProps={{style: {textAlign: "center"}}} value={tableNumber} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems={"center"} style={{marginTop: "20%"}}>
                        <Grid item xs={userId? 6 : 12} textAlign={"center"}>
                            <Button color={"success"} onClick={() => startOrder()} disabled={!Boolean(tableNumber)}> {userId? "Commander autre chose" : "Commencer la commande"}</Button>
                        </Grid>
                        {userId ?
                            <Grid item xs={6} textAlign={"center"}>
                                <Button color={"success"} onClick={() => pay()}>Payer</Button>
                            </Grid>
                            :
                            <div/>}
                    </Grid>
                </Grid>
            </Grid>
        </SnackbarProvider>
    )
}

export default PageAccueil;